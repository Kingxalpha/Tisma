const express = require("express");
const bodyParser = require('body-parser');
const { signUp, login, resetPassword } = require("../controller/auth");

const router = express.Router();




router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/reset-password").post(resetPassword);


module.exports = router;