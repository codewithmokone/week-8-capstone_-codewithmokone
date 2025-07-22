const Event = require('../models/eventModel');

// GET all activities
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// POST create new activity
exports.createEvent = async (req, res) => {
    console.log(req.body);

    try {
        const { name, date, type, description } = req.body;

        const newEvent = new Event({
            name, date, type, description
        });

        const event = await Event.create(newEvent)
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}