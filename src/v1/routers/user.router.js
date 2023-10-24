const router = require('express').Router();
const controller = require('../controllers');
const middleware = require('../middlewares');
// Get request
router.get('/', controller.user.getAllUsers);
router.get('/getOneUser/:userId', controller.user.getOneUser);
router.get('/getUserByName/:name', controller.user.getUserByName);
router.get('/getCurrent',middleware.checkToken, controller.user.getCurrent);

// Post request
router.post('/follow',middleware.checkToken ,controller.user.followUserById);
router.post('/unFollow',middleware.checkToken ,controller.user.unFollowUserById);

// Put request
router.put('/',middleware.checkToken, controller.user.updateUser);
router.put('/softDelete',middleware.checkRole, controller.user.softDeleteUser);

module.exports = router;
