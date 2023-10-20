const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const bookRouter = require('./book.router');
const commentRouter = require('./comment.router');
const favorite = require('./favorite.router');

const routes = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/book', bookRouter);
    app.use('/api/comments', commentRouter);
    app.use('/api/favorite', favorite);
};

module.exports = routes;