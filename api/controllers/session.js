const Quiz = require('../models/quiz');
const Session = require('../models/session');
const { SESSION_STATUSES, QUIZ_STATUSES } = require('../lib/constants');

async function getSessions(_req, res) {
	try {
		const quizzes = await Quiz.findOne({
			userId: res.locals.user.id,
			status: QUIZ_STATUSES.ACTIVE,
		});
		const quizzesIds = quizzes.map((quiz) => quiz._id);

		const sessions = await Session.find({
			status: SESSION_STATUSES.ACTIVE,
			quizId: {
				$in: quizzesIds,
			},
		});

		return res.status(200).json(sessions);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getSessionById(req, res) {
	try {
		const quizzes = await Quiz.findOne({
			userId: res.locals.user.id,
			status: QUIZ_STATUSES.ACTIVE,
		});
		const quizzesIds = quizzes.map((quiz) => quiz._id);

		const session = await Session.findOne({
			_id: req.params.id,
			status: SESSION_STATUSES.ACTIVE,
			quizId: {
				$in: quizzesIds,
			},
		});

		if (!session) {
			return res.status(404).json({ message: 'Session not found' });
		}

		return res.status(200).json(session);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function createSession(req, res) {
	try {
		const { quizId, code } = req.body;

		const quizzes = await Quiz.findOne({
			userId: res.locals.user.id,
			status: QUIZ_STATUSES.ACTIVE,
		});
		const quizzesIds = quizzes.map((quiz) => quiz._id);

		if (!quizId || !quizzesIds.includes(quizId) || !code) {
			return res.status(400).json({ message: 'Invalid input' });
		}

		const session = await Session.create({
			quizId,
			code,
			status: SESSION_STATUSES.ACTIVE,
		});

		return res.status(201).json(session);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function updateSession(req, res) {
	try {
		const { status } = req.body;
		if (!Object.keys(SESSION_STATUSES).includes(status)) {
			return res.status(400).json({ message: 'Invalid input' });
		}

		const quizzes = await Quiz.findOne({
			userId: res.locals.user.id,
			status: QUIZ_STATUSES.ACTIVE,
		});
		const quizzesIds = quizzes.map((quiz) => quiz._id);

		const session = await Session.findOneAndUpdate(
			{
				_id: req.params.id,
				status: SESSION_STATUSES.ACTIVE,
				quizId: {
					$in: quizzesIds,
				},
			},
			{ status },
			{ new: true },
		);

		if (!session) {
			return res.status(404).json({ message: 'Session not found' });
		}

		return res.status(200).json(session);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	getSessions,
	getSessionById,
	createSession,
	updateSession,
};
