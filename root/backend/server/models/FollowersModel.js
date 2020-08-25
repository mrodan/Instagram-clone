import mongoose from 'mongoose';

const FollowersSchema = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
 }, { timestamps: true });

export default mongoose.model('Followers', FollowersSchema);