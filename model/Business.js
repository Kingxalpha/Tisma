const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
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
        businessaddress: {
            type:String,
            required:true
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
},
    {timestamps:true}
);


const businessModel = mongoose.model("Business", BusinessSchema);

module.exports = businessModel;