// Import required modules
// const express = require('express');
const app = require("./app");
const mongoose = require('mongoose');
const http = require('http')
const { Server } = require('socket.io')

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Change this to your frontend URL
    methods: ['GET', 'POST'],
  },
})

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('sendMessage', ({ conversationId, message }) => {
    console.log('New message received:', message)

    // Optionally save to database here...

    // Broadcast to all clients
    io.emit('receiveMessage', { conversationId, message })
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