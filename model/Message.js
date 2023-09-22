const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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
    Read:{
        type:Boolean,
        default:false
    },

},
    {timestamps:new Date()},
);

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;