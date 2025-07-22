const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation', // optional, if you have a Conversation model
    required: function () {
      return this.type !== 'announcement';
    }
  },
  sender: {
    type: String,
    enum: ['staff', 'parent'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  time: {
    type: String, // or use Date if you want more control
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);