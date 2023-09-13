const express = require("express");
const DB = require("./db/connectDB");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const port = 8000;
const User = require("./model/User");
const router = require("./routes/handler");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

app.use("/tisma/v1", router)


const start = async () =>{
    await connectDB()
    app.listen(port, ()=>{
        console.log(`server started on port ${port}!!!`);
    })
}

start()