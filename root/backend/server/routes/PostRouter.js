import express from 'express';
import passport from 'passport';
import * as postController from '../controllers/PostController.js';

const postRouter = express.Router();

postRouter.post('/createpost', passport.authenticate('jwt', { session: false }), postController.createPost);
postRouter.get('/allposts', passport.authenticate('jwt', { session: false }), postController.allPosts);
postRouter.get('/userPosts', passport.authenticate('jwt', { session: false }), postController.userPosts);




export default postRouter;