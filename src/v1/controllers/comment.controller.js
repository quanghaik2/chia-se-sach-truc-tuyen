const service = require('../services');

const createComment = async (req, res, next) => {
    try {
        const {bookId, content} = req.body;
        const userId = req.user;
        const comment = await service.comment.createComment({bookId, content}, userId);
        if(!comment.err){
            return res.status(404).json(comment);
        }

        return res.status(200).json(comment);

    } catch (err) {
        next(err);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const {commentId, content} = req.body;
        const userId = req.user;
        const comment = await service.comment.updateComment({commentId, content}, userId);
        if(!comment.err){
            return res.status(404).json(comment);
        }
        return res.status(200).json(comment);
        
    } catch (err) {
        next(err);
    }
};

const softDeleteComment = async (req, res, next) => {
    try {
        const {commentId} = req.body;
        const userId = req.user;
        const comment = await service.comment.softDeleteComment({commentId}, userId);
        if(!comment.err){
            return res.status(404).json(comment);
        }
        return res.status(200).json(comment);
        
    } catch (err) {
        next(err);
    }
}

const getCommentsByBookId = async (req, res, next) => {
    try {
        
        const comment = await service.comment.getCommentsByBookId(req.body.bookId);
        if(!comment.err){
            return res.status(404).json(comment);
        }
        return res.status(200).json(comment);
        
    } catch (err) {
        next(err);
    }
}

const getCommentsByUserId = async (req, res, next) => {
    try {
        const userId = req.user;
        const comment = await service.comment.getCommentsByUserId(userId);
        if(!comment.err){
            return res.status(404).json(comment);
        }
        return res.status(200).json(comment);
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createComment,
    updateComment,
    softDeleteComment,
    getCommentsByBookId,
    getCommentsByUserId,
};