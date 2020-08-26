import express from 'express';
import passport from 'passport';
import * as userController from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/get/:_id', passport.authenticate('jwt',{session : false}), userController.getUser);
userRouter.post('/search-user', userController.searchUser);
userRouter.post('/follow', passport.authenticate('jwt',{session : false}), userController.followUser);
userRouter.post('/unfollow', passport.authenticate('jwt',{session : false}), userController.unfollowUser);
userRouter.get('/checkfollowing/:_id', passport.authenticate('jwt',{session : false}), userController.checkFollowing);




export default userRouter;