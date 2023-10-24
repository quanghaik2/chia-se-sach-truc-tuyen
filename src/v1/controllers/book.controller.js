const service = require('../services');

const createBook = async (req, res, next) => {
    try {
        const book = await service.book.createBook(req.body,req.user);
        if(book.err) {
            return res.status(401).json(book);
        }
        return res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const book = await service.book.updateBook(req.body);
        if(book.err){
            return res.status(404).json(book);
        }
        return res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

const softDeleteBook = async (req, res, next) => {
    try {
        const book = await service.book.softDeleteBook(req.body.bookId,req.user);
        if(book.err) {
            return res.status(401).json(book);
        }
        return res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

const getAllBooks = async (req, res,next) => {
    try {
        const books = await service.book.getAllBooks();
        if(books.err) {
            return res.status(401).json(books);
        }
        return res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

const getOneBook = async (req, res, next) => {
    try {
        const book = await service.book.getOneBook(req.params.slug);
        if(book.err) {
            return res.status(401).json(book);
        }
        return res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

const getBookId = async (req, res, next) => {
    try {
        const book = await service.book.getBookId(req.params.id);
        if(book.err) {
            return res.status(401).json(book);
        }
        return res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createBook,
    updateBook,
    softDeleteBook,
    getAllBooks,
    getOneBook,
    getBookId,
}