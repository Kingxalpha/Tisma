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
// require('./passport');

const app = express();

// app.use(cors({
//     origin:'*',
//     credentials:true,
//     methods: ['POST', 'GET', 'PATCH', 'DELETE']
// }))
// app.use((req,res,next) =>{
//     res.header('Access-Control-Allow-Origin','*');
//     next();
// });

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
  };
  app.use(cors(corsOptions));

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