const mongoose = require('mongoose');

const Session = mongoose.model(
	'Session',
	mongoose.Schema({
		quizId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Quiz',
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['ACTIVE', 'EXPIRED'],
			default: 'ACTIVE',
		},
	}),
);

module.exports = Session;
