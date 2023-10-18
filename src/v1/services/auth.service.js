const model = require('../models');
const userRepositories = require('../models/repositories/user.repositories');
const util = require('../utils');

const register = ({username,password,...body}) => new Promise(async(resolve, reject) => {
    const User = model.User;
    console.log({
        username,
        password
    })
    const user = await userRepositories.findOneUser(username);
    if(user) {
        resolve({
            err: true,
            message: "User already exists",
            data: null
        })
    }
    const hashPassword = util.hashPassword(password);
    const data = new User({
        username,
        password: hashPassword,
        ...body
    })

    await data.save();

    resolve({
        err: data ? true : false,
        message: data ? "Registered successful" : "Registration failed",
        data: data ? data : null,
    })
});

const login = ({username,password,...body}) => new Promise(async(resolve, reject) => {

    const data = await userRepositories.findOneUser(username);
    if(!data) {
        resolve({
            err: true,
            message: "Username wrong! Please try again",
            data: null
        })
    }

    const check =  util.checkPassword(password,data.password);
    if(!check) {
        resolve({
            err: true,
            message: "Password wrong! Please try again",
            data: null
        })
    }

    resolve({
        err: data ? true : false,
        message: data ? "Login successful" : "Login failed",
        data: data ? data : null,
    })
});


module.exports = {
    register,
    login,
}