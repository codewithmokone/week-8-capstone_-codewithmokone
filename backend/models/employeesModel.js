const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
  },
    contactNumber: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
  },
  address: {
    type: String,
  },
  dateHired: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);