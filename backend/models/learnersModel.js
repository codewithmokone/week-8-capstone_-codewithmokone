const mongoose = require('mongoose');

const LearnerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
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
    enum: ['Male', 'Female', 'Other'],
  },

  guardians: [
    {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
    },
  ],

  emergencyContacts: [
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      relationship: { type: String },
    },
  ],

  allergies: {
    type: [String], // list of allergy names
    default: [],
  },

  specialNeeds: {
    type: String,
  },

  enrollmentDate: {
    type: Date,
    default: Date.now,
  },

  attendanceRecords: [
    {
      date: { type: Date, required: true },
      present: { type: Boolean, required: true },
    },
  ],

  notes: {
    type: String,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Learner', LearnerSchema);
