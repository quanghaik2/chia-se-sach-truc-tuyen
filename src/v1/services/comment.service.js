const models = require('../models');

const createComment = ({bookId,...body}, userId) => new Promise(async (resolve, reject)=> {
    const Comment = models.Comment;
    const book = await models.Book.findById(bookId);
    if(!book){
        resolve({
            err: true,
            message: 'Book not found',
        })
    }
    const data = new Comment({
        userId,
        bookId: book.id,
        ...body,
    });

    if(data){
        await models.Book.findByIdAndUpdate(data.bookId,{$push: {commentList: data.id}});
    }

    resolve({
        err: !data ? true : false,
        message: data? 'Create comment successful' : 'Create comment failed',
        data: data? data: null,
    })

});

const updateComment = ({commentId,...body},userId) => new Promise(async (resolve, reject) => {
    // const book = await models.Book.findById(bookId);
    // if(!book){
    //     resolve({
    //         err: true,
    //         message: 'Book not found',
    //     })
    // }
    const checkComment = await models.Comment.find({id: commentId,userId: userId});
    if(!checkComment){
        resolve(
            {
                err: true,
                message: 'You do not have permission to delete this comment',
            }
        );
    } 
    const data =await models.Comment.findById(commentId, {...body});

    resolve({
        err: !data? true : false,
        message: data? 'Update comment successful' : 'Update comment failed',
        data: data? data: null,
    })
});

const softDeleteComment = ({commentId},userId) => new Promise(async (resolve, reject) => {
    const checkComment = await models.Comment.find({id: commentId,userId: userId});
    if(!checkComment){
        resolve(
            {
                err: true,
                message: 'You do not have permission to delete this comment',
            }
        );
    } 

    const data = await models.Comment.findByIdAndUpdate(commentId,{
        isDeleted: true
    });

    if(data){
        await models.Book.findByIdAndUpdate(data.bookId,{$pull: {commentList: commentId}});
    }

    resolve({
        err: !data? true : false,
        message: data? 'Delete comment successful' : 'Delete comment failed',
        data: data? data: null,
    })
});

const getCommentsByBookId = (bookId) => new Promise(async (resolve, reject) => {
    const book = await models.Book.findById(bookId);
    if(!book){
        resolve({
            err: true,
            message: 'Book not found',
        })
    }
    const data = await models.Comment.find({bookId: bookId});
    resolve({
        err: !data? true : false,
        data: data? data : null,
    });
});

const getCommentsByUserId = (userId) => new Promise((resolve, reject) => {
    const data = models.Comment.find({userId: userId});
    if(!data){
        resolve({
            err: true,
            message: 'You have no comments',
        })
    }
    resolve({
        err: !data? true : false,
        data: data? data : null,
    });
});

module.exports = {
    createComment,
    updateComment,
    softDeleteComment,
    getCommentsByBookId,
    getCommentsByUserId,
};