const models = require('../models');
const userRepositories = require('../models/repositories/user.repositories');
const util = require('../utils');

// get User
const getAllUsers = () => new Promise(async (resolve, reject) => {
    const data = await model.User.find({}).select('-password -role');
    resolve({
        data: data ? data : null,
    })
})

const getAUser = (userId) => new Promise(async (resolve, reject) => {
    const data = await userRepositories.findByIdUser(userId);
    resolve({
        err: data ? true : false,
        message: data? "Get user successfully" : "User not found",
        data: data? data : null,
    })
});

// update user
const updateUser = (userId,{...body}) => new Promise(async (resolve, reject) => {
    const user = await userRepositories.findByIdUser(userId);
    if(!user) {
        resolve({
            err: true,
            message: "User not found",
            data: null
        })
    }

    const data = await models.User.findByIdAndUpdate(user.id, {
        ...body,
    })
    resolve({
        err: data? true : false,
        message: data? "Update user successfully" : "Update user failed",
        data: data? data : null,
    })

});

const softDeleteUser = (userId) => new Promise(async (resolve, reject) => {
    const user = await userRepositories.findByIdUser(userId);
    if(!user) {
        resolve({
            err: true,
            message: "User not found",
            data: null
        })
    }

    const data = await models.User.findByIdAndUpdate(user.id, {
        isDeleted: true,
    })
    resolve({
        err: data? true : false,
        message: data? "Delete user successfully" : "Delete user failed",
        data: data? data : null,
    })
});

module.exports = {
    getAllUsers,
    getAUser,
    updateUser,
    softDeleteUser,
}