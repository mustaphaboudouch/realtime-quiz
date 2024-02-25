require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const quizRouter = require('./routes/quiz');
const sessionRouter = require('./routes/session');
const subscriptionRouter = require('./routes/subscription');
const isAuthenticatedSocket = require('./middlewares/isAuthenticatedSocket');
const Session = require('./models/session');
const { SESSION_STATUSES, SUBSCRIPTION_STATUSES } = require('./lib/constants');
const Quiz = require('./models/quiz');
const Subscription = require('./models/subscription');

/**
 * Initialize express app & servers
 */

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: { origin: '*' },
});

/**
 * MongoDB connection
 */

mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(function () {
		console.log('💾 MongoDB database is connected successfully');
	})
	.catch(function (error) {
		console.error('❌ MongoDB database connection failed', error.message);
	});

/**
 * Middlewares
 */

app.use(cors({ origin: '*' }));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

io.use(function (socket, next) {
	isAuthenticatedSocket(socket, next);
});

/**
 * Routes
 */

app.get('/', function (_req, res) {
	res.send('Realtime Quiz API');
});

app.use('/', authRouter);
app.use('/quizzes', quizRouter);
app.use('/sessions', sessionRouter);
app.use('/subscriptions', subscriptionRouter);

/**
 * Run socket server
 */

function formatQuizToSubscription(quiz) {
	return quiz.toJSON().questions.map(({ points, ...question }) => ({
		...question,
	}));
}

io.on('connection', async function (socket) {
	console.log(`🚀 ${socket.id} user connected successfully`);

	socket.on('SESSION_JOIN', async function (code) {
		const session = await Session.findOne({
			code,
			status: SESSION_STATUSES.ACTIVE,
		});

		if (!session) {
			socket.emit('SESSION_JOIN_ERROR', 'Invalid session code');
		}

		const quiz = await Quiz.findOne({
			_id: session.quizId,
		});

		const subscription = await Subscription.findOne({
			userId: socket.user.id,
			status: SUBSCRIPTION_STATUSES.ACTIVE,
		});

		if (subscription) {
			socket.emit('SESSION_JOIN_ERROR', 'You have already a running session');
		}

		await Subscription.create({
			userId: socket.user.id,
			sessionId: session._id,
			questions: formatQuizToSubscription(quiz),
		});

		socket.emit('SESSION_JOIN_SUCCESS', null);
	});

	socket.on('QUESTION_ANSWER', async function (data) {
		const subscription = await Subscription.findOne({
			_id: data.subscriptionId,
			userId: socket.user.id,
			status: SUBSCRIPTION_STATUSES.ACTIVE,
		});
		if (!subscription) {
			return socket.emit('QUESTION_ANSWER_ERROR', 'Subscription not found');
		}

		const question = subscription.questions.find(
			(q) => q._id.toHexString() === data.questionId,
		);
		if (question.isAnswered) {
			return socket.emit(
				'QUESTION_ANSWER_ERROR',
				'You already answered this question',
			);
		}

		const session = await Session.findOne({
			_id: subscription.sessionId,
			status: SESSION_STATUSES.ACTIVE,
		});
		if (!session) {
			return socket.emit('QUESTION_ANSWER_ERROR', 'Session not found');
		}

		const quiz = await Quiz.findOne({
			_id: session.quizId,
			status: SESSION_STATUSES.ACTIVE,
		}).select('+questions.answers.isCorrect');
		if (!quiz) {
			return socket.emit('QUESTION_ANSWER_ERROR', 'Quiz not found');
		}

		const quizQuestion = quiz.questions.find((q) => (q._id = data.questionId));

		let isCorrect = true;
		for (const answer of data.answers) {
			const a = quizQuestion.answers.find(
				(an) => an._id.toHexString() === answer._id,
			);
			if (a && a.isCorrect !== answer.isSelected) {
				isCorrect = false;
			}
		}

		const newSubscription = await Subscription.findOneAndUpdate(
			{
				_id: subscription.id,
				'questions._id': data.questionId,
			},
			{
				$set: {
					'questions.$.isAnswered': true,
					'questions.$.isCorrect': isCorrect,
					'questions.$.answers': data.answers,
				},
			},
			{ new: true },
		);

		const numOfQuestions = newSubscription.questions.filter(
			(q) => q.isAnswered === false,
		).length;

		if (numOfQuestions > 0) {
			const nextQuestion = newSubscription.questions.find((q) => !q.isAnswered);
			const payload = {
				_id: newSubscription._id,
				question: nextQuestion,
				hasMoreQuestions: numOfQuestions >= 2,
			};
			isCorrect
				? socket.emit('QUESTION_NEXT_SUCCESS', payload)
				: socket.emit('QUESTION_NEXT_ERROR', payload);
		} else {
			await Subscription.findOneAndUpdate(
				{ _id: subscription.id },
				{ status: 'DONE' },
				{ new: true },
			);

			isCorrect
				? socket.emit('QUESTION_DONE_SUCCESS', newSubscription._id)
				: socket.emit('QUESTION_DONE_ERROR', newSubscription._id);
		}
	});

	socket.on('disconnect', function () {
		console.log(`💤 ${socket.id} user disconnected successfully`);
	});
});

/**
 * Run HTTP server
 */

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
	console.log(`🚀 HTTP server is running on port ${PORT}`);
});
