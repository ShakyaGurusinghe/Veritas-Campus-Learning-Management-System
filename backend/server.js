/* const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const assignmentRoutes = require('./routes/student/assignmentRoutes');
const cors = require('cors');
const marksRoutes = require("./routes/student/marksRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/assignments', assignmentRoutes);

app.use("/api/student", marksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});             */


const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const assignmentRoutes = require('./routes/student/assignmentRoutes');
const cors = require('cors');
const marksRoutes = require("./routes/student/marksRoutes"); // ✅ ADDED

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/assignments', assignmentRoutes);

// ✅ ADD THIS LINE to use marks route under /api/student
app.use("/api/student/marks", marksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  


