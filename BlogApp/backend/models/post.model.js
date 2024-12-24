import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    textContent : {
        type : String,
        required : true,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    } 
},
 {timestamps : true}
)

const Post = mongoose.model('Post' , postSchema);

export default Post;