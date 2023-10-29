const { rating } = require('../services');
const { getBookId } = require('./book.controller');

module.exports = {
   async getAllRating(req, res, next) {
      try {
         const ratings = await rating.getAllRating();

         res.status(200).json({
            message: 'Get list rating successfully',
            data: ratings,
         });
      } catch (error) {
         next(error);
      }
   },

   async getRatingList(req, res, next) {
      try {
         const { userId, bookId } = req.query;
         if (!userId && !bookId) {
            return res.status(200).json({ message: 'No ratings found' });
         }

         if (userId && userId !== null && userId !== '') {
            const ratings = await rating.getRatingByUserId(userId);
            return res.status(200).json({
               message: 'Get list rating by userId successfully',
               data: ratings,
            });
         }
         if (bookId && bookId !== null && bookId !== '') {
            const ratings = await rating.getRatingByBookId(bookId);
            return res.status(200).json({
               message: 'Get list rating by bookId successfully',
               data: ratings,
            });
         }
      } catch (error) {
         next(error);
      }
   },

   async createRating(req, res, next) {
      try {
         const { userId, bookId, rate } = req.body;

         if (!userId || !bookId) {
            return res.status(400).json({ message: 'Missing fields' });
         }

         const isCreated = await rating.createRating(userId, bookId, rate);
         if (isCreated.error)
            return res
               .status(400)
               .json({ message: isCreated.message, data: null });
         return res
            .status(201)
            .json({ message: 'Create successfully', data: isCreated });
      } catch (error) {
         next(error);
      }
   },

   async updateRating(req, res, next) {
      try {
         const { bookId, rate, id } = req.body;
         const userId = req?.user || req.body?.userId;

         if (id && id !== '' && id !== null) {
            const isUpdated = await rating.updateRatingById(id, rate);

            if (isUpdated) {
               return res
                  .status(200)
                  .json({ message: 'Update successfully', data: isUpdated });
            }

            return res.status(400).json({ message: 'Rating not found' });
         }
         if (!userId || !bookId) {
            return res.status(400).json({ message: 'Missing fields' });
         }

         const isUpdated = await rating.updateRating(userId, bookId, rate);

         if (isUpdated) {
            return res
               .status(200)
               .json({ message: 'Update successfully', data: isUpdated });
         }

         res.status(400).json({ message: 'Rating not found' });
      } catch (error) {
         next(error);
      }
   },

   async deleteRating(req, res, next) {
      try {
         const { userId, bookId, id } = req.body;

         if (id && id !== '' && id !== null) {
            const isDeleted = await rating.deleteRatingById(id);

            if (isDeleted) {
               return res
                  .status(200)
                  .json({ message: 'Delete successfully', data: isDeleted });
            }

            return res.status(400).json({ message: 'Rating not found' });
         }

         if (!userId || !bookId) {
            return res.status(400).json({ message: 'Missing fields' });
         }

         const isDeleted = await rating.deleteRating(bookId, userId);

         if (isDeleted) {
            return res
               .status(200)
               .json({ message: 'Delete successfully', data: isDeleted });
         }

         res.status(400).json({ message: 'Rating not found' });
      } catch (error) {
         next(error);
      }
   },
};
