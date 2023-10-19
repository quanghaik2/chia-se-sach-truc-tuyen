const controllers = require('../controllers');
const router = require('express').Router();
const middleware = require('../middlewares');

//get routes

router.get('/getAllBooks', controllers.book.getAllBooks);
router.get('/getOneBook/:slug', controllers.book.getOneBook);
router.get('/getBookId/:id', controllers.book.getBookId);
// Post routes
router.post('/createBook',middleware.checkToken, controllers.book.createBook);
// Put routes
router.put('/updateBook', controllers.book.updateBook);
router.put('/deleteBook', controllers.book.softDeleteBook);

module.exports = router;