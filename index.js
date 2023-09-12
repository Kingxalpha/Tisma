const express = require("express");
const DB = require("./db/connectDB");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const port = 8000;

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());



const start = async () =>{
    await connectDB()
    app.listen(port, ()=>{
        console.log(`server started on port ${port}!!!`);
    })
}

start()