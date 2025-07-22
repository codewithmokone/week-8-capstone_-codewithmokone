// Import required modules
// const express = require('express');
const app = require("./app");
const mongoose = require('mongoose');
const http = require('http')
const { Server } = require('socket.io')
const Message = require('./models/messageModel');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Change this to your frontend URL
    methods: ['GET', 'POST'],
  },
})

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a global announcement group
  socket.join('announcement');

  socket.on('sendMessage', async ({ conversationId, message, sender,senderRole }) => {
    console.log(conversationId, message, senderRole);

    // try {
    //   const isAnnouncement = conversationId === 'announcement';

    //   // Optionally save to database here...
    //   const savedMessage = await Message.create({
    //     conversationId: isAnnouncement ? undefined : conversationId,
    //     sender: sender,
    //     content: message.content,
    //     time: message.time,
    //     type: isAnnouncement ? 'announcement' : 'direct'
    //   });

    //   // Add the database _id to the message being sent out
    //   const messageToSend = {
    //     ...message,
    //     _id: savedMessage._id
    //   };

    //   if (conversationId === 'announcement') {
    //     // Broadcast to everyone in the announcement room
    //     io.to('announcement').emit('receiveMessage', {
    //       conversationId,
    //       message: messageToSend
    //     });
    //   } else {
    //     // Handle normal one-to-one messages
    //     io.to(conversationId.toString()).emit('receiveMessage', {
    //       conversationId,
    //       message: messageToSend
    //     });
    //   }

    //   // Broadcast to all clients
    //   // io.emit('receiveMessage', { conversationId, message })
    // } catch (error) {
    //   console.error('Error saving message:', error);
    // }

    const isAnnouncement = conversationId === 'announcement';

    try {
      // Restrict announcement messages to staff/admin
      if (isAnnouncement && senderRole !== 'staff' && senderRole !== 'admin') {
        console.warn(`Unauthorized announcement attempt by ${senderRole}`);
        return socket.emit('errorMessage', {
          error: 'Only staff or admin can send announcements.'
        });
      }

      let savedMessage = null;

      if (!isAnnouncement) {
        // Validate conversationId format
        const isValidId = mongoose.Types.ObjectId.isValid(conversationId);
        if (!isValidId || !sender) {
          console.error('Invalid conversationId or missing sender');
          return;
        }

        // Save to DB for direct messages
        savedMessage = await Message.create({
          conversationId,
          sender,
          content: message.content,
          time: message.time,
          type: 'direct'
        });
      }

      const messageToSend = {
        ...message,
        _id: savedMessage?._id || Date.now(),
        sender: sender
      };

      // Emit to appropriate room
      io.to(isAnnouncement ? 'announcement' : conversationId.toString()).emit('receiveMessage', {
        conversationId,
        message: messageToSend
      });

    } catch (error) {
      console.error('Error saving message:', error);
    }


  })

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id)
  })
})

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})