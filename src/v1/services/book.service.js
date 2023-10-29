const models = require('../models');
const util = require('../utils');
const bookRepostiories = require('../models/repositories/book.repostiories');

const createBook = ({ title, ...body }, userId) =>
   new Promise(async (resolve, reject) => {
      const Book = models.Book;
      console.log(util.createSlug(title));
      const data = new Book({
         userId: userId,
         slug: util.createSlug(title),
         title: title,
         ...body,
      });
      await data.save();

      if (data) {
         await models.User.findByIdAndUpdate(userId, {
            $push: { bookList: data.id },
         });
      }

      resolve({
         err: !data ? true : false,
         message: data ? 'Book created successful' : 'Book creation failed',
         data: data ? data : null,
      });
   });

// update the book

const updateBook = ({ bookId, ...body }) =>
   new Promise(async (resolve, reject) => {
      if (body.hasOwnProperty('title')) {
         body.slug = util.createSlug(body.title);
      }

      const Book = models.Book;
      const data = await Book.findByIdAndUpdate(bookId, body, { new: true });

      resolve({
         err: !data ? true : false,
         message: data ? 'Book updated successful' : 'Book update failed',
         data: data ? data : null,
      });
   });

const softDeleteBook = (id, userId) =>
   new Promise(async (resolve, reject) => {
      console.log(id)
      const data = await models.Book.findByIdAndUpdate(id, {
         isDeleted: true,
      });
      if (data) {
         await models.User.findByIdAndUpdate(userId, {
            $pull: { bookList: id },
         });
         // await models.Comment.deleteMany({bookId: id})
      }
      resolve({
         err: !data ? true : false,
         message: data ? 'Book deleted successful' : 'Book deletion failed',
         data: data ? data : null,
      });
   });

// get the book

const getOneBook = (slug) =>
   new Promise(async (resolve, reject) => {
      const data = await bookRepostiories.findOneBook(slug);
      resolve({
         err: !data ? true : false,
         message: data ? 'Book found' : 'Book not found',
         data: data ? data : null,
      });
   });

const getBookId = (id) =>
   new Promise(async (resolve, reject) => {
      const data = await bookRepostiories.findByIdBook(id);
      resolve({
         err: !data ? true : false,
         message: data ? 'Book found' : 'Book not found',
         data: data ? data : null,
      });
   });

const getAllBooks = () =>
   new Promise(async (resolve, reject) => {
      const data = await models.Book.find({}).where({ isDeleted: false, status: 'approved'}).select('-createdAt -updatedAt -isDeleted -__v');
      resolve({
         err: !data ? true : false,
         data: data ? data : null,
      });
   });

const DeleteBook = (id, userId) =>
   new Promise(async (resolve, reject) => {
      const checkUser = await models.Book.findOne({userId});
      if(!checkUser){
         resolve({
            err: true,
            message: 'You do not have permission to delete',
            data: null,
         });
      }
      const data = await models.Book.findByIdAndDelete(id);
      if (data) {
         await models.User.findByIdAndUpdate(userId, {
            $pull: { bookList: id },
         });
         await models.Comment.deleteMany({bookId: id})
      }
      resolve({
         err: !data ? true : false,
         message: data ? 'Book deleted successful' : 'Book deletion failed',
         data: data ? data : null,
      });
   });

const getPendingBooks = () => new Promise(async (resolve, reject) => {
   const data = await models.Book.find({status: 'pending'}).select('-createdAt -updatedAt -isDeleted -__v').where({ isDeleted: false });
   resolve({
      err: !data? true : false,
      message: data ? "Successfully retrieved the list of pending books." : "Empty book list",
      data: data? data : null,
   });
})

const getBookByUser = (nameUser) => new Promise(async (resolve, reject) => {
   const User = await models.User.findOne({name: nameUser});
   if(!User) {
      resolve({
         err: true,
         message: 'User not found',
         data: null,
      });
   }
   const data = await models.Book.find({userId: User.id});
   resolve({
      err:!data? true : false,
      message: data? "Successfully retrieved the user's book list" : "Empty book list",
      data: data? data : null,
   });
})

const getBookByName = (name) => new Promise(async (resolve, reject) => {
   const data = await models.Book.find({title: name});
   resolve({
      err:!data? true : false,
      message: data? "Successfully retrieved book list by book title" : "Empty book list",
      data: data? data : null,
   });
})

const searchBook = ({...query}) => new Promise(async (resolve, reject) =>{
   const checkNameUser = query.hasOwnProperty('nameUser');
   let idUser;
   if(checkNameUser){
      const User = await models.User.findOne({name: query.nameUser});
      if(!User) {
         resolve({
            err: true,
            message: 'User not found',
            data: null,
         });
      }
      idUser  = User.id; 
   }

   query.userId  = idUser;
   delete query.nameUser;
   
   console.log(query);
   
   const data = await models.Book.find({
      $or: [
      {
         'userId': query.userId,
         
      }, {
         'title': query.title,
      }
      ]});
   resolve({
      err:!data? true : false,
      message: data.length > 0? "Successfully retrieved book list by book title" : "Empty book list",
      data: data? data : null,
   });
})

const approvedBook = (booId) => new Promise(async (resolve, reject) => {
   const data = await models.Book.findByIdAndUpdate(booId, {
      status: 'approved',
   }, {new: true});
   resolve({
      err:!data? true : false,
      message: data? "Successfully approved the book." : "Failed to approve the book",
      data: data? data : null,
   });
})



module.exports = {
   createBook,
   updateBook,
   softDeleteBook,
   getOneBook,
   getBookId,
   getAllBooks,
   DeleteBook,
   getPendingBooks,
   getBookByUser,
   getBookByName,
   searchBook,
   approvedBook,
};
