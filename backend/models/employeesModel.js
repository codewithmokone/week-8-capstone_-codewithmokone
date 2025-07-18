const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
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
  department: {
    type: String,
  },
  salary: {
    type: Number,
    min: 0,
  },
  dateHired: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);