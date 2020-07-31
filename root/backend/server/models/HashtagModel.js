import mongoose from 'mongoose';

const HashtagSchema = new mongoose.Schema({
    content: { type: String, required: true },
    count: { type: Number, default: 0 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true });

export default mongoose.model('Hashtag', HashtagSchema);