const models = require('../models');
const util = require('../utils');
const bookRepostiories = require('../models/repositories/book.repostiories');

const createBook = ({title,...body},userId) => new Promise(async (resolve, reject) => {
    const Book = models.Book;
    console.log(util.createSlug(title));
    const data = new Book({
        userId: userId,
        slug: util.createSlug(title),
        title: title,
        ...body
    });
    await data.save();

    if(data){
        await models.User.findByIdAndUpdate(userId, {$push: {bookList: data.id}});
    }

    resolve({
        err: data? true : false,
        message: data? "Book created successful" : "Book creation failed",
        data: data? data : null,
    })
});

// update the book

const updateBook = ({bookId,...body}) => new Promise(async (resolve, reject) => {
    const Book = models.Book;
    const data = await Book.findByIdAndUpdate(bookId, body, {new: true});


    resolve({
        err: data? true : false,
        message: data? "Book updated successful" : "Book update failed",
        data: data? data : null,
    })
});

const softDeleteBook = ({id,...body}, userId) => new Promise(async (resolve, reject) =>{
    const data = await models.Book.findByIdAndUpdate(id,{
        isDeleted: true
    });
    if(data){
        await models.User.findByIdAndUpdate(userId, {$pull: {bookList: id}});
    }
    resolve({
        err: data? true : false,
        message: data? "Book deleted successful" : "Book deletion failed",
        data: data? data : null,
    })
});

// get the book

const getOneBook = (slug) => new Promise(async (resolve, reject) => {
    const data = await bookRepostiories.findOneBook(slug);
    resolve({
        err: data? true : false,
        message: data? "Book found" : "Book not found",
        data: data? data : null,
    })
});

const getBookId = (id) => new Promise(async(resolve, reject) => {
    const data = await bookRepostiories.findByIdBook(id);
    resolve({
        err: data? true : false,
        message: data? "Book found" : "Book not found",
        data: data? data : null,
    })
});

const getAllBooks = ()=> new Promise(async (resolve, reject) => {
    const data = await models.Book.find();
    resolve({
        err: data? true : false,
        data: data? data : null,
    });
});

module.exports = {
    createBook,
    updateBook,
    softDeleteBook,
    getOneBook,
    getBookId,
    getAllBooks,
};