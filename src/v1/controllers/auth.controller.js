const service =   require("../services");

const register =async (req,res,next) =>{
    try {
        const user = await service.auth.register(req.body);
        const {token,refreshToken,...data} = user;
        res.cookie("token", {token},{ maxAge: 2*60*60000 });
        res.cookie("refreshToken", {refreshToken},{ maxAge: 24*60*60000 });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const login =async (req,res,next) =>{
    try {
        const user = await service.auth.login(req.body);
        const {token,refreshToken,...data} = user;
        res.cookie("token", {token},{ maxAge: 2*60*60000 });
        res.cookie("refreshToken", {refreshToken},{ maxAge: 24*60*60000 });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const refreshToken = async (req, res) => {
    try {
        const user = await service.auth.refreshToken(req.body.refreshToken);
        const {token,refreshToken,...data} = user;
        res.cookie("token", {token},{ maxAge: 2*60*60000 });
        res.cookie("refreshToken", {refreshToken},{ maxAge: 24*60*60000 });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
module.exports ={
    register,
    login,
    refreshToken,
}

