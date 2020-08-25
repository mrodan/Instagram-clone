import express from 'express';
import passport from 'passport';
import * as userController from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/get/:_id', passport.authenticate('jwt',{session : false}), userController.getUser);
userRouter.post('/search-user', userController.searchUser);



export default userRouter;