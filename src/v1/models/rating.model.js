const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Ratings';
const DOCUMENT_NAME = 'Rating';

const ratingSchema = new Schema(
   {
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      rate: {
         type: Number,
         default: 5,
      },
      bookId: {
         type: Schema.Types.ObjectId,
         ref: 'Book',
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

const Rating = model(DOCUMENT_NAME, ratingSchema);

module.exports = Book;
