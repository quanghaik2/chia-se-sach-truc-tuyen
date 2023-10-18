const router = require('express').Router();
const authController = require('../controllers');
// Get request
router.get('/getAll', authController.user.getAllUsers);

module.exports = router;