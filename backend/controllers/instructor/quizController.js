const mongoose = require('mongoose');
const Quiz = require('../../models/Quiz');
const ObjectId = mongoose.Types.ObjectId;

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id;
    if (!ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );
    if (!quiz) return res.status(404).json({ error: "Not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizPerformance = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    // TODO: replace these stubs with real calculations from your QuizResult collection
    const totalQ    = quiz.questions.length;
    const stubPerf  = {
      quizType:       quiz.title,
      questionCount:  totalQ,
      startDate:      quiz.createdAt,      // or your actual start date field
      totalQuestions: totalQ,
      accuracy:       75,                  // % of correct answers (stub)
      completedCount: 18,                  // how many students finished (stub)
      submissions:    20,                  // total submissions (stub)
      passCount:      15,                  // stub
      overview: [
        { studentId: 1, studentName: 'Std 01', points: 30, result: 'Pass' },
        { studentId: 2, studentName: 'Std 02', points: 12, result: 'Fail' },
        { studentId: 3, studentName: 'Std 03', points: 25, result: 'Pass' },
        // …add as many as you like for testing
      ]
    };

    res.json(stubPerf);
  } catch(err) {
    console.error('Performance fetch err:', err);
    res.status(500).json({ error: err.message });
  }
};