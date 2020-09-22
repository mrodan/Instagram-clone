import mongoose from 'mongoose';
import cloudinary from '../utils/cloudinary.js';
import User from '../models/UserModel.js';
import Post from '../models/PostModel.js';
import LikeModel from '../models/LikeModel.js';
import PostModel from '../models/PostModel.js';

/* const PostSchema = new mongoose.Schema({
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    image: { type: String },
    filter: { type: String },
    thumbnail: { type: String},
    caption: { type: String, default: "" },
    hashtag: [{ type: Schema.ObjectId, ref: 'Hashtag' }]
}, { timestamps: true }); // createdAt, updatedAt */

export const newPost = async (req, res) => {
    try {
        if (!req.body.caption) {
            res.status(422).json({ message: { messageBody: "Add caption", messageError: true } });
        }
        else if (!req.body.imageData) {
            return res.status(422).json({ message: { messageBody: "Add photo", messageError: true } });
        }

        const fileStr = req.body.imageData;
        const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
            folder: 'insta_clone'
        })
        //console.log(uploadedResponse);
        const post = new Post({
            caption: req.body.caption,
            image_PublicId: uploadedResponse.public_id
        });
        const tempUser = req.user;
        tempUser.password = undefined;
        // tempUser.posts = undefined; tempUser.email = undefined; tempUser.mobile = undefined; tempUser.privilege = undefined; tempUser.createdAt = undefined; tempUser.updatedAt = undefined;
        post.postedBy = tempUser;

        try {
            await post.save()
                .then(post => {
                    res.status(200).json({ message: { messageBody: "Succesfully posted", messageError: false } });
                })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: { messageBody: "Error saving post to DB", messageError: true } });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: { messageBody: "Error uploading image", messageError: true } });
    }
}

export const allPosts = (req, res) => {
    Post.find()
        .populate("postedBy", "_id username") // Populate{postedBy, withProperties..} to get actual properties instead of id
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            res.status(500).json({ message: { messageBody: "Error getting all posts", messageError: true } });
        })
}

export const userPosts = (req, res) => {
    console.log(req.params._id)
    Post.find({ postedBy: req.params._id })
        .populate("postedBy", "_id username")
        .then(userPost => {
            res.json({ userPost })
        })
        .catch(err => {
            res.status(500).json({ message: { messageBody: "Error getting user posts", messageError: true } });

        })
}

export const likePost = async (req, res) => {
    const session = await mongoose.connection.startSession();
    session.startTransaction();

    const like = await LikeModel.findOne({ $and: [{ likedBy: req.user._id }, { post: req.body._id }] }).session(session);
    if (!like) {
        const like = new LikeModel({
            likedBy: req.user._id,
            post: req.body._id
        });
        like.save();
    }
    else {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Already liked", messageError: true } });
    }

    const postLiked = await PostModel.findByIdAndUpdate(req.body._id, { $inc: { likeCount: 1 } }, { new: true }).session(session);
    if (!postLiked) {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Error, no post", messageError: true } });
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: { messageBody: "Post liked succesfully", messageError: false } });
}

export const unlikePost = async (req, res) => {
    const session = await mongoose.connection.startSession();
    session.startTransaction();

    const like = await LikeModel.findOneAndDelete({ $and: [{ likedBy: req.user._id }, { post: req.body._id }] }).session(session);
    if (!like) {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Error, post is not liked", messageError: true } });
    }

    const postLiked = await PostModel.findByIdAndUpdate(req.body._id, { $inc: { likeCount: -1 } }, { new: true }).session(session);
    if (!postLiked) {
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ message: { messageBody: "Error, no post", messageError: true } });
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: { messageBody: "Post unliked succesfully", messageError: false } });
}

export const checkLike = async (req, res) => {
    LikeModel.findOne({ $and: [{ likedBy: req.user._id }, { post: req.params._id }] })
        .then(like => {
            if (!like)
                return res.status(200).json({ isLiked: false });

            return res.status(200).json({ isLiked: true });
        })
        .catch(err => {
            console.log(err);
            return res.status(403).json({ message: { messageBody: "Error checking like", messageError: true } });
        })
}