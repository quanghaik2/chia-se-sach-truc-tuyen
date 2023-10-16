const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Books';
const DOCUMENT_NAME = 'Book';

const bookSchema = new Schema(
   {
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
      slug: {
         type: String,
         required: true,
      },
      image: {
         type: String,
      },
      commentList: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
         },
      ],
      isDeleted: {
         type: Boolean,
         default: false,
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

export const Book = model(DOCUMENT_NAME, bookSchema);

// module.exports = Book;