import express from 'express';
import passport from 'passport';
import * as postController from '../controllers/PostController.js';

const postRouter = express.Router();

postRouter.post('/newpost', passport.authenticate('jwt', { session: false }), postController.newPost);
postRouter.get('/allposts', passport.authenticate('jwt', { session: false }), postController.allPosts);
postRouter.get('/userPosts/:_id', passport.authenticate('jwt', { session: false }), postController.userPosts); // Get client user (actual user)

postRouter.post('/like', passport.authenticate('jwt', { session: false }), postController.likePost);
postRouter.post('/unlike', passport.authenticate('jwt', { session: false }), postController.unlikePost);
postRouter.get('/checklike/:_id', passport.authenticate('jwt', { session: false }), postController.checkLike);



export default postRouter;