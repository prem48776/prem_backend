import mongoose from "mongoose";

const postschema =mongoose.Schema({
    userId:{type :String ,required:true},
    desc:String,
    img:String,
    likes:[],
},{timestamps:true})

const postModel =mongoose.model("posts",postschema)

export default postModel