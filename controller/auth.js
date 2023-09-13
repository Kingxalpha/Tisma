const userModel = require("../model/User");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// const secret_key = crypto.randomBytes(32).toString('hex');
// console.log(secret_key);

  // const token = crypto.randomBytes(32).toString('hex');
  // console.log(token);


const signUp= async(req, res)=>{
  const {fullname, email, businessname, phonenumber, businessaddress, password, bvn } = req.body;
  try {
    const newUser = await userModel.findOne({ email });
    if (!newUser) {
      // User does not exist, create a new one
      const user = await userModel.create({
        email,
        fullname,
        phonenumber,
        businessname,
        businessaddress,
        password,
        bvn
      });
        // token generator
      const token = jwt.sign({email: user.email }, 'secret_key');

      res.json({ msg: 'New User Created!!!', token });
    } else {
      // User already exists
      console.log('User already exists!!!');
      res.status(409).json({ msg: 'User Already Exists' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
  
      if (user) {
        // Check if the provided password matches the stored password
        if (user.password === password) {
          // Token Generator
          const token = jwt.sign({email: user.email }, 'secret_key');
          res.json({ msg: "Login successful", user, token });
        } else {
          res.status(401).json({ msg: "Incorrect Password" });
        }
      } else {
        res.status(404).json({ msg: "Email Not Registered" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server Error" });
    }
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










 module.exports ={
    signUp,
    login,
    resetPassword,
 }