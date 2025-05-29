const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String }, // For lecture materials, assignments
  quizQuestions: [{ // For quizzes
    question: String,
    options: [String],
    correctAnswer: Number,
  }],
  dueDate: { type: Date }, // For assignments
  uploadDate: { type: Date, default: Date.now },
});

const moduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Assuming a Course model exists
  title: { type: String, required: true },
  description: { type: String },
  week: { type: Number, required: true },
  lectureMaterials: [contentSchema],
  quizzes: [contentSchema],
  assignments: [contentSchema],
  announcements: [contentSchema],
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module; 