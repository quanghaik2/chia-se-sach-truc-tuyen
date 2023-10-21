const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Reports';
const DOCUMENT_NAME = 'Report';

const reportSchema = new Schema(
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
      title: {
         type: String,
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
      image: {
         type: String,
      },
      status: {
         type: String,
         enum: ['pending', 'approved', 'rejected'],
         default: 'pending',
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

const Report = model(DOCUMENT_NAME, reportSchema);
module.exports = Report;
