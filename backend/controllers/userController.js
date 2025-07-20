const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');
const userModel = require('../models/userModel');
dotenv.config();

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
    console.log(formattedUsers);

    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    console.log("User: ", fullname, email, password);


    // Check if the user already exits
    const userExists = await User.findOne({ email });
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

    // console.log("New User: ", newUser);


    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
}

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);


    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
}

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Protected route
exports.profile = (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
};