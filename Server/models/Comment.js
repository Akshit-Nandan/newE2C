import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    commentedBy: {
        type: String,
        required: true,
    },
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
    },
}, { timestamps: true });

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;