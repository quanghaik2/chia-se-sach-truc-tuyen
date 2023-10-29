const { Rating, Book } = require('../models');

const updateAverageRatingBook = async (bookId) => {
   const allRatingPost = await Rating.find({ book: bookId });
   let totalRating = 0;
   allRatingPost.forEach((ratePost) => {
      totalRating += ratePost.rate;
   });
   let averageRating = totalRating / allRatingPost.length;

   await Book.findByIdAndUpdate(bookId, {
      $set: { ratingAverage: averageRating },
   });
};

module.exports = {
   async getAllRating() {
      return Rating.find({})
         .populate({
            path: 'book',
         })
         .populate({
            path: 'user',
         });
   },

   async createRating(userId, bookId, rate) {
      const isExist = await Rating.findOne({ user: userId, book: bookId });
      if (isExist) {
         return {
            error: true,
            message: 'Rating already exist',
         };
      }

      const isCreated = await Rating.create({
         user: userId,
         book: bookId,
         rate,
      });

      if (isCreated) {
         await updateAverageRatingBook(bookId);

         return isCreated;
      }

      return null;
   },

   async getRatingByBookId(bookId) {
      return Rating.find({ book: bookId })
         .populate({
            path: 'book',
            select: 'title _id ratingAverage',
         })
         .populate({
            path: 'user',
            select: 'name _id username',
         });
   },

   async getRatingByUserId(userId) {
      return Rating.find({ user: userId })
         .populate({
            path: 'book',
            select: 'title _id ratingAverage',
         })
         .populate({
            path: 'user',
            select: 'name _id username',
         });
   },

   async updateRating(userId, bookId, newRate) {
      const isUpdated = await Rating.findOneAndUpdate(
         { user: userId, book: bookId },
         { $set: { rate: newRate } },
         { new: true }
      ).populate({
         path: 'user',
      });

      if (isUpdated) {
         await updateAverageRatingBook(bookId);

         return isUpdated;
      }

      return null;
   },

   async deleteRating(bookId, userId) {
      const isDeleted = await Rating.findOneAndDelete({
         book: bookId,
         user: userId,
      });

      if (isDeleted) {
         const isExist = await Rating.find({ book: isDeleted.book });
         if (isExist.length > 0) updateAverageRatingBook(isDeleted.book);
         await Book.findByIdAndUpdate(isDeleted.book, {
            $set: { ratingAverage: 5 },
         });
         return isDeleted;
      }
      return null;
   },

   async deleteRatingById(id) {
      const isDeleted = await Rating.findByIdAndDelete(id);

      if (isDeleted) {
         const isExist = await Rating.find({ book: isDeleted.book });
         if (isExist.length > 0) updateAverageRatingBook(isDeleted.book);
         await Book.findByIdAndUpdate(isDeleted.book, {
            $set: { ratingAverage: 5 },
         });
         return isDeleted;
      }
      return null;
   },

   async updateRatingById(id, rate) {
      const isUpdated = await Rating.findByIdAndUpdate(
         id,
         { $set: { rate } },
         { new: true }
      );
      if (isUpdated) {
         await updateAverageRatingBook(isUpdated.book);
         return isUpdated;
      }

      return null;
   },
};
