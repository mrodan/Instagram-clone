import express from 'express';
import * as apiController from '../controllers/ApiController.js';

const apiRouter = express.Router();

apiRouter.post('/upload/image', apiController.uploadImage);
apiRouter.get('/request/image', apiController.requestImage);

//authRouter.post('/login', passport.authenticate('local', {session: false}), authController.login);
//authRouter.get('/logout', passport.authenticate('jwt', {session: false}), authController.logout); // 'jwt' because you have to be logged in


export default apiRouter;