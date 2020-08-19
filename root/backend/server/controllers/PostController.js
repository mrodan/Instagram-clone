import express from 'express';
import passport from 'passport';
import cloudinary from '../utils/cloudinary.js';
import User from '../models/UserModel.js';
import Post from '../models/PostModel.js';

/* const PostSchema = new mongoose.Schema({
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    image: { type: String },
    filter: { type: String },
    thumbnail: { type: String},
    caption: { type: String, default: "" },
    hashtag: [{ type: Schema.ObjectId, ref: 'Hashtag' }]
}, { timestamps: true }); // createdAt, updatedAt */

export const uploadImage = async (req, res) => {
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

export const newPost = (req, res) => {
    const post = new Post(req.body);
    if (!post.caption) {
        res.status(422).json({ message: { messageBody: "Add caption", messageError: true } });
    }
    else if (!post.image_PublicId) {
        return res.status(422).json({ message: { messageBody: "Add photo", messageError: true } });
    }

    const tempUser = req.user;
    tempUser.password = undefined;
    /*
    tempUser.posts = undefined;
    tempUser.email = undefined;
    tempUser.mobile = undefined;
    tempUser.privilege = undefined;
    tempUser.createdAt = undefined;
    tempUser.updatedAt = undefined;
    */
    post.postedBy = tempUser;

    post.save()
        .then(post => {
            res.status(200).json({ post: post, message: { messageBody: "Succesfully posted", messageError: false } });
        })
        .catch(err => {
            res.status(500).json({ message: { messageBody: "Error saving post to DB", messageError: true } });
        })
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
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id username")
        .then(userPost => {
            res.json({ userPost })
        })
        .catch(err => {
            res.status(500).json({ message: { messageBody: "Error getting user posts", messageError: true } });

        })
}
