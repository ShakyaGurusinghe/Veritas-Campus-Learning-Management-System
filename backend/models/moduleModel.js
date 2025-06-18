const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  quizQuestions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
  }],
  dueDate: { type: Date },
  uploadDate: { type: Date, default: Date.now },
});

const moduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { type: String, required: true },
  description: { type: String },
  week: { type: Number, required: true },
  lectureMaterials: [contentSchema],
  quizzes: [contentSchema],
  announcements: [contentSchema],
});

const Module = mongoose.models.Module || mongoose.model('Module', moduleSchema);

module.exports = Module;