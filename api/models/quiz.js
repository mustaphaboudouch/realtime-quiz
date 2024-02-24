const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	answer: {
		type: String,
		required: true,
	},
	isCorrect: {
		type: Boolean,
		default: false,
		select: false,
	},
});

const questionSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	points: {
		type: Number,
		required: true,
		min: 0,
		default: 1,
	},
	question: {
		type: String,
		required: true,
	},
	answers: [answerSchema],
});

const Quiz = mongoose.model(
	'Quiz',
	mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['ACTIVE', 'DELETED'],
			default: 'ACTIVE',
		},
		questions: [questionSchema],
	}),
);

module.exports = Quiz;
