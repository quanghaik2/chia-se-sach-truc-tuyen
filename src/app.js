const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// init middlewares
app.use(morgan('dev')); // morgan('combined') full thong tin
// app.use(helmet()); // bao ve thong tin rieng tu, ngan chan web thu 3 truy cap doc thong tin, cookie
app.use(compression()); // giam dung luong van chuyen du lieu web
let whiteList = [
   'http://localhost:3000',
   `${process.env.URL_FRONTEND}`,
   'https://chia-se-sach.vercel.app',
   `https://chia-se-sach.vercel.app/api/comment`
];
app.use(
   cors({
      origin: '*',
      credentials: true,
   })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
   res.status(200).json('ok');
});
// init db
require('./v1/configs/init.mongodb');

// init routes
require('./v1/routers/index')(app);

// handling error
app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.statusCode = 404;
   next(error);
});
app.use((error, req, res, next) => {
   const status = error.statusCode || 500;
   return res.status(status).json({
      status: 'error',
      code: status,
      message: error.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : '',
   });
});

module.exports = app;
