/* const mongoose = require("mongoose");

const markSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String, // e.g., "Assignment", "Midterm", "Quiz"
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Mark", markSchema); */

const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  module: {
    type: String,
    required: true,
  },
  mid: {
    type: Number,
    default: 0,
  },
  quiz: {
    type: Number,
    default: 0,
  },
  assignment: {
    type: Number,
    default: 0,
  },
});

const Mark = mongoose.model('Mark', markSchema);
module.exports = Mark;



