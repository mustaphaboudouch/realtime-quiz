const bcrypt = require('bcrypt');

const User = require('../models/user');
const { USER_ROLES } = require('../lib/constants');
const { buildToken } = require('../lib/token');

async function signUp(req, res) {
	try {
		const { username, password, role } = req.body;
		if (!username || !password || !Object.keys(USER_ROLES).includes(role)) {
			return res.status(400).json({ message: 'Invalid input' });
		}

		const user = await User.create({
			username,
			password: bcrypt.hashSync(req.body.password, 10),
			role,
		});

		return res.status(201).json(user);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function signIn(req, res) {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).json({ message: 'Invalid input' });
		}

		const user = await User.findOne({ username }).select('+password');
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = buildToken(user);
		return res.status(200).json({ token });
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function me(_req, res) {
	try {
		const user = await User.findById(res.locals.user.id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	signUp,
	signIn,
	me,
};
