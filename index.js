require('dotenv').config()
const express = require("express");
const DB = require("./db/connectDB");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const port = 8000;
const user = require("./model/User");
const Product= require("./model/Product");
const Business = require("./model/Business");
const multer  = require("multer");
const router = require("./routes/handler");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors({credentials:true, origin:'https://localhost:3000'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1", router)


const start = async () =>{
    await connectDB()
    app.listen(port, ()=>{
        console.log(`server started on port ${port}!!!`);
    })
}

start()