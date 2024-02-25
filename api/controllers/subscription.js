const { SUBSCRIPTION_STATUSES } = require('../lib/constants');
const Subscription = require('../models/subscription');

async function getSubscriptions(_req, res) {
	try {
		const subscriptions = await Subscription.find({
			userId: res.locals.user.id,
			status: SUBSCRIPTION_STATUSES.DONE,
		});

		console.log('subscriptions', subscriptions);

		return res.status(200).json(subscriptions);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getSubscriptionById(req, res) {
	try {
		const subscription = await Subscription.findOne({
			_id: req.params.id,
			userId: res.locals.user.id,
			status: SUBSCRIPTION_STATUSES.DONE,
		});

		if (!subscription) {
			return res.status(404).json({ message: 'Subscription not found' });
		}

		return res.status(200).json(subscription);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

async function getCurrentSubscription(_req, res) {
	try {
		const subscription = await Subscription.findOne({
			userId: res.locals.user.id,
			status: SUBSCRIPTION_STATUSES.ACTIVE,
		});

		if (!subscription) {
			return res.status(404).json({ message: 'Subscription not found' });
		}

		const numOfQuestions = subscription.questions.filter(
			(q) => q.isAnswered === false,
		).length;

		const nextQuestion = subscription.questions.find(
			(q) => q.isAnswered === false,
		);

		return res.status(200).json({
			_id: subscription._id,
			question: nextQuestion,
			hasMoreQuestions: numOfQuestions >= 2,
		});
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = {
	getSubscriptions,
	getSubscriptionById,
	getCurrentSubscription,
};
