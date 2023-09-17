const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
        fullname : {
            type: String,
            required: true,
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
            type: Array,
            default: [],
        },
        followings :{
            type: Array,
            default: [],
        },
        bvn: {
            type: String,
        },
        bc:{
            type:String,
        },
},
    {timestamps:true}
);


const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;