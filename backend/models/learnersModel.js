const mongoose = require('mongoose');

const LearnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  gender: {
    type: String,
  },

  guardianName: {
    type: String,
    required: true,
    trim: true,
  },

  contactNumber: {
    type: Number,
    required: true,
  },
},{timestamps: true});

module.exports = mongoose.model('Learner', LearnerSchema);
