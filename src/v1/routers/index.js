const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const bookRouter = require('./book.router');
const commentRouter = require('./comment.router');
const favorite = require('./favorite.router');
const reportRouter = require('./report.router');
const ratingRouter = require('./rating.router');

const routes = (app) => {
   app.use('/api/rating', ratingRouter);
   app.use('/api/auth', authRouter);
   app.use('/api/user', userRouter);
   app.use('/api/book', bookRouter);
   app.use('/api/comment', commentRouter);
   app.use('/api/favorite', favorite);
   app.use('/api/report', reportRouter);
};

module.exports = routes;
