const express = require('express');
const router = express.Router();
const quizController = require('../controllers/instructor/quizController');

router.post('/', quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.put('/:id', quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);
router.get('/:id/performance', quizController.getQuizPerformance);

module.exports = router;
