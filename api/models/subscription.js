const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	isSelected: {
		type: Boolean,
		default: false,
	},
});

const questionSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	question: {
		type: String,
		required: true,
	},
	isAnswered: {
		type: Boolean,
		default: false,
	},
	isCorrect: {
		type: Boolean,
		default: false,
	},
	answers: [answerSchema],
});

const Subscription = mongoose.model(
	'Subscription',
	mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		sessionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Session',
			required: true,
		},
		status: {
			type: String,
			enum: ['ACTIVE', 'DONE'],
			default: 'ACTIVE',
		},
		questions: [questionSchema],
	}),
);

module.exports = Subscription;
