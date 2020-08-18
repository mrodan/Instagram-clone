import mongoose from 'mongoose';
//import User from '../models/UserModel.js';
//import Hashtag from '../models/HashtagModel';

const PostSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: { type: String, default: "no image" },
    //filter: { type: String },
    caption: { type: String, default: "" },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    like_count: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    //hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hashtag' }]
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);