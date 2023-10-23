const models = require('../models');
const userRepositories = require('../models/repositories/user.repositories');
const util = require('../utils');

// get User
const getAllUsers = () =>
   new Promise(async (resolve, reject) => {
      const data = await models.User.find({}).select('-password -role');
      resolve({
         data: data ? data : null,
      });
   });

const getOneUser = (userId) =>
   new Promise(async (resolve, reject) => {
      const data = await userRepositories.findByIdUser(userId).select('-password -role');
      resolve({
         err: data ? false : true,
         message: data ? 'Get user successfully' : 'User not found',
         data: data ? data : null,
      });
   });

const getUserByName = (name) =>
   new Promise(async (resolve, reject) => {
      const data = await models.User.find({ name }).select('-password -role');
      resolve({
         err: data ? false : true,
         message: data ? 'Get user successfully' : 'User not found',
         data: data ? data : null,
      });
   });

// update user
const updateUser = (userId, { ...body }) =>
   new Promise(async (resolve, reject) => {
      const user = await userRepositories.findByIdUser(userId);
      if (!user) {
         resolve({
            err: true,
            message: 'User not found',
            data: null,
         });
      }

      const data = await models.User.findByIdAndUpdate(
         user.id,
         {
            ...body,
         },
         {
            new: true,
         }
      );
      resolve({
         err: data ? false : true,
         message: data ? 'Update user successfully' : 'Update user failed',
         data: data ? data : null,
      });
   });

const softDeleteUser = (userId) =>
   new Promise(async (resolve, reject) => {
      const user = await userRepositories.findByIdUser(userId);
      if (!user) {
         resolve({
            err: true,
            message: 'User not found',
            data: null,
         });
      }

      const data = await models.User.findByIdAndUpdate(user.id, {
         isDeleted: true,
      });
      resolve({
         err: data ? false : true,
         message: data ? 'Delete user successfully' : 'Delete user failed',
         data: data ? data : null,
      });
   });

const getCurrent = (userId) => new Promise(async (resolve, reject) => {
   const data = await models.User.findById(userId);
   resolve({
      err: data? false : true,
      message: data? 'Get user successfully' : 'User not found',
      data: data? data : null,
   });
});

module.exports = {
   getAllUsers,
   getOneUser,
   getUserByName,
   updateUser,
   softDeleteUser,
   getCurrent,
};
