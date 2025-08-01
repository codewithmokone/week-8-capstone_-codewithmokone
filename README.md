# MERN Stack Capstone Project

This assignment focuses on designing, developing, and deploying a comprehensive full-stack MERN application that showcases all the skills you've learned throughout the course.

## Assignment Overview

You will:
1. Plan and design a full-stack MERN application
2. Develop a robust backend with MongoDB, Express.js, and Node.js
3. Create an interactive frontend with React.js
4. Implement testing across the entire application
5. Deploy the application to production

## Getting Started

1. Accept the GitHub Classroom assignment
2. Clone the repository to your local machine
3. Follow the instructions in the `Week8-Assignment.md` file
4. Plan, develop, and deploy your capstone project

## Files Included

- `Week8-Assignment.md`: Detailed assignment instructions

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git and GitHub account
- Accounts on deployment platforms (Render/Vercel/Netlify/etc.)

## Project Ideas

The `Week8-Assignment.md` file includes several project ideas, but you're encouraged to develop your own idea that demonstrates your skills and interests.

## Submission

Your project will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Commit and push your code regularly
2. Include comprehensive documentation
3. Deploy your application and add the live URL to your README.md
4. Create a video demonstration and include the link in your README.md

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [GitHub Classroom Guide](https://docs.github.com/en/education/manage-coursework-with-github-classroom) 

## Features
- User authentication and authorization
- CRUD operations with MongoDB
- RESTful API built with Express and Node.js
- Responsive frontend built with React
- State management with Context API or Redux (optional)
- Form validation and error handling
- Environment variables for configuration
- Deployment-ready setup

## Technologies Used
- Frontend: React, React Router, Axios, CSS/SCSS
- Backend: Node.js, Express.js

- Database: MongoDB (using Mongoose ORM)

- Other: JWT for authentication, dotenv for environment variables

## Getting Started
### Prerequisites
- Node.js (v14 or higher recommended)

- npm or yarn

- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

## Installation
1. Clone the repo

```
bash
Copy
Edit
git clone https://github.com/your-username/mern-project.git
cd mern-project
```

2. Setup backend
```
bash
Copy
Edit
cd backend
npm install
```


3. Setup frontend
```
bash
Copy
Edit
cd ../frontend
npm install
```


## Environment Variables
- Create a .env file in the backend directory:
```
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Application
- Open two terminal windows or tabs:

1. Run the backend server:
```
bash
Copy
Edit
cd backend
npm run dev   # or `npm start` depending on your setup
```

2. Run the frontend development server:
```
bash
Copy
Edit
cd frontend
npm start
```

## Project Structure
```
bash
Copy
Edit
/backend
  ├── controllers
  ├── models
  ├── routes
  ├── middleware
  ├── server.js
  └── .env

/frontend
  ├── public
  ├── src
      ├── components
      ├── context
      ├── pages
      ├── utils
      └── App.js
```
Available Scripts
Backend
npm run dev - Start backend with nodemon (development)

npm start - Start backend (production)

Frontend
npm start - Start React development server

npm run build - Build React app for production

API Endpoints (Example)
Method	Endpoint	Description
GET	/api/users	Get all users
POST	/api/users/register	Register a new user
POST	/api/users/login	User login
GET	/api/items	Get all items (example)
POST	/api/items	Create new item
PUT	/api/items/:id	Update item by ID
DELETE	/api/items/:id	Delete item by ID

## Contributing
### Contributions are welcome! Please:
1. Fork the repository
2. Create your feature branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/your-feature)
5. Open a pull request

## License
- This project is licensed under the MIT License - see the LICENSE file for details.


## Live Demo:
- Frontend Admin: https://week-8-capstone-codewithmokone.vercel.app/
- Backend: https://week-8-capstone-codewithmokone.onrender.com
- Figma: https://www.figma.com/design/tKxNXgKp7QVTH4ZMCv4cUs/PLP-MERN?node-id=0-1&t=rfPfi8Tc6dd3mrB9-1

## Demo account:
- Email: admin@admin.com
- Password: admin
