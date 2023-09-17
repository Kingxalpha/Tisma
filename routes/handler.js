const express = require("express");
const bodyParser = require('body-parser');
const multer= require("multer")
const upload = multer({ dest: "uploads/" });
const { signUp, login, resetPassword, logOut, updatePassword } = require("../controller/auth");
const contactForm = require("../controller/contact");
const { addProduct, getProduct } = require("../controller/controller");
const {follow, unfollow } = require("../controller/follow");
const { createBusiness, getBusiness, updateBusiness, deleteBusiness } = require("../controller/business");

const router = express.Router();



router.route("/contact").post(contactForm);
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/reset-password").post(resetPassword);
router.route("/logout").post(logOut);
router.route("/updatepassword").patch(updatePassword);
router.route("/:userId/follow").put(follow);
router.route("/:userId/unfollow").put(unfollow);
router.route("/upload/product").post(upload.single('image'), addProduct)
router.route("/product").get(getProduct)
router.route("/createbusiness").post(createBusiness);
router.route("/business").get(getBusiness);
router.route("/updatebusiness").patch(updateBusiness);
router.route("/deletebusiness").delete(deleteBusiness);




module.exports = router;