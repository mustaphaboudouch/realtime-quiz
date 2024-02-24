require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

/**
 * Initialize express app & servers
 */

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: { origin: '*' },
});

/**
 * Middlewares
 */

app.use(cors({ origin: '*' }));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

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
