const service =   require("../services");

const getAllUsers =async (req,res,next) =>{
    try {
        const user = await service.user.getAllUsers();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const getOneUser = async (req, res, next) =>{
    try {
        const user = await service.user.getOneUser(req.params.userId);
        if(!user.err){
            return res.status(404).json(user);
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const getUserByName = async (req, res, next) => {
    try {
        const user = await service.user.getUserByName(req.params.name);
        if(!user.err){
            return res.status(404).json(user);
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


const updateUser = async (req, res, next) => {
    try{
        const user = await service.user.updateUser(req.body);
        if(!user.err){
            return res.status(404).json(user);
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const softDeleteUser = async (req, res, next) => {
    try{
        const user = await service.user.softDeleteUser(req.body.userId);
        if(!user.err){
            return res.status(404).json(user);
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    getUserByName,
    updateUser,
    softDeleteUser,
}