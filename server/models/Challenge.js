const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  rules: [{
    type: String,
    required: true
  }],
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    required: true
  },
  maxScore: {
    type: Number,
    default: 100
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalParticipants: {
    type: Number,
    default: 0
  },
  totalSubmissions: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed'],
    default: 'active' // Changed from 'upcoming' to 'active'
  }
}, {
  timestamps: true
});

// FIXED: Auto-update status based on time
challengeSchema.pre('save', function(next) {
  const now = new Date();
  
  // If endTime has passed, mark as completed
  if (now >= this.endTime) {
    this.status = 'completed';
    this.isActive = false;
  } 
  // If challenge hasn't ended yet, mark as active
  else if (now >= this.startTime && now < this.endTime) {
    this.status = 'active';
    this.isActive = true;
  }
  // If challenge hasn't started yet, mark as upcoming
  else if (now < this.startTime) {
    this.status = 'upcoming';
    this.isActive = false;
  }
  
  next();
});

// ADDED: Static method to update all challenge statuses
challengeSchema.statics.updateAllStatuses = async function() {
  const now = new Date();
  
  // Mark completed challenges
  await this.updateMany(
    { endTime: { $lte: now }, status: { $ne: 'completed' } },
    { status: 'completed', isActive: false }
  );
  
  // Mark active challenges
  await this.updateMany(
    { 
      startTime: { $lte: now }, 
      endTime: { $gt: now }, 
      status: { $ne: 'active' } 
    },
    { status: 'active', isActive: true }
  );
  
  // Mark upcoming challenges
  await this.updateMany(
    { startTime: { $gt: now }, status: { $ne: 'upcoming' } },
    { status: 'upcoming', isActive: false }
  );
};

module.exports = mongoose.model('Challenge', challengeSchema);