const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Users';
const DOCUMENT_NAME = 'User';

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      username: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      avatar: {
         type: String,
         default:
            'https://i.pinimg.com/236x/12/37/b3/1237b30268db9ee0c9cbe3a79b1ff8fa.jpg',
      },
      favoriteList: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Book',
         },
      ],
      commentedList: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
         },
      ],
      reportedList: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Report',
         },
      ],
      followerList: [
         {
            type: Schema.Types.ObjectId,
            ref: 'User',
         },
      ],
      followedList: [
         {
            type: Schema.Types.ObjectId,
            ref: 'User',
         },
      ],
      bookList: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Book',
         },
      ],
      role: {
         type: String,
         default: 'user',
         enum: ['user', 'admin'],
      },
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

const User = model(DOCUMENT_NAME, userSchema);

module.exports = User;

// login, signup
