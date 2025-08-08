const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
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
    const user = await userModel.findById(req.user.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
    console.log("User profile: ", user);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, contactNumber } = req.body;

    console.log("User: ", fullName, email, password,);

    // Check if the user already exits
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      contactNumber
    })

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error });
  }
}

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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

    let userId = user._id

    // Generate JWT token
    const token = generateToken(userId);


    // console.log("User Info: ", user);
    res.json({ message: "Login successful", user: user, token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
}

// Update a user
exports.updateUser = async (req, res) => {
  console.log("Info to update: ", req.body);
  const { fullName, email, password,role, contactNumber } = req.body;

  try {
    // Hash the password
    const updateData = {
      fullName,
      email,
      role,
      contactNumber
    }

    // Only hash and include password if it's provided and not empty
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  console.log(req.params.id);

  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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