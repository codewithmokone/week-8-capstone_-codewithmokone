const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    avatar: {
        type: String,
        default: 'G',
    },
        createdBy: {
        type: String, // user ID or role (e.g. 'admin')
    },
    members: {
        type: [String], // Array of user IDs or roles (e.g. ['staff', 'parent123', ...])
        default: [],
    },
    messages: [
        {
            sender: String,
            content: String,
            time: String,
        }
    ],
}, { timestamps: true })

module.exports = mongoose.model('Group', groupSchema);