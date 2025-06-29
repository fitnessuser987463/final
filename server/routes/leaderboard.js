// const express = require('express');
// const Submission = require('../models/Submission');
// const User = require('../models/User');
// const Challenge = require('../models/Challenge');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // Get current challenge leaderboard
// // router.get('/current', async (req, res) => {
// //   try {
// //     // Find the most recent active challenge
// //     const currentChallenge = await Challenge.findOne({
// //       status: 'active',
// //       isActive: true,
// //       endTime: { $gt: new Date() }
// //     }).sort({ createdAt: -1 });

// //     if (!currentChallenge) {
// //       return res.status(404).json({ message: 'No active challenge found' });
// //     }

// //     console.log('Found current challenge:', currentChallenge.title);

// //     // Get all submissions for this challenge
// //     const submissions = await Submission.find({
// //       challengeId: currentChallenge._id
// //     })
// //     .populate('userId', 'name email avatar')
// //     .sort({ score: -1, submittedAt: 1 }); // Highest score first, then earliest submission

// //     console.log(`Found ${submissions.length} submissions for challenge ${currentChallenge._id}`);

// //     // Create leaderboard with proper user ID format
// //     const leaderboard = submissions.map((submission, index) => ({
// //       rank: index + 1,
// //       player: submission.userId.name,
// //       userId: submission.userId._id.toString(), // Convert to string for consistency
// //       id: submission.userId._id.toString(), // Add both for compatibility
// //       email: submission.userId.email,
// //       avatar: submission.userId.avatar,
// //       score: submission.score,
// //       submittedAt: submission.submittedAt,
// //       lastActivity: submission.submittedAt
// //     }));

// //     console.log('Returning leaderboard with', leaderboard.length, 'entries');
// //     res.json(leaderboard);
// //   } catch (error) {
// //     console.error('Error fetching current challenge leaderboard:', error);
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // });
// router.get('/current', async (req, res) => {
//   try {
//     // Find the most recent active challenge
//     const currentChallenge = await Challenge.findOne({
//       status: 'active',
//       isActive: true,
//       endTime: { $gt: new Date() }
//     }).sort({ createdAt: -1 });

//     if (!currentChallenge) {
//       return res.status(404).json({ message: 'No active challenge found' });
//     }

//     console.log('Found current challenge:', currentChallenge.title);

//     // Get all submissions for this challenge
//     const submissions = await Submission.find({
//       challengeId: currentChallenge._id
//     })
//     .populate('userId', 'name email avatar')
//     .sort({ score: -1, submittedAt: 1 });

//     console.log(`Found ${submissions.length} submissions for challenge ${currentChallenge._id}`);

//     // Create leaderboard with proper user ID format
//     const leaderboard = submissions.map((submission, index) => ({
//       rank: index + 1,
//          player: submission.userId.name,
//      userId: submission.userId._id.toString(), // Convert to string for consistency
//      id: submission.userId._id.toString(), // Add both for compatibility
//      email: submission.userId.email,
//      avatar: submission.userId.avatar,
//      score: submission.score,
//      submittedAt: submission.submittedAt,
//      lastActivity: submission.submittedAt
//    }));

//    console.log('Returning leaderboard with', leaderboard.length, 'entries');
//    res.json(leaderboard);
//  } catch (error) {
//    console.error('Error fetching current challenge leaderboard:', error);
//    res.status(500).json({ message: 'Server error', error: error.message });
//  }
// });
// // Get global leaderboard
// router.get('/global', async (req, res) => {
//   try {
//     const users = await User.find({ totalScore: { $gt: 0 } })
//       .select('name email avatar totalScore challengesWon totalSubmissions lastActivity')
//       .sort({ totalScore: -1, lastActivity: -1 })
//       .limit(100);

//     const leaderboard = users.map((user, index) => ({
//       rank: index + 1,
//       player: user.name,
//       userId: user._id.toString(), // Convert to string
//       id: user._id.toString(), // Add both for compatibility
//       email: user.email,
//       avatar: user.avatar,
//       score: user.totalScore,
//       challengesWon: user.challengesWon,
//       totalSubmissions: user.totalSubmissions,
//       lastActivity: user.lastActivity
//     }));

