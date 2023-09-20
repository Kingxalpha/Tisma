const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    purposeofmessage:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
});

const contactModel = mongoose.model("Contact", ContactSchema);

module.exports = contactModel;