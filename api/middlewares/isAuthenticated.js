const { verifyToken } = require('../lib/token');

/**
 * Check if user is authenticated
 */
function isAuthenticated(req, res, next) {
	const token = req.cookies[process.env.JWT_COOKIE_NAME];
	if (!token) return res.status(401).json({ message: 'Unauthorized' });

	const decodedToken = verifyToken(token);
	if (!decodedToken) return res.status(401).json({ message: 'Unauthorized' });

	res.locals.user = decodedToken;
	next();
}

module.exports = isAuthenticated;
