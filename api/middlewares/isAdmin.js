const User = require('../models/user');
const { USER_ROLES } = require('../lib/constants');

async function isAdmin(_req, res, next) {
	const user = await User.findById(res.locals.user.id);

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	if (user.role !== USER_ROLES.ADMIN) {
		return res.status(401).json({ message: 'User is not an admin' });
	}

	next();
}

module.exports = isAdmin;
