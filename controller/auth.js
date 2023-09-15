const userModel = require("../model/User");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const secretkey = process.env.secret_key;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const resetToken = process.env.reset_Token;


// const secret_key = crypto.randomBytes(32).toString('hex');
// console.log(secret_key);

//  REGISTER

const signUp = async (req, res) => {
  const { fullname, email, businessname, phonenumber, businessaddress, password, bvn } = req.body;
  try {
    const newUser = await userModel.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    if (!newUser) {
      // User does not exist, create a new one
      const user = await userModel.create({
        email,
        fullname,
        phonenumber,
        businessname,
        businessaddress,
        password: hashedPassword,
        bvn
      });

      res.json({ msg: 'New User Created!!!' });
    } else {
      // User already exists
      res.status(409).json({ msg: 'User Already Exists' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// LOGIN

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }
    jwt.sign({ email, id: user._id }, secretkey, {}, (error, token) => {
      if (error) throw new error
      res.cookie("token", token).json({ "msg": "User successfully logged in!", "user": user })
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// RESET PASSWORD

const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString('hex'); // Generate a random token
  return token;
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      // Generate a secure and unique reset token
      const resetToken = generateResetToken();

      // Update the user document with the reset token and expiration date
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();

      // Send an email with the reset link
      const resetLink = `http://localhost:8000/reset-password/${resetToken}`;

      // Use Nodemailer to send the reset email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: ${resetLink}`,
      };

      await transporter.sendMail(mailOptions);

      res.json({ msg: "Password reset instructions sent to your email." });
    } else {
      res.status(404).json({ msg: "Email Not Registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const updatePassword = async (req, res) => {
  const { newPassword, confirmPassword, resetToken } = req.body;

  // Validate input
  if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'Invalid input or passwords do not match' });
  }

  try {
    // Find the user associated with the reset token
    const user = await userModel.findOne({ resetToken });

    if (!user) {
      return res.status(404).json({ error: 'User not found or token is invalid' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    user.resetToken = null; 
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
  ;
// LOGOUT

const logOut = (req, res) => {
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json("No token found");
  }
  res.cookie("token", "", { expires: new Date(0) }).json({ message: "User successfully logged out" });
};









module.exports = {
  signUp,
  login,
  resetPassword,
  logOut,
  updatePassword
}