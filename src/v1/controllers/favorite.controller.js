const service = require('../services');

const favoriteBook = async (req, res, next) => {
    try {
        const { bookId } = req.body;
        const result = await service.favorite.favoriteBook(bookId, userId, req.user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const unFavoriteBook = async (req, res, next) => {
    try{
        const { bookId } = req.body;
        const result = await service.favorite.unFavoriteBook(bookId, userId, req.user);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getFavoriteByUser = async (req, res, next) => {
    try {
        const result = await service.favorite.getFavoriteByUser(req.user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    favoriteBook,
    unFavoriteBook,
    getFavoriteByUser,
};