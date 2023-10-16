const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Comments';
const DOCUMENT_NAME = 'Comment';

const commentSchema = new Schema(
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
      content: {
         type: String,
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

const Comment = model(DOCUMENT_NAME, commentSchema);

module.exports = Comment;
