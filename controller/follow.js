const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const user = require("../model/User")
const secretkey = process.env.secret_key;

// to follow a business

// const followUp = async (req, res) => {
//     const busId = req.params['id'];

//     try {
//         const loggedInUser = jwt.verify(token, 'secretkey')
//         if (!loggedInUser) {
//             return res.json({ message: "You need to login to follow a business" });
//         }

//         const business = await userModel.findById(busId);

//         if (!business) {
//             return res.json({ message: "No business profile for this user!" });
//         }

//         business.followers += 1; // Increment the followers count
//         await business.save(); // Save the updated business object

//         res.json({ message: "Successfully followed the business" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// AUTHENTICATION
function authenticateJWT(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    jwt.verify(token, 'secretkey', (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
  
      req.user = user;
      next();
    });
};

  // FOLLOW

const follow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await user.findById(req.params.id);
      const currentUser = await user.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};
  
  // UNFOLLOW

 const unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await user.findById(req.params.id);
        const currentUser = await user.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  };

  

module.exports = {
    follow,
    unfollow,
}


