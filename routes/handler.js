const express = require("express");
const bodyParser = require('body-parser');
const multer= require("multer")
const upload = multer({ dest: "uploads/" });
const { signUp, login, resetPassword, logOut, updatePassword } = require("../controller/auth");
const contactForm = require("../controller/contact");
const { addProduct, getProduct } = require("../controller/controller");
const {follow, unfollow } = require("../controller/follow");
const { createBusiness, getBusiness, updateBusiness, deleteBusiness } = require("../controller/business");
const validateToken = require("../verifytoken");
const logoutMiddleware = require('../controller/auth');
const auth = require('../verifytoken');
const dashboardData = require("../utils/dashboardData");
const { UserProfile } = require("../controller/profile");

const router = express.Router();

router.route("/:user_id/userprofile").get(UserProfile)
router.route("/dashboard").post(dashboardData)
router.route("/contact").post(auth, contactForm);
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/reset-password").post(auth, resetPassword);
router.route("/logout").post(logOut);
router.route("/updatepassword").patch(auth, updatePassword);
router.route("/:userId/follow").patch(follow);
router.route("/:userId/unfollow").patch(unfollow);
router.route("/upload/product").post(upload.single('image'), addProduct)
router.route("/product").get(getProduct)
router.route("/createbusiness").post(createBusiness);
router.route("/business").get(getBusiness);
router.route("/:userid/updatebusiness").patch(updateBusiness);
router.route("/:userid/deletebusiness").delete(deleteBusiness);




module.exports = router;