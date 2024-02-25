const express = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const {
	getCurrentSubscription,
	getSubscriptions,
	getSubscriptionById,
} = require('../controllers/subscription');

const router = express.Router();

router.get('/', isAuthenticated, getSubscriptions);
router.get('/current', isAuthenticated, getCurrentSubscription);
router.get('/:id', isAuthenticated, getSubscriptionById);

module.exports = router;
