const mongoose = require("mongoose");

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
        bvn: {
            type: String,
        },
        bc:{
            type:String,
        }
   
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;