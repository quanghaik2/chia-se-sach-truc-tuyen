const models = require('../models');
const userRepositories = require('../models/repositories/user.repositories');
const util = require('../utils');

// get User
const getAllUsers = () =>
   new Promise(async (resolve, reject) => {
      const data = await models.User.find({}).select('-password -createdAt -updatedAt -__v').where({ isDeleted: false });
      resolve({
         data: data ? data : null,
      });
   });

const getOneUser = (userId) =>
   new Promise(async (resolve, reject) => {
      const data = await userRepositories.findByIdUser(userId).select('-password -createdAt -updatedAt -__v').where({ isDeleted: false });
      resolve({
         err: data ? false : true,
         message: data ? 'Get user successfully' : 'User not found',
         data: data ? data : null,
      });
   });

const getUserByName = (name) =>
   new Promise(async (resolve, reject) => {
      const data = await models.User.find({ name }).select('-password -createdAt -updatedAt -__v').where({ isDeleted: false });
      resolve({
         err: data ? false : true,
         message: data ? 'Get user successfully' : 'User not found',
         data: data ? data : null,
      });
   });

   const getCurrent = (token) => new Promise(async (resolve, reject) => {
      // const data = await models.User.findById(userId).select('-password ').where({ isDeleted: false });
      const data = util.verifyToken(token.token);

      // const dataObject = data.toObject();
      delete data.iat;
      delete data.exp;
      delete data.commentedList;
      delete data.favoriteList;
      delete data.reportedList;
      delete data.followerList;
      delete data.followedList;
      delete data.bookList;
      resolve({
         err: data? false : true,
         message: data? 'Get user successfully' : 'User not found',
         data: data? data : null,
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



const followUserById = (userId, userToFollowId) => new Promise(async (resolve, reject) => {
   if(userId === userToFollowId){
      resolve({
         err: true,
         message: 'Thật hả bro mày tự follow chính mình ư',
         
      })
   }
   const user = await userRepositories.findByIdUser(userToFollowId);
   if(!user) {
      resolve({
         err: true,
         message: 'User want follow not found',
      });
   }

   const checkFollow = await models.User.findOne({_id: userId, followedList: {$in: userToFollowId}});
   if(checkFollow) {
      const result = await models.User.findByIdAndUpdate(userId,{$pull: {followedList: userToFollowId}}, {new: true} );
      if(result){
         await models.User.findByIdAndUpdate(userToFollowId,{$pull: {followerList: userId}}, {new: true});
      }
      resolve({
         err: result? false : true,
         message: result? 'unFollow user successfully' : 'unFollow user failed',
      });
   }else{
      const data = await models.User.findByIdAndUpdate(userId,{$push: {followedList: userToFollowId}} );
      if(data){
         await models.User.findByIdAndUpdate(userToFollowId,{$push: {followerList: userId}});
      }
      resolve({
         err: data? false : true,
         message: data? 'Follow user successfully' : 'Follow user failed',
      });
   }  

});

const unFollowUserById = (userId, userToFollowId) => new Promise(async (resolve, reject) => {
   const user = await userRepositories.findByIdUser(userToFollowId);
   if(!user) {
      resolve({
         err: true,
         message: 'User want follow not found',
         data: null,
      });
   }

   const data = await models.User.findByIdAndUpdate(userId,{$pull: {followedList: userToFollowId}} );
   if(data){
      await models.User.findByIdAndUpdate(userToFollowId,{$pull: {followerList: userId}});
   }

   resolve({
      err: data? false : true,
      message: data? 'unFollow user successfully' : 'unFollow user failed',
   });
});


module.exports = {
   getAllUsers,
   getOneUser,
   getUserByName,
   updateUser,
   softDeleteUser,
   getCurrent,
   followUserById,
   unFollowUserById,
};
