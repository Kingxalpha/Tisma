const express = require("express");
const User = require('../model/User')
const bodyParser= require("body-parser");
const multer= require("multer")
const jwt = require('jsonwebtoken');
const secretkey = process.env.secret_key;
const cookieParser = require("cookie-parser");
express().use(cookieParser())
const productModel = require("../model/Product");
const userModel = require("../model/User");
const businessModel = require("../model/Business");
const dashboardData = require("../utils/dashboardData");
const fs= require("fs")
const auth= require("../verifytoken");
const userModel = require("../model/User");
const profile = require('../model/BizProfile');
const profileModel = require("../model/BizProfile");


const upload = multer({ dest: 'uploads/' })

  // Posting a product
const addProduct= async(req,res)=>{
    auth(req, res, async (err) => {
        if (err) {
          return res.status(401).json({ error: 'Authentication failed' });
        };

    const {originalname, path} = req.file;
    const part= originalname.split(".");
    const ext= part[part.length -1];
    const newPath= `${path}.${ext}`;
    fs.renameSync(path, newPath)

    


    const {title, price, description, available_product, negotiation, whatsapp} = req.body;
    const whatsapp_link = `https://wa.me/${whatsapp}`
    const {image} = req.file;
    
    // console.log(product);

    // if(userProduct){
    //     const totalProduct = userProduct.filter((product)=>{
    //         if(userProduct.product.length === 10){
    //             return res.json({msg: "PLEASE SUBSCRIBE TO VIP"})
    //         }
    //     })
        try {
          const newProduct= await productModel.create({
               title,
               price,
               description,
               available_product,
               negotiation,
               whatsapp: whatsapp_link,
               image : newPath,
          }); 
          console.log(newProduct);
          res.json({msg:"new product  added successfully", alert : newProduct.title});
       } catch (error) {
           console.error(error);
           res.status(500).json({msg: "an error occured while adding product"})
       }
})
}
   


   
    



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
// deleting a product
    const deleteProduct= async(req,res)=>{
        const productID= req.params['id']
        const merchantProduct= await productModel.findById({_id : productID})
        if (!merchantProduct) {
            res.status(404).json({msg: "product has been deleted already"})
        }

        const deletedproduct = await productModel.findByIdAndRemove({_id: productID})

        if(deletedproduct){
            res.json({msg:"product deleted successfully"})
        }
    }

    // updaatingproduct

    const updateProduct= async(req,res)=>{
        const productID = req.params['id'];
        const merchantProduct = await productModel.findById({_id : productID})
        if (merchantProduct) {
          await productModel.findOneAndUpdate({_id: productID}, req.body, {
            new:true, runValidators:true
          });
          return res.json({msg: "Product updated succesfully"})
        }else{
          res.json({msg: "no product found"})
        }
      }

        // business profile...
        const businessProfile = async (req, res) =>{
          try {
            const profile = new profileModel(req.body);
            await profile.save();
            res.status(201).json(profile);
          } catch (error) {
            res.status(500).json({ error: 'Could not create profile' });
          }
        };
        
    module.exports ={
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    businessProfile
 }