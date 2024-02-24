const jwt = require('jsonwebtoken');

function buildToken(user) {
	const payload = {
		id: user.id,
		username: user.username,
		role: user.role,
	};
	return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: 604800,
	});
}

function verifyToken(token) {
	try {
		return jwt.verify(token, process.env.JWT_SECRET_KEY);
	} catch (error) {}
}

module.exports = {
	buildToken,
	verifyToken,
};
