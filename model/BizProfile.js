const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
        businessname : {
            type: String
        },
        businessemail : {
            type: String
        },
        phonenumber: {
            type: String
        },
        businessaddress: {
            type: String
        },
        description: {
            type:String
        },
        
},
);


const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;