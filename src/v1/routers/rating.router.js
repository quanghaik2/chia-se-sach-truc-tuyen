const { rating } = require('../controllers');

const router = require('express').Router();

router.get('/list', rating.getRatingList);
router
   .route('/')
   .get(rating.getAllRating)
   .post(rating.createRating)
   .put(rating.updateRating)
   .delete(rating.deleteRating);

module.exports = router;
