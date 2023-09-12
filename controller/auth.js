const userModel = require("../model/User");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const signUp= async(req, res)=>{
    const {fullname, email, businessname, phonenumber, businessaddress, password, bvn } = req.body;
    try {
              const newUser = await userModel.findOne({ email });
              if (!newUser) {
                // User does not exist, create a new one
                await userModel.create({
                  email,
                  fullname,
                  phonenumber,
                  password,
                  businessname,
                  businessaddress,
                  bvn
                });
                // Token Generator
                const token = jwt.sign({email: user.email }, 'secret_key');

                res.json({ msg: "New user created!!!", token });
              } else {
                // User already exists
                console.log("User already exists!!!");
                res.status(409).json({ msg: "User already exists" });
              }
            } catch (error) {
              console.error(error);
              res.status(500).json({ msg: "Server error" });
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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });

    if (user) {
      const resetToken = generateResetToken();

      await user.save();

      // Send an email with the reset link
      const resetLink = `http://localhost:8000/reset-password/${resetToken}`;

      // Use Nodemailer to send the reset email
      const mailOptions = {
        from: 'your_email@gmail.com',
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