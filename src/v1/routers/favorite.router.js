const router = require('express').Router();
const middleware = require('../middlewares');
const controller = require('../controllers');

// get Router
router.get('/getFavoriteByUser',middleware.checkToken, controller.favorite.getFavoriteByUser );
// post
router.post('/favoriteBook', middleware.checkToken, controller.favorite.favoriteBook);

// delete

router.delete('/unFavoriteBook', middleware.checkToken, controller.favorite.unFavoriteBook);

module.exports = router;
