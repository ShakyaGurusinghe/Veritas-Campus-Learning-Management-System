/*const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentAssignmentRoutes = require('./routes/student/assignmentRoutes');



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to DB
connectDB();

// Routes
app.use('/api/student', studentAssignmentRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));         */

/*const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
const cors = require('cors'); // not sure

dotenv.config();
connectDB();

app.use(cors()); // not sure
const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const studentRoutes = require("./routes/student/assignmentRoutes");
app.use("/api/student/assignments", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); */


const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const assignmentRoutes = require('./routes/student/assignmentRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/assignments', assignmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



