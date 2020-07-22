import express from 'express';
import passport from 'passport';
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

export const createPost = (req, res) => {
    const post = new Post(req.body);
    if (!post.caption) {
        res.status(422).json({ message: { messageBody: "Add caption", messageError: true }});
    }
    req.user.password = undefined; // OR after post.postedBy, change post.postedBy
    post.postedBy = req.user;

    console.log(post);

    post.save()
    .then(post => {
        res.status(200).json({ message: { messageBody: "Succesfully posted", messageError: false }});
    })
    .catch(err => {
        res.status(500).json({ message: { messageBody: "Error saving post to DB", messageError: true }});
    })
}

export const allPosts = (req, res) => {
    Post.find()
    .populate("postedBy", "_id username") // Populate{postedBy, withProperties..}
    .then( posts => {
        res.json({posts})
    })
    .catch(err => {
        res.status(500).json({ message: { messageBody: "Error getting all posts", messageError: true }});
    })
}

export const userPosts = (req, res) => {
    Post.find({postedBy: req.user._id})
    .populate("postedBy", "_id username")
    .then(userPost => {
        res.json({userPost})
    })
    .catch(err => {
        res.status(500).json({ message: { messageBody: "Error getting user posts", messageError: true }});

    })
}
