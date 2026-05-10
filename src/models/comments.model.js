import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required: [true,"Comment is required"]
    },
    video : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes : {
        type : Number,
        default: 0
    }
}, {timestamps: true})
export const Comment = mongoose.model("Comment", commentSchema)