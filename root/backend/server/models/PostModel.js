import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image_PublicId: { type: String },
    //filter: { type: String },
    caption: { type: String, default: "" },
    likeCount: { type: Number, default: 0 },
    usersTagged: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    location: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    //hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hashtag' }]
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);