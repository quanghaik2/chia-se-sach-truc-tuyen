const router = require('express').Router();
const authController = require('../controllers');


//get routes test bug
router.get('/loginao', authController.auth.virtualLoginUser);

// Post request
router.post('/register',authController.auth.register);
router.post('/login', authController.auth.login);
router.post('/refresh', authController.auth.refreshToken);

module.exports = router;