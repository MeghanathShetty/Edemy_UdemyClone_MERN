import mongoose from "mongoose";

const {Schema}=mongoose;

const exe_addAllSchema=new Schema({
    fname:{
        type:String,
        trim:true,
        required:true
    },
    lname:{
        type:String,
        trim:true,
    },
    email:
    {
        type:String,
        trim:true,
        required:true
    },
    gender:{
        type:String,
        trim:true,
        required:true
    },
    interests:{
        type:[String],
        trim:true,
        required:true
    },
    disabled:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export default mongoose.model("exe_User",exe_addAllSchema);