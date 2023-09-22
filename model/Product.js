const multer  = require('multer');
const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
        title : {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        negotiation:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: false,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }

    });

    const productModel = mongoose.model("Product", ProductSchema);

    module.exports = productModel;