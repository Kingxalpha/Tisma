const express = require("express");
const bodyParser= require("body-parser");
const multer= require("multer")
const productModel = require("../model/Product");
const fs= require("fs")
const upload = multer({ dest: 'uploads/' })

// Posting a product
const addProduct= async(req,res)=>{
    const {originalname, path} = req.file;
    const part= originalname.split(".");
    const ext= part[part.length -1];
    const newPath= `${path}.${ext}`;
    fs.renameSync(path, newPath)

    const {title, price, description, quantity, negotiation} = req.body;
    const {image} = req.file
    try {
        const newProduct= await productModel.create({
             title,
             price,
             description,
             quantity,
             negotiation,
             image : newPath,
        }); 
        console.log(newProduct);
        res.json({msg:"new product  added successfully", alert : newProduct.title});
     } catch (error) {
         console.error(error);
         res.status(500).json({msg: "an error occured while adding product"})
     }
}
// posting a product ends

// getting a product

const getProduct= async(req,res)=>{
    try {
        const product= await productModel.find();
        res.json(product);
    } catch (error) {
        console.error('Error Getting Product:',error);
        res.status(500).json({error: "An Error Occured"});
        
    }
}
// getting a product ends

    module.exports ={
    addProduct,
    getProduct,
 }