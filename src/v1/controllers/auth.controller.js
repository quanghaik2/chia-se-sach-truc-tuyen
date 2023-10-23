const service = require('../services');

<<<<<<< HEAD
const register =async (req,res,next) =>{
    try {
        const user = await service.auth.register(req.body);
        const {token,refreshToken,...data} = user;
        res.cookie("token", {token},{ maxAge: 2*60*60000 });
        res.cookie("refreshToken", {refreshToken},{ maxAge: 24*60*60000 });
        return res.status(200).json(data);
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
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
=======
const register = async (req, res, next) => {
   try {
      const user = await service.auth.register(req.body);
      const { token, refreshToken, ...data } = user;
      res.cookie('token', { token }, { maxAge: 2 * 60 * 60000 });
      res.cookie(
         'refreshToken',
         { refreshToken },
         {
            maxAge: 24 * 60 * 60000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
         }
      );
      res.status(200).json(data);
   } catch (error) {
      next(error);
   }
};

const login = async (req, res, next) => {
   try {
      const user = await service.auth.login(req.body);
      const { token, refreshToken, ...data } = user;
      res.cookie('token', { token }, { maxAge: 2 * 60 * 60000 });
      res.cookie(
         'refreshToken',
         { refreshToken },
         {
            sameSite: 'none',
            maxAge: 24 * 60 * 60000,
            httpOnly: true,
            secure: true,
         }
      );
      res.status(200).json(data);
   } catch (error) {
      next(error);
   }
};
>>>>>>> 60f24bb1c98915bb4a16a51c50f9c5412d79f10b

const refreshToken = async (req, res) => {
   try {
      const data = await service.auth.refreshToken(
         req.cookies.refreshToken.refreshToken
      );
      const { token, refreshToken, ...User } = data;
      res.cookie('token', { token }, { maxAge: 2 * 60 * 60000 });
      res.cookie(
         'refreshToken',
         { refreshToken },
         {
            maxAge: 24 * 60 * 60000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
         }
      );
      res.status(200).json(data);
   } catch (error) {
      next(error);
   }
};
module.exports = {
   register,
   login,
   refreshToken,
};
