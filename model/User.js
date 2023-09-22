const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
        fullname : {
            type: String,
            required: true,
        },
        business:{
            type:mongoose.Schema.ObjectId,
            ref:'Business'
        },
        businessname: {
            type: String,
            required:true
        },
        email : {
            type: String,
            required: true,
            unique: true,
        },
        phonenumber: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required:true,
            unique:true,
        },
        businessaddress: {
            type:String,
            required:true
        },
        isAdmin :{
            type:Boolean,
            default: false,
        },
        followers :{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        followings :[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        bvn: {
            type: String,
        },
        bc:{
            type:String,
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
        
},
    {timestamps:true},
    {strictPopulate:false}
);


const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;