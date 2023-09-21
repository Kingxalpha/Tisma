const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {Schema} = require("mongoose")

const UserSchema = new mongoose.Schema({
        fullname : {
            type: String,
            required: true,
        },
        business:{
            type:Schema.ObjectId,
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
    {timestamps:true}
);


const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;