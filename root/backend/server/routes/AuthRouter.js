import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/AuthController.js';
//import * as todoController from '../Controllers/TodoController.js';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', passport.authenticate('local', {session: false}), authController.login);
authRouter.get('/logout', passport.authenticate('jwt', {session: false}), authController.logout); // 'jwt' because you have to be logged in


export default authRouter;