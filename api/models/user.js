const mongoose = require('mongoose');

const User = mongoose.model(
	'User',
	mongoose.Schema({
		username: {
			type: String,
			required: true,
			unique: true,
			minlength: 4,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			select: false,
		},
		role: {
			type: String,
			enum: ['ADMIN', 'CLIENT'],
			default: 'CLIENT',
		},
	}),
);

module.exports = User;
