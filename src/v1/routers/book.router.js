const controllers = require('../controllers');
const router = require('express').Router();
const middleware = require('../middlewares');

//get routes

router.get('/', controllers.book.getAllBooks);
router.get('/getOneBook/:slug', controllers.book.getOneBook);
router.get('/getBookId/:id', controllers.book.getBookId);
router.get('/getPendingBooks', middleware.checkRole, controllers.book.getPendingBooks);
router.get('/getBookByUser/:nameUser',controllers.book.getBookByUser);
router.get('/getBookByName/:name',controllers.book.getBookByName);
router.get('/searchBook', controllers.book.searchBook);
// Post routes
router.post('/',middleware.checkToken, controllers.book.createBook);
router.post('/approvedBook',middleware.checkRole, controllers.book.approvedBook);
// Put routes
router.put('/',middleware.checkToken, controllers.book.updateBook);
router.put('/softDelete',middleware.checkToken, controllers.book.softDeleteBook);
// Delete routes
router.delete('/', middleware.checkToken, controllers.book.DeleteBook);

module.exports = router;