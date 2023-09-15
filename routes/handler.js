const express = require("express");
const bodyParser = require('body-parser');
const multer= require("multer")
const upload = multer({ dest: "uploads/" });
const { signUp, login, resetPassword, logOut, updatePassword } = require("../controller/auth");
const contactForm = require("../controller/contact");
const { addProduct, getProduct } = require("../controller/controller");
const { followUp, unfollowUp } = require("../controller/follow");

const router = express.Router();



router.route("/contact").post(contactForm);
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/reset-password").post(resetPassword);
router.route("/logout").post(logOut);
router.route("/updatepassword").patch(updatePassword);
router.route("/:userId/follow").post(followUp);
router.route("/:userId/unfollow").post(unfollowUp);
router.route("/upload/product").post(upload.single('image'), addProduct)
router.route("/product").get(getProduct)




module.exports = router;