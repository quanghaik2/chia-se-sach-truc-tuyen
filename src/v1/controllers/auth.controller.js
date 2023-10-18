const service =   require("../services");

const register =async (req,res,next) =>{
    try {
        const user = await service.auth.register(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const login =async (req,res,next) =>{
    try {
        const user = await service.auth.login(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


module.exports ={
    register,
    login,
}

