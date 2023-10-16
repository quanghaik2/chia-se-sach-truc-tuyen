const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Favorites';
const DOCUMENT_NAME = 'Favorite';

const favoriteSchema = new Schema(
   {
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      bookId: {
         type: Schema.Types.ObjectId,
         ref: 'Book',
         required: true,
      },
      createdAt: {
         type: Date,
         default: Date.now,
      },
   },
   {
      collection: COLLECTION_NAME,
      timestamps: true,
   }
);

const Favorite = model(DOCUMENT_NAME, favoriteSchema);

module.exports = Favorite;
