const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ChatUser = require('../models/chatUserModel');
const dotenv = require('dotenv');
const userModel = require('../models/userModel');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'asdgtevdseewffgdbbt';

// Function to generate token
const generateToken = (userId) => {
  console.log(userId);
  
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
  
  console.log(token);
  
  return token;
};

// Gets all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });

    const formattedUsers = users.map(user => {
      const imageObj = user.toObject();

      if (imageObj.featuredImage?.data) {
        imageObj.featuredImage = {
          type: imageObj.featuredImage.contentType,
          data: imageObj.featuredImage.data.toString('base64')
        };
      }

      return imageObj;
    });

    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await ChatUser.findById(req.user.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
    console.log("User profile: ",user);
    
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    console.log("User: ", fullname, email, password);


    // Check if the user already exits
    const userExists = await ChatUser.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword
    })

    // const token = generateToken(newUser._id);

    // console.log("New User: ", newUser);


    await newUser.save();
    res.status(201).json({ message: "User registered successfully",token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
}

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await ChatUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let userId = user._id

    // Generate JWT token
    const token = generateToken(userId);
    

    // console.log("User Info: ", user);
    res.json({ message: "Login successful", user: user, token:token});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
}

// Delete a post
exports.deleteUser = async (req, res) => {
  console.log(req.params.id);

  try {
    const deletedUser = await ChatUser.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware to verify token
// const authenticate = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Access denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

// Protected route
exports.profile = (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
};