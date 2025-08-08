const employeeModel = require('../models/employeesModel');
// const upload = require('../middleware/uploads');
// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');
// const { log } = require('console');

//Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const posts = await employeeModel.find().sort({ createdAt: -1 });

    const formattedPosts = posts.map(post => {
      const postObj = post.toObject();

      if (postObj.featuredImage?.data) {
        postObj.featuredImage = {
          type: postObj.featuredImage.contentType,
          data: postObj.featuredImage.data.toString('base64')
        };
      }

      return postObj;
    });
    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single employee
exports.getEmplyeeById = async (req, res) => {
  try {
    const post = await employeeModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new employee
exports.createEmployees = async (req, res) => {
  const { fullName,
    email,
    position,
    contactNumber,
    department,
    address,
    dateHired } = req.body;

  try {
    // const imageData = req.file ? fs.readFileSync(path.join(__dirname + '../../uploads/' + req.file.filename)) : null;

    const newEmployee = await employeeModel.create({
      fullName,
      email,
      position,
      contactNumber,
      department,
      address,
      dateHired,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update a employee
exports.updateEmployee = async (req, res) => {
  console.log("Info to update: ",req.body);

  try {
    const updateData = {
      ...req.body,
    }

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a post
exports.deleteEmployee = async (req, res) => {
  console.log(req.params.id);

  try {
    const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
