const router = require('express').Router();
const authController = require('../controllers');

// Post request
router.post('/register',authController.auth.register);
router.post('/login', authController.auth.login);

module.exports = router;