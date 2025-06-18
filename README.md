# Veritas Campus Learning Management System

A comprehensive Learning Management System (LMS) built with the MERN stack for Veritas International Campus, featuring role-based access for Admins, Instructors, and Students.

## 🚀 Features

### Core Features
- **User Authentication & Authorization**: Secure role-based access (Admin, Instructor, Student)
- **Course Management**: Create, update, delete, and manage courses and modules
- **Assignment Management**: Upload, edit, delete assignments with file support
- **Quiz System**: Create and manage quizzes with auto-evaluation
- **Dashboard Analytics**: Interactive dashboards for tracking progress
- **Real-time Notifications**: Updates for deadlines, grades, and announcements
- **Responsive Design**: Accessible across all devices

### Recent Improvements (feature-yashini-module-assignment-year-sem branch)

#### Backend Enhancements
- ✅ **Fixed MongoDB Connection Issues**: Added fallback connection logic and improved error handling
- ✅ **Enhanced Assignment Controller**: Fixed file upload/deletion with proper error handling
- ✅ **Improved Module Controller**: Added assignment population when fetching modules
- ✅ **Better Error Handling**: Comprehensive error logging and debugging
- ✅ **File Upload Security**: Secure file handling with proper validation

#### Frontend Improvements
- ✅ **Assignment Management UI**: Complete CRUD operations for assignments
- ✅ **Module Display**: Enhanced module pages with assignment integration
- ✅ **Responsive Design**: Professional UI with modern styling
- ✅ **Form Validation**: Improved user input validation
- ✅ **Real-time Updates**: Dynamic content updates without page refresh

#### Key Fixes
- ✅ **API Integration**: Fixed proxy configuration for backend communication
- ✅ **File Operations**: Resolved file upload and deletion permission issues
- ✅ **Data Consistency**: Ensured proper data flow between frontend and backend
- ✅ **User Experience**: Improved navigation and user interface

## 🛠️ Tech Stack

- **Frontend**: React.js, CSS3, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Deployment**: Ready for cloud deployment

## 📦 Installation

### Prerequisites
- Node.js (v16 or later)
- MongoDB (local or cloud)
- Git

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Prathviharan/Veritas-Campus-Learning-Management-System.git
   cd Veritas-Campus-Learning-Management-System
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URL=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Server will run on `http://localhost:5000`

### Start Frontend Application
```bash
cd frontend
npm start
```
Application will run on `http://localhost:3000`

## 📁 Project Structure

```
Veritas-Campus-Learning-Management-System/
├── backend/
│   ├── controllers/
│   │   ├── instructor/
│   │   │   ├── assignmentController.js    # Assignment CRUD operations
│   │   │   ├── moduleController.js        # Module management
│   │   │   └── ...
│   ├── models/
│   │   ├── assignmentmodel.js             # Assignment schema
│   │   ├── moduleModel.js                 # Module schema
│   │   └── ...
│   ├── routes/
│   │   ├── instructor/
│   │   │   ├── assignmentRoutes.js        # Assignment API routes
│   │   │   └── ...
│   │   ├── uploads/                           # File upload directory
│   └── server.js                          # Main server file
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── instructor/
│   │   │   │   ├── AddAssignment.js       # Assignment management UI
│   │   │   │   ├── ModuleDisplay.js       # Module display page
│   │   │   │   └── ...
│   │   ├── components/
│   │   │   ├── Navbar.js                  # Navigation component
│   │   │   └── ...
│   │   └── css/
│   │       ├── AddAssignment.css          # Assignment page styles
│   │       └── ...
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Assignment Management
- `POST /api/instructor/assignments/:moduleId` - Create assignment
- `GET /api/instructor/assignments` - Get all assignments
- `GET /api/instructor/assignments/:id` - Get specific assignment
- `PUT /api/instructor/assignments/:id` - Update assignment
- `DELETE /api/instructor/assignments/:id` - Delete assignment

### Module Management
- `GET /api/instructor/modules` - Get all modules
- `GET /api/instructor/modules/:id` - Get specific module with assignments
- `POST /api/instructor/modules` - Create module
- `PUT /api/instructor/modules/:id` - Update module
- `DELETE /api/instructor/modules/:id` - Delete module

## 🎯 Key Features Implemented

### Assignment Management System
- **Create Assignments**: Upload files, set deadlines, configure visibility
- **Edit Assignments**: Update title, description, deadline, and files
- **Delete Assignments**: Remove assignments with file cleanup
- **View All Assignments**: Comprehensive assignment listing with search/filter

### Module Integration
- **Assignment Display**: View assignments within module context
- **Module-Assignment Linking**: Proper relationship management
- **Dynamic Updates**: Real-time assignment updates in modules

### User Interface
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Intuitive Navigation**: Easy-to-use interface for all user types
- **Form Validation**: Client-side validation for better UX

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different permissions for different user types
- **File Upload Security**: Validated file uploads with size limits
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Deployment

The application is ready for deployment on various platforms:

- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Heroku, AWS, DigitalOcean, or any Node.js hosting
- **Database**: MongoDB Atlas for cloud database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributors

- **Yashini** - Module, Assignment, Year, Semester management
- **Prathviharan** - Project maintainer

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This branch (`feature-yashini-module-assignment-year-sem`) contains significant improvements to the assignment and module management systems, with enhanced error handling, better user experience, and comprehensive CRUD operations. 