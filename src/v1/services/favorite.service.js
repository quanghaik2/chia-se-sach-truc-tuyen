const models = require('../models');
const utils = require('../utils');

const favoriteBook = (bookId, userId) =>
   new Promise(async (resolve, reject) => {
      const Favorite = models.Favorite;
      const checkFavorite = await utils.checkFavorites(userId, bookId);
      if (checkFavorite) {
         await models.User.findByIdAndUpdate(userId, {
            $pull: { favoriteList: bookId },
         });
         await models.Favorite.deleteOne({userId: userId, bookId: bookId});
      } else {
         const data = new Favorite({
            bookId: bookId,
            userId: userId,
         });
         await data.save();
         if(data){
            await models.User.findByIdAndUpdate(userId,{
               $push: {favoriteList: bookId},
            })
         }
      }

      resolve({
         err: false,
         message: !checkFavorite
            ? 'add favorite successfully'
            : 'remove favorite successfully',
      });
   });

const unfavorite = (favoriteId) =>
   new Promise(async (resolve, reject) => {
      const data = await models.Favorite.findByIdAndDelete(favoriteId);
      if (data) {
         await models.User.findByIdAndUpdate(data.userId, {
            $pull: { favoriteList: data.bookId },
         });
      }
      resolve({
         err: !data ? true : false,
         message: data
            ? 'remove favorite successfully'
            : 'remove favorite failed',
      });
   });

const getFavoriteByUser = (userId) => new Promise(async (resolve, reject) => {
   const data = await models.Favorite.find({userId});
   resolve({
      err:!data? true : false,
      data: data? data : null,
   })
});

module.exports = {
   favoriteBook,
   unfavorite,
   getFavoriteByUser,
};
