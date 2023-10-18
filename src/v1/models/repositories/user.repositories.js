const User = require("../user.model");

const findOneUser = (username) => {
    return User.findOne({username});
}

const findByIdUser = (userId) => {
    return User.findById(userId);
}

module.exports =  
{
    findOneUser,
    findByIdUser,
};