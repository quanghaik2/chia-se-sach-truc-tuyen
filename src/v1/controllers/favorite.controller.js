const service = require('../services');

const favoriteBook = async (req, res, next) => {
    try {
        const { bookId } = req.body;
        const favorite = await service.favorite.favoriteBook(bookId, req.user);
        if(favorite.err){
            return res.status(401).json(favorite);
        }
        return res.status(200).json(favorite);
    } catch (error) {
        next(error);
    }
};

const unFavoriteBook = async (req, res, next) => {
    try{
        const { bookId } = req.body;
        const favorite = await service.favorite.unFavoriteBook(bookId, req.user);
        if(favorite.err){
            return favorite.status(401).json(favorite);
        }
        return res.status(200).json(favorite);
    } catch (err) {
        next(err);
    }
};

const getFavoriteByUser = async (req, res, next) => {
    try {
        const favorite = await service.favorite.getFavoriteByUser(req.user);
        if(favorite.err){
            return res.status(401).json(favorite);
        }
        res.status(200).json(favorite);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    favoriteBook,
    unFavoriteBook,
    getFavoriteByUser,
};