const Quiz = require('../models/quiz');
const { QUIZ_STATUSES } = require('../lib/constants');

async function getQuizzes(_req, res) {
	try {
		const quizzes = await Quiz.find({
			userId: res.locals.user.id,
			status: QUIZ_STATUSES.ACTIVE,
		});

		return res.status(200).json(quizzes);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getQuizById(req, res) {
	try {
		const quiz = await Quiz.findOne({
			_id: req.params.id,
			userId: res.locals.user.id,
			status: QUIZ_STATUSES.ACTIVE,
		}).select('+questions.answers.isCorrect');

		if (!quiz) {
			return res.status(404).json({ message: 'Quiz not found' });
		}

		return res.status(200).json(quiz);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function createQuiz(req, res) {
	try {
		const { name, questions = [] } = req.body;
		if (!name) {
			return res.status(400).json({ message: 'Invalid input' });
		}

		const quiz = await Quiz.create({
			userId: res.locals.user.id,
			name,
			questions,
			status: QUIZ_STATUSES.ACTIVE,
		});

		return res.status(201).json(quiz);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateQuiz(req, res) {
	try {
		const { name, questions } = req.body;

		const quiz = await Quiz.findOneAndUpdate(
			{
				_id: req.params.id,
				userId: res.locals.user.id,
			},
			{
				name,
				questions,
			},
			{ new: true },
		);

		if (!quiz) {
			return res.status(404).json({ message: 'Quiz not found' });
		}

		return res.status(200).json(quiz);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function deleteQuiz(req, res) {
	try {
		const quiz = await Quiz.findOneAndUpdate(
			{
				_id: req.params.id,
				userId: res.locals.user.id,
			},
			{
				status: QUIZ_STATUSES.DELETED,
			},
			{ new: true },
		);

		if (!quiz) {
			return res.status(404).json({ message: 'Quiz not found' });
		}

		return res.status(204).json(null);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	getQuizzes,
	getQuizById,
	createQuiz,
	updateQuiz,
	deleteQuiz,
};
