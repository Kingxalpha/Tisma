require("dotenv").config();
const mongoose = require("mongoose");

const pass = process.env.pass

const connectionString =  `mongodb+srv://360Dev:${pass}@paytonaira.j0xe8sl.mongodb.net/Tisma?retryWrites=true&w=majority`
const connectDB = async()=>{
    await mongoose.connect(connectionString)
    return console.log("DB is a Connected!!!");
}

module.exports = connectDB;