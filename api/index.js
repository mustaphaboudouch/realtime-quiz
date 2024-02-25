require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const quizRouter = require('./routes/quiz');
const sessionRouter = require('./routes/session');
const { verifyToken } = require('./lib/token');
const isAuthenticatedSocket = require('./middlewares/isAuthenticatedSocket');

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

/**
 * Run socket server
 */

io.on('connection', async function (socket) {
	console.log(`🚀 ${socket.id} user connected successfully`);
	console.log('User', socket.user);

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
