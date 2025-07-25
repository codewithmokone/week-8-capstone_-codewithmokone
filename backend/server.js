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
// const io = new Server(server, {
//   cors: {
//     origin: [
//       'http://https://week-8-capstone-codewithmokone-zd6x.vercel.app', 
//       'https://week-8-capstone-codewithmokone.vercel.app'
//     ],
//     methods: ['GET', 'POST'],
//   },
// })

// const io = new Server(server);



// Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Join a global announcement group
//   socket.join('announcement');

//   // Handle joining specific group rooms
//   socket.on('joinRoom', (roomId) => {
//     if (roomId) {
//       socket.join(roomId.toString());
//       console.log(`Socket ${socket.id} joined room ${roomId}`);
//     }
//   });

//   socket.on('createGroup', async (group) => {
//     try {
//       // Make sure group has a valid id
//       group.id = group._id?.toString() || group.id || Date.now().toString();

//       // Broadcast to other clients
//       socket.broadcast.emit('newGroupCreated', group);

//       // Join the group creator to the room
//       socket.join(group.id.toString());

//       console.log('New group created:', group.name);
//     } catch (err) {
//       console.error('Error creating group:', err);
//     }

//   });



//   socket.on('sendMessage', async ({ conversationId, message}) => {
//     console.log(conversationId, message);

//     const isAnnouncement = conversationId === 'announcement';

//     try {
//       // Restrict announcement messages to staff/admin
//       if (isAnnouncement && message.role !== 'staff' && message.role !== 'admin') {
//         console.warn(`Unauthorized announcement attempt by ${message.role}`);
//         return socket.emit('errorMessage', {
//           error: 'Only staff or admin can send announcements.'
//         });
//       }

//       let savedMessage = null;

//       if (!isAnnouncement) {
//         // Validate conversationId format
//         const isValidId = mongoose.Types.ObjectId.isValid(conversationId);
//         if (!isValidId || !message.sender) {
//           console.error('Invalid conversationId or missing sender');
//           return;
//         }

//         //Save to DB for direct messages
//         savedMessage = await Message.create({
//           conversationId,
//           sender: message.sender,
//           content: message.content,
//           time: message.time,
//           type: 'direct'
//         });
//       }

//       const messageToSend = {
//         ...message,
//         _id: savedMessage?._id || Date.now(),
//         sender: message.sender
//       };

//       // Emit to appropriate room
//       io.to(isAnnouncement ? 'announcement' : conversationId.toString()).emit('receiveMessage', {
//         conversationId,
//         message: messageToSend
//       });

//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   })

//   socket.on('disconnect', () => {
//     console.log('A user disconnected:', socket.id)
//   })
// })

// Connect to MongoDB and start server
mongoose
  // .connect(process.env.MONGODB_URI)
  .connect(process.env.MONGODB_URI_ATLAS)
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