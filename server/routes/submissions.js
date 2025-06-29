const express = require('express');
const Submission = require('../models/Submission');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToCloudinary } = require('../config/cloudinary');

const router = express.Router();

// Submit proof
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const { challengeId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (challenge.status !== 'active') {
      return res.status(400).json({ message: 'Challenge is not active' });
    }

    // Check if user already submitted
    const existingSubmission = await Submission.findOne({
      userId: req.user._id,
      challengeId
    });

    if (existingSubmission) {
      return res.status(400).json({ message: 'Already submitted to this challenge' });
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      'submissions'
    );

    // Calculate score based on submission time (early submissions get bonus)
    const challengeProgress = (new Date() - challenge.startTime) / (challenge.endTime - challenge.startTime);
    const timeBonus = Math.max(0, (1 - challengeProgress) * 100); // Up to 100 bonus points
    const baseScore = 0; // Base score
    const totalScore = Math.min(challenge.maxScore, baseScore + timeBonus);

    const submission = new Submission({
      userId: req.user._id,
      challengeId,
      mediaUrl: uploadResult.secure_url,
      mediaType: file.mimetype.startsWith('image/') ? 'image' : 'video',
      cloudinaryPublicId: uploadResult.public_id,
      score: Math.round(totalScore)
    });

    await submission.save();

    // Update challenge stats
    challenge.totalSubmissions += 1;
    await challenge.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 
        totalSubmissions: 1,
        totalScore: submission.score
      },
      lastActivity: new Date()
    });

    // Emit real-time update
    req.io.emit('new_submission', {
      challengeId,
      totalSubmissions: challenge.totalSubmissions,
      userId: req.user._id,
      score: submission.score
    });

    res.status(201).json({
      message: 'Submission successful',
      submission,
      score: submission.score
    });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user submissions
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.params.userId })
      .populate('challengeId', 'title')
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if user submitted to challenge
router.get('/check/:challengeId', auth, async (req, res) => {
  try {
    const submission = await Submission.findOne({
      userId: req.user._id,
      challengeId: req.params.challengeId
    });

    res.json({ submitted: !!submission, submission });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;