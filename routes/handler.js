const express = require("express");
const bodyParser = require('body-parser');
const multer= require("multer")
const upload = multer({ dest: "uploads/" });
const { signUp, login, resetPassword, logOut, updatePassword } = require("../controller/auth");
const contactForm = require("../controller/contact");
const { addProduct, getProduct, updateProduct, deleteProduct } = require("../controller/controller");
const {follow, unfollow } = require("../controller/follow");
const { createBusiness, getBusiness, updateBusiness, deleteBusiness } = require("../controller/business");
const validateToken = require("../verifytoken");
const logoutMiddleware = require('../controller/auth');
const auth = require('../verifytoken');
const dashboardData = require("../utils/dashboardData");
const { UserProfile } = require("../controller/profile");

const router = express.Router();

router.route("/profile/:email").get(UserProfile)
router.route("/dashboard").post(dashboardData)
router.route("/contact").post(auth, contactForm);
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/reset-password").post(auth, resetPassword);
router.route("/logout").post(logOut);
router.route("/updatepassword").patch(auth, updatePassword);
router.route("/follow/:userId").patch(follow);
router.route("unfollow/:userId").patch(unfollow);
router.route("/upload/product").post(upload.single('image'), addProduct)
router.route("/product").get(getProduct)
router.route("/product/:id").delete(deleteProduct)
router.route("/product/:id").patch(updateProduct)
router.route("/createbusiness").post(createBusiness);
router.route("/business").get(getBusiness);
router.route("/updatebusiness/:id").patch(updateBusiness);
router.route("/deletebusiness/:id").delete(deleteBusiness);
router.route("/contactform").post(contactForm)




module.exports = router;