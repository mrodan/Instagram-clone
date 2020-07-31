import mongoose from 'mongoose';
//import User from '../models/UserModel.js';
//import Hashtag from '../models/HashtagModel';

const PostSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: { type: String, default: "no image" },
    //filter: { type: String },
    caption: { type: String, default: "" },
    description: { type: String, required: true },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    like_count: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    hashtag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hashtag' }]
}, { timestamps: true }); // createdAt, updatedAt

export default mongoose.model('Post', PostSchema);