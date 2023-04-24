import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: [{
        type: mongoose.Types.ObjectId, 
        ref: 'Comment',
    }],

}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
export default Post;