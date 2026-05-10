import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
 //  mongooseAggregatePaginate is a package that adds easy pagination support for MongoDB aggregation queries in Mongoose.


 /*

 A pipeline is a sequence of processing stages where data passes through one step after another to produce the final result.
 MongoDB aggregation is a pipeline system used to process, filter, transform, calculate, and organize data step by step.

 */
const videoScehma = new mongoose.Schema({
    videofile : {
        type : String, // c loudanary url
        required: [true,"Video is required"]
    },
    thumbnail : {
        type : String,  // cloudanary url
        required: [true,"Thumbnail is required"]
    },
    title : {
        type : String,
        required: [true,"Title is required"]
    },
    description : {
        type : String,
        required: [true,"Description is required"]
    },
    duration : {
        type : Number,
        required: [true,"Duration is required"]
    },
    views : {
        type : Number,
        default: 0
    },
    isPublished : {
        type : Boolean,
        default: false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

videoScehma.plugin(mongooseAggregatePaginate);
// A plugin means  :  something extra added to give new features/functions
export const Video = mongoose.model("Video", videoScehma)