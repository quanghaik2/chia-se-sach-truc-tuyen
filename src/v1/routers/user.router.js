const router = require('express').Router();
const controller = require('../controllers');
// Get request
router.get('/', controller.user.getAllUsers);
router.get('/getOneUser', controller.user.getOneUser);
router.get('/getUserByName', controller.user.getUserByName);

// Put request
router.put('/', controller.user.updateUser);
router.put('/softDelete', controller.user.softDeleteUser);

module.exports = router;