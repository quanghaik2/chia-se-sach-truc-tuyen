const bcryptjs = require('bcryptjs');

const hashPassword = (password) =>{
    return bcryptjs.hashSync(password,bcryptjs.genSaltSync(10));
}

const checkPassword = (password,input) =>{ 
    return bcryptjs.compareSync(password,input);
}

module.exports = {
    hashPassword,
    checkPassword
}