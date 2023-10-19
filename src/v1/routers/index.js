const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const bookRouter = require('./book.router');

const routes = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/book', bookRouter);
};

module.exports = routes;