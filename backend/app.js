const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
// const path = require('path');
// const bodyParser = require('body-parser');


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(cors(
    {
        origin: ['https://week-8-capstone-codewithmokone-xjut-d8vfwwx2t.vercel.app/','https://week-8-capstone-codewithmokone-zd6x.vercel.app/'],
        credentials: true,
    }
));
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/employees', require('./routes/employeesRoutes'));
app.use('/api/learners', require('./routes/learnersRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/activities', require('./routes/activitiesRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
app.use('/api/chat', require('./routes/chatUserRoutes'));

// Root route
app.get('/', (req, res) => {
    res.send('MERN Blog API is running');
});

module.exports = app;