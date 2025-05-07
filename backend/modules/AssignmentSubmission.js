

const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AssignmentSubmission', assignmentSchema);




