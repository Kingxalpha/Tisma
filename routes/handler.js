const express = require("express");
const bodyParser = require('body-parser');
const { signUp, login, resetPassword, logOut } = require("../controller/auth");
const contactForm = require("../controller/contact");

const router = express.Router();



router.route("/contact").post(contactForm);
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/reset-password").post(resetPassword);
router.route("/logout").post(logOut);




module.exports = router;