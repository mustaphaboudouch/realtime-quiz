const express = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const {
	getQuizzes,
	getQuizById,
	createQuiz,
	updateQuiz,
	deleteQuiz,
} = require('../controllers/quiz');

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getQuizzes);
router.get('/:id', isAuthenticated, isAdmin, getQuizById);
router.post('/', isAuthenticated, isAdmin, createQuiz);
router.patch('/:id', isAuthenticated, isAdmin, updateQuiz);
router.delete('/:id', isAuthenticated, isAdmin, deleteQuiz);

module.exports = router;
