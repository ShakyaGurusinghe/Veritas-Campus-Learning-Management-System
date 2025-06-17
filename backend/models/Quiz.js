const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  marks: Number,
  options: {
    A: String,
    B: String,
    C: String,
    D: String,
  },
  correctAnswer: String,
});

const quizSchema = new mongoose.Schema({
  title: String,
  availability: String,
  timeLimit: Date,
  totalMarks: Number,
  allowMultipleAttempts: Boolean,
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled"
  },
  questions: [ questionSchema ],
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);

