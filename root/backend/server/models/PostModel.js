import mongoose from 'mongoose';
import User from '../models/UserModel.js';


const PostSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: { type: String, default: "no image" },
    //filter: { type: String },
    caption: { type: String, default: "" },
    description: { type: String, required: true },
    hashtag: [{ type: mongoose.Schema.ObjectId, ref: 'Hashtag' }]
}, { timestamps: true }); // createdAt, updatedAt

export default mongoose.model('Post', PostSchema);