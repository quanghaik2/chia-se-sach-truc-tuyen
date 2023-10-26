const { Rating, Book } = require('../models');

const updateAverageRatingBook = async () => {
   const allRatingPost = await Rating.find({ bookId });
   let totalRating = 0;
   allRatingPost.forEach((ratePost) => {
      totalRating += ratePost.rate;
   });
   let averageRating = totalRating / allRating.length;

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
      const isCreated = await Rating.create({
         userId,
         bookId,
         rate,
      });

      if (isCreated) {
         await updateAverageRatingBook();

         return isCreated;
      }

      return null;
   },

   async getRatingByBookId(bookId) {
      return Rating.find({ bookId })
         .populate({
            path: 'book',
         })
         .populate({
            path: 'user',
         });
   },

   async getRatingByUserId(userId) {
      return Rating.find({ userId })
         .populate({
            path: 'book',
         })
         .populate({
            path: 'user',
         });
   },

   async updateRating(userId, bookId, newRate) {
      const isUpdated = await Rating.findOneAndUpdate(
         { userId, bookId },
         { $set: { newRate } },
         { new: true }
      )
         .populate({
            path: 'book',
         })
         .populate({
            path: 'user',
         });

      if (isUpdated) {
         await updateAverageRatingBook();

         return isUpdated;
      }

      return null;
   },

   async deleteRating(bookId, userId) {
      const isDeleted = await Rating.findOneAndDelete({ bookId, userId });

      if (isDeleted) {
         updateAverageRatingBook();
         return isDeleted;
      }
      return null;
   },

   async deleteRatingById(id) {
      const isDeleted = await Rating.findByIdAndDelete(id);

      if (isDeleted) {
         updateAverageRatingBook();
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
         await updateAverageRatingBook();
         return isUpdated;
      }

      return null;
   },
};
