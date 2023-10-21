const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4 : uuidv4 } = require('uuid');
const models = require('../models');
require('dotenv').config();

const hashPassword = (password) =>{
    return bcryptjs.hashSync(password,bcryptjs.genSaltSync(10));
}

const checkPassword = (password,input) =>{ 
    return bcryptjs.compareSync(password,input);
}

const token = ({...data}, time) =>{
    return jwt.sign(data,process.env.SECRET_KEY,{
        expiresIn: time
    })
}

const verifyToken = (token) => {
    return jwt.verify(token,process.env.SECRET_KEY);
}

const createSlug = (title) => {
    // Tạo UUID phiên bản 4 và chỉ lấy 4 ký tự cuối cùng
    const randomSlug = uuidv4().slice(-4);
    // Tạo slug từ tiêu đề và thêm UUID ngẫu nhiên
    const normalizedTitle = title.toLowerCase().split(' ').join('-');
    const slug = `${normalizedTitle}-${randomSlug}`;
    return slug;
}

const checkFavorites = async (userId,bookId) => {
    const user = await models.User.findById(userId);
    return user.favoriteList.includes(bookId);
}

module.exports = {
    hashPassword,
    checkPassword,
    token,
    verifyToken,
    createSlug,
    checkFavorites,
}