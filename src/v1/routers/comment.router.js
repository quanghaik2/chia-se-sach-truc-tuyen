const controller = require('../controllers');
const router = require('express').Router();
const middleware = require('../middlewares');


//get request
router.get('/getCommentsByBookId', middleware.checkToken, controller.comment.getCommentsByBookId);
router.get('/getCommentsByUserId', middleware.checkToken, controller.comment.getCommentsByUserId);
//Post request
router.post('/createComment', middleware.checkToken, controller.comment.createComment);
//put request
router.put('/updateComment', middleware.checkToken, controller.comment.updateComment);
router.put('/softDeleteComment', middleware.checkToken, controller.comment.softDeleteComment);

module.exports = router;