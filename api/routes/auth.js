const express = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const { signUp, signIn, me } = require('../controllers/auth');

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/me', isAuthenticated, me);

module.exports = router;
