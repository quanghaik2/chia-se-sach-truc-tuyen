const util = require('../utils');
const models = require('../models');


const verifyToken = async (req, res, next) => {

    const token = req.cookies.token 
    console.log(token);
    if (!token) {
        return res.status(401).json({message: 'You must be logged in!'});
    }
    const data = util.verifyToken(token.token);
    const user = await models.User.findById(data._id);
    if(!user) {
        return res.status(401).json({message: 'This account has been deleted'});
    }
    console.log(data);
    req.user = data._id;
    next();
};

module.exports = verifyToken