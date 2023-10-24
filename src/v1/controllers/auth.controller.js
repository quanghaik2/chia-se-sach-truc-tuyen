const service = require('../services');

const register = async (req, res, next) => {
   try {
      const user = await service.auth.register(req.body);
      const { token, refreshToken, ...data } = user;
      res.cookie(
         'token',
         { token },
         {
            maxAge: 2 * 60 * 60000,
         }
      );
      res.cookie(
         'refreshToken',
         { refreshToken },
         {
            maxAge: 24 * 60 * 60000,
         }
      );
      if (user.err) {
         return res.status(401).json(user);
      }

      return res.status(200).json(user);
   } catch (error) {
      next(error);
   }
};

const login = async (req, res, next) => {
   try {
      const user = await service.auth.login(req.body);
      const { token, refreshToken, ...data } = user;
      res.cookie(
         'token',
         { token },
         {
            maxAge: 2 * 60 * 60000,
         }
      );
      res.cookie(
         'refreshToken',
         { refreshToken },
         {
            maxAge: 24 * 60 * 60000,
         }
      );
      if (user.err) {
         return res.status(401).json(user);
      }

      return res.status(200).json(user);
   } catch (error) {
      next(error);
   }
};

const refreshToken = async (req, res) => {
   try {
      const data = await service.auth.refreshToken(
         req.cookies.refreshToken.refreshToken
      );
      const { token, refreshToken, ...User } = data;
      res.cookie(
         'token',
         { token },
         {
            maxAge: 2 * 60 * 60000,
         }
      );
      res.cookie(
         'refreshToken',
         { refreshToken },
         {
            maxAge: 24 * 60 * 60000,
         }
      );
      if (data.err) {
         return res.status(401).json(data);
      }

      return res.status(200).json(data);
   } catch (error) {
      next(error);
   }
};

module.exports = {
   register,
   login,
   refreshToken,
};
