import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
    likedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
 });

export default mongoose.model('Like', LikeSchema);