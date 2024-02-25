const { verifyToken } = require('../lib/token');

/**
 * Check if user is authenticated
 */
function isAuthenticated(req, res, next) {
	const authorization = req.headers.authorization;
	if (!authorization) return res.status(401).json({ message: 'Unauthorized' });

	const [type, token] = authorization.split(' ');
	if (type !== 'Bearer')
		return res.status(401).json({ message: 'Unauthorized' });

	const decodedToken = verifyToken(token);
	if (!decodedToken) return res.status(401).json({ message: 'Unauthorized' });

	res.locals.user = decodedToken;
	next();
}

module.exports = isAuthenticated;
