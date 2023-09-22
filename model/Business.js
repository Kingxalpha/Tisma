const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
        businessname: {
            type: String,
            required: [true, "Business name is required!"],
        },
        businessemail : {
            type: String,
            required: true,
            unique: true,
        },
        phonenumber: {
            type: Number,
            required: true,
        },
        businessaddress: {
            type:String,
            required: [true, "Business Address is required!"],
        },
        description :{
            type: String,
            required: [true, "business Description is required!"],
            wordlimit:250,
        },
        isAdmin :{
            type:Boolean,
            default: false,
        },
        bvn: {
            type: String,
        },
        bc:{
            type:String,
        },
        owner:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
},

);


const businessModel = mongoose.model("Business", BusinessSchema);

module.exports = businessModel;