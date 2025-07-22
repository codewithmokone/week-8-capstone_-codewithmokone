// const mongoose = require('mongoose');
// const Employee = require('./employee.model');

// Connect to MongoDB (replace with your connection string)
// mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Example: Create a new employee
// exports.createEmployee = async () => {

//     try {
//         const emp = new Employee({
//             firstName: 'Jane',
//             lastName: 'Doe',
//             email: 'jane.doe@example.com',
//             position: 'Developer',
//             department: 'Engineering',
//             salary: 70000,
//         });

//         await emp.save();
//         console.log('Employee saved:', emp);
//         res.status(201).json({ message: "Employee added successfully" });
//     } catch (error) {
//         console.log('Employee saved:', emp);
//     }
// }

const learnersModel = require('../models/learnersModel');
// const upload = require('../middleware/uploads');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
// const { log } = require('console');

//Get all employees
exports.getAllLearners = async (req, res) => {
  try {
    const learners = await learnersModel.find().sort({ createdAt: -1 });

    const formattedPosts = learners.map(learner => {
      const imageObj = learner.toObject();

      if (imageObj.featuredImage?.data) {
        imageObj.featuredImage = {
          type: imageObj.featuredImage.contentType,
          data: imageObj.featuredImage.data.toString('base64')
        };
      }

      return imageObj;
    });
    // console.log(formattedPosts);
    
    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post
exports.getPostById = async (req, res) => {
  try {
    const post = await employeeModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new post
exports.createLearner = async (req, res) => {
  const { fullName, dateOfBirth, gender,guardianName,contactNumber } = req.body;

  console.log("Controller", fullName, dateOfBirth, gender,guardianName,contactNumber);
  
  try {
    // const imageData = req.file ? fs.readFileSync(path.join(__dirname + '../../uploads/' + req.file.filename)) : null;

    const newLearner = new learnersModel({
      fullName,
      dateOfBirth,
      gender,
      guardianName,
      contactNumber
      // featuredImage: {
      //   data: imageData,
      //   contentType: 'image/png'
      // }
    });

    const learner = await learnersModel.create(newLearner)
    res.status(201).json(learner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update a post
exports.updateLearner = async (req, res) => {
  console.log(req.body);

  try {
    const updateData = {
      ...req.body,
    }

    if(req.file?.filename){
        updateData.featuredImage = req.file?.filename;
      }

    const updatedLearner = await learnersModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedLearner) return res.status(404).json({ message: 'Learner not found' });
    res.status(200).json(updatedLearner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a post
exports.deleteLearner = async (req, res) => {
  console.log(req.params.id);

  try {
    const deletedLearner = await learnersModel.findByIdAndDelete(req.params.id);
    if (!deletedLearner) return res.status(404).json({ message: 'Learner not found' });
    res.status(200).json({ message: 'Learner deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/posts/:postId/comments
// exports.addComment = async (req, res) => {
//   const { id } = req.params;

//   const { userId, content } = req.body;

//   console.log("User Id:", userId);
//   console.log("Content:", content);
//   console.log("Post Id:", id);

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid post ID' });
//   }

//   if (!userId || !content) {
//     return res.status(400).json({ error: 'User ID and comment content are required' });
//   }

//   try {
//     const post = await Post.findById(id);
//     if (!post) return res.status(404).json({ error: 'Post not found' });

//     await post.addComment(userId, content);

//     res.status(200).json({ message: 'Comment added successfully', comments: post.comments });
//   } catch (error) {
//     console.error('Error adding comment:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
