const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config();

// Routes
let dashboardRoutes, announcementRoute, quizRoutes, lectureRoutes, instructorSupportRoutes, instructorRoutes, assignmentRoutes;
try {
  dashboardRoutes = require('./routes/instructor/dashboardRoutes');
  announcementRoute = require("./routes/instructor/announcementRoute");
  quizRoutes = require("./routes/instructor/quizRoutes");
  lectureRoutes = require("./routes/instructor/lectureRoutes");
  instructorSupportRoutes = require('./routes/instructor/LectureSupportRoute');
  instructorRoutes = require('./routes/instructor/instructorRoutes');
  assignmentRoutes = require('./routes/instructor/assignmentRoutes');
  console.log('[DEBUG-SERVER] All routes imported successfully at', new Date().toISOString());
} catch (err) {
  console.error('[DEBUG-SERVER] Route import error:', err.message, 'at', new Date().toISOString());
  process.exit(1); // Exit if routes fail to load
}

const app = express();

// CORS Setup
app.use(cors({
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
console.log('[DEBUG-SERVER] CORS configured for http://localhost:3000');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  abortOnLimit: true,
}));
console.log('[DEBUG-SERVER] Middleware configured: JSON, URL-encoded, fileUpload');

// Debugging Middleware
app.use((req, res, next) => {
  console.log(`[DEBUG-SERVER] Request: ${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
});

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('[DEBUG-SERVER] Uploads directory created at', uploadDir);
}

// Static Folder for Uploaded Files
app.use("/uploads", express.static("uploads"));
console.log('[DEBUG-SERVER] Static uploads route configured');

// Mount Routes
app.use('/api/instructor', assignmentRoutes);
app.use('/api/instructor/modules', instructorRoutes);
app.use('/api/instructor/support', instructorSupportRoutes);
app.use('/api/instructor/announcement', announcementRoute);
app.use('/api/instructor/quiz', quizRoutes);
app.use('/api/instructor/lecture', lectureRoutes);
app.use('/api/instructor', dashboardRoutes);
console.log('[DEBUG-SERVER] Routes mounted at', new Date().toISOString());

// 404 Error Handling
app.use((req, res, next) => {
  console.log(`[DEBUG-SERVER] 404 Error: Route ${req.originalUrl} not found at ${new Date().toISOString()}`);
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[DEBUG-SERVER] Server Error at ${new Date().toISOString()}:`, err.stack);
  res.setHeader('Content-Type', 'application/json');
  res.status(err.status || 500).json({ error: 'Internal server error', details: err.message });
});

// Database Connection with fallback
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/veritas_campus_lms';
console.log('[DEBUG-SERVER] Attempting to connect to MongoDB at:', mongoUrl);

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('[DEBUG-SERVER] MongoDB connected successfully at', new Date().toISOString()))
  .catch((err) => {
    console.error('[DEBUG-SERVER] MongoDB connection failed:', err.message, 'at', new Date().toISOString());
    console.log('[DEBUG-SERVER] Server will continue without database connection for development');
    // Don't exit the process, allow server to run without DB for development
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[DEBUG-SERVER] Server running on http://localhost:${PORT} at ${new Date().toISOString()}`);
});