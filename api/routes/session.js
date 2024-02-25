const express = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const {
	getSessions,
	createSession,
	updateSession,
} = require('../controllers/session');

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, getSessions);
router.post('/', isAuthenticated, isAdmin, createSession);
router.patch('/:id', isAuthenticated, isAdmin, updateSession);

module.exports = router;