//     res.json(leaderboard);
//   } catch (error) {
//     console.error('Error fetching global leaderboard:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get user rank in current challenge
// router.get('/rank/:userId', auth, async (req, res) => {
//   try {
//     const { userId } = req.params;
        
//     if (!userId || userId === 'undefined') {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     // Get current challenge
//     const currentChallenge = await Challenge.findOne({
//       status: 'active',
//       isActive: true,
//       endTime: { $gt: new Date() }
//     }).sort({ createdAt: -1 });

//     if (!currentChallenge) {
//       return res.status(404).json({ message: 'No active challenge found' });
//     }

//     // Get user's rank in current challenge
//     const submissions = await Submission.find({
//       challengeId: currentChallenge._id
//     })
//     .populate('userId', '_id')
//     .sort({ score: -1, submittedAt: 1 });

//     const userRank = submissions.findIndex(
//       submission => submission.userId._id.toString() === userId
//     ) + 1;

//     res.json({
//       rank: userRank > 0 ? userRank : null,
//       challengeId: currentChallenge._id
//     });
//   } catch (error) {
//     console.error('Error fetching user rank:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const Submission = require('../models/Submission');
const User = require('../models/User');
const Challenge = require('../models/Challenge');
const auth = require('../middleware/auth');

const router = express.Router();

// FIXED: Get current challenge leaderboard - use /active endpoint
router.get('/current', async (req, res) => {
  try {
    // FIXED: Use the same endpoint as frontend - /active instead of manual query
    const currentChallenge = await Challenge.findOne({
      status: 'active',
      isActive: true,
      endTime: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    if (!currentChallenge) {
      return res.status(404).json({ message: 'No active challenge found' });
    }

    console.log('Found current challenge for leaderboard:', currentChallenge.title);

    // Get all submissions for this challenge
    const submissions = await Submission.find({
      challengeId: currentChallenge._id
    })
    .populate('userId', 'name email avatar')
    .sort({ score: -1, submittedAt: 1 });

    console.log(`Found ${submissions.length} submissions for challenge ${currentChallenge._id}`);

    // FIXED: Check if submissions have valid userId data
    const validSubmissions = submissions.filter(submission => 
      submission.userId && submission.userId._id
    );

    console.log(`${validSubmissions.length} valid submissions after filtering`);

    // Create leaderboard with proper user ID format
    const leaderboard = validSubmissions.map((submission, index) => ({
      rank: index + 1,
      player: submission.userId.name,
      userId: submission.userId._id.toString(), // Convert to string for consistency
      id: submission.userId._id.toString(), // Add both for compatibility
      email: submission.userId.email,
      avatar: submission.userId.avatar,
      score: submission.score,
      submittedAt: submission.submittedAt,
      lastActivity: submission.submittedAt
    }));

    console.log('Returning leaderboard with', leaderboard.length, 'entries');
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching current challenge leaderboard:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get global leaderboard
router.get('/global', async (req, res) => {
  try {
    const users = await User.find({ totalScore: { $gt: 0 } })
      .select('name email avatar totalScore challengesWon totalSubmissions lastActivity')
      .sort({ totalScore: -1, lastActivity: -1 })
      .limit(100);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      player: user.name,
      userId: user._id.toString(), // Convert to string
      id: user._id.toString(), // Add both for compatibility
      email: user.email,
      avatar: user.avatar,
      score: user.totalScore,
      challengesWon: user.challengesWon,
      totalSubmissions: user.totalSubmissions,
      lastActivity: user.lastActivity
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching global leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user rank in current challenge
router.get('/rank/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
        
    if (!userId || userId === 'undefined') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // FIXED: Use same query as leaderboard to ensure consistency
    const currentChallenge = await Challenge.findOne({
      status: 'active',
      isActive: true,
      endTime: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    if (!currentChallenge) {
      return res.status(404).json({ message: 'No active challenge found' });
    }

    // Get user's rank in current challenge
    const submissions = await Submission.find({
      challengeId: currentChallenge._id
    })
    .populate('userId', '_id')
    .sort({ score: -1, submittedAt: 1 });

    const userRank = submissions.findIndex(
      submission => submission.userId && submission.userId._id.toString() === userId
    ) + 1;

    res.json({
      rank: userRank > 0 ? userRank : null,
      challengeId: currentChallenge._id
    });
  } catch (error) {
    console.error('Error fetching user rank:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;