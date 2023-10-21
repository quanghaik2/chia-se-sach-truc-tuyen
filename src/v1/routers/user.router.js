const router = require('express').Router();
const authController = require('../controllers');
// Get request
router.get('/', authController.user.getAllUsers);

module.exports = router;