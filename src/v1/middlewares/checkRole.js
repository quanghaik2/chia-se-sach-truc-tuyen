const util = require('../utils');
const models = require('../models');


const verifyToken = async (req, res, next) => {
    const token = req.cookies.token 
    if (!token) {
        return res.status(401).json({message: 'You must be logged in!'});
    }
    const data = util.verifyToken(token.token);
    const user = await models.User.findOne({_id: data._id});
    console.log(user);
    if(!user) {
        return res.status(401).json({message: 'This account has been deleted'});
    }
    // console.log(user);
    if(data.role !== "admin")
    {
        return res.status(401).json({message: 'You are not admin'});
    }
    req.user = data._id;
    next();
};

module.exports = verifyToken