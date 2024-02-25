const { verifyToken } = require('../lib/token');

/**
 * Socket: check if user is authenticated
 */
function isAuthenticatedSocket(socket, next) {
	const { token } = socket.handshake.auth;

	if (!token) return next(new Error('Unauthorized'));

	const [type, encodedToken] = token.split(' ');
	if (type !== 'Bearer' || !encodedToken)
		return next(new Error('Unauthorized'));

	const decodedToken = verifyToken(encodedToken);
	if (!decodedToken) return next(new Error('Unauthorized'));

	socket.user = decodedToken;
	next();
}

module.exports = isAuthenticatedSocket;
