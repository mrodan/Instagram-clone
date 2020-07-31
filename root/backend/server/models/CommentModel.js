import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    message: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // name and profile img included (populate)
    likes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);