const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ChatUser = require('../models/chatUserModel');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'asdgtevdseewffgdbbt';

// Function to generate token
const generateToken = (userId) => {
  console.log(userId);
  
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
  
  console.log(token);
  
  return token;
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password,role } = req.body;

    console.log("User: ", fullname, email, password, role);

    // Check if the user already exits
    const userExists = await ChatUser.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new ChatUser({
      fullname,
      email,
      password: hashedPassword,
      role
    })

    const token = generateToken(newUser._id);

    await newUser.save();
    res.status(201).json({ message: "User registered successfully",token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    console.log(error);
    
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