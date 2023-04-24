import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'admin'],
        default: 'student',
    },
    documents: [{
        type: mongoose.Types.ObjectId,
        ref: 'Document'
    }],
    picture: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;