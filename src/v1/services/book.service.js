const models = require('../models');

const createBook = ({...body}) => new Promise(async (resolve, reject) => {
    const Book = models.Book;
    const data = new Book(body);
    await data.save();

    resolve({
        err: data? true : false,
        message: data? "Book created successful" : "Book creation failed",
        data: data? data : null,
    })
});

module.exports = {
    createBook,
};