const express = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const {
	getSessions,
	getSessionById,
	createSession,
	updateSession,
} = require('../controllers/session');

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getSessions);
router.get('/:id', isAuthenticated, isAdmin, getSessionById);
router.post('/', isAuthenticated, isAdmin, createSession);
router.patch('/:id', isAuthenticated, isAdmin, updateSession);

module.exports = router;
