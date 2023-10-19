const Book = require("../book.model");

const findOneBook = (slug) => {
    return Book.findOne({slug});
}

const findByIdBook = (bookId) => {
    return Book.findById(bookId);
}

module.exports =  
{
    findOneBook,
    findByIdBook,
};