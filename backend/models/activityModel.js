import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  time: { type: String },
  status: { type: String, enum: ['Completed', 'In Progress', 'Upcoming'] },
}, { timestamps: true })

export default mongoose.model('Activity', activitySchema)