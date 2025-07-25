const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  time: { type: String },
  status: { type: String, enum: ['Completed', 'In Progress', 'Upcoming','not started'] },
}, { timestamps: true })

module.exports = mongoose.model('Activity', activitySchema);