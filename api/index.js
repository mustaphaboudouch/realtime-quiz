require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

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

/**
 * Routes
 */

app.get('/', function (_, res) {
	res.send('Realtime Quiz API');
});

/**
 * Run socket server
 */

io.on('connection', async function (socket) {
	console.log(`🚀 Socket connected`);
});

/**
 * Run HTTP server
 */

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
	console.log(`🚀 HTTP server is running on port ${PORT}`);
});
