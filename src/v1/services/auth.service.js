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

    const token = util.token(data,'2h');
    const refreshToken = util.token({username: data.username},'1d');

    resolve({
        err: !data ? true : false,
        message: data ? "Registered successful" : "Registration failed",
        data: data ? data : null,
        token: token ? token : null,
        refreshToken: refreshToken? refreshToken : null,
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

    const dataObject = data.toObject();
    delete dataObject.password;
    delete dataObject.role;

    const token = util.token(dataObject, '2h');
    const refreshToken = util.token({username: data.username}, '1d');

    resolve({
        err: !data ? true : false,
        message: data ? "Login successful" : "Login failed",
        data: data ? dataObject : null,
        token: token? token : null,
        refreshToken: refreshToken? refreshToken : null,
    })
});

const refreshToken = (refresh) => new Promise(async (resolve, reject) => {
    console.log(refresh);
    const username = util.verifyToken(refresh);
    const data = await userRepositories.findOneUser(username.username);
    if(!data) {
        resolve({
            err: true,
            message: "Refresh token wrong",
            data: null
        });
    }
    const dataObject = data.toObject();
    delete dataObject.password;
    delete dataObject.role;

    const token = util.token(dataObject,'1d');
    const newRefreshToken = util.token({username: data.username},'1d');
    resolve({
        err: !data? true : false,
        message: data? "Refresh token successful" : "Refresh token failed",
        data: data? dataObject : null,
        token: token? token : null,
        refreshToken: newRefreshToken? newRefreshToken : null,
    })
})


module.exports = {
    register,
    login,
    refreshToken,
}