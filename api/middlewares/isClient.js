const User = require('../models/user');
const { USER_ROLES } = require('../lib/constants');

async function isClient(_req, res, next) {
	const user = await User.findById(res.locals.user.id);

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	if (user.role !== USER_ROLES.CLIENT) {
		return res.status(401).json({ message: 'User is not a client' });
	}

	next();
}

module.exports = isClient;
