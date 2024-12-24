import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
            type : String,
            required : true,
    },
    gender : {
      type : String,
      enum :  ['Male' , 'Female' , 'Other'],
      required : true
    },
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Post'
        }
    ],
})

const User = mongoose.model('User' , userSchema)

export default User;