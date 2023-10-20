const service =   require("../services");

const getAllUsers =async (req,res,next) =>{
    try {
        const user = await service.user.getAllUsers();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers
}