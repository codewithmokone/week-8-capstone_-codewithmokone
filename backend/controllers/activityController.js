import Activity from '../models/Activity.js'

// GET all activities
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
    res.json(activities)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST create new activity
export const createActivity = async (req, res) => {
  try {
    const newActivity = new Activity(req.body)
    const saved = await newActivity.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}