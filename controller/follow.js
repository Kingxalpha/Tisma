const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

  // FOLLOW
  const follow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
  
        if (!userToFollow.followers.includes(req.body.userId)) {
          // Add the logged-in user
          await userToFollow.updateOne({ $push: { followers: req.body.userId } });
          // Add userToFollow
          await currentUser.updateOne({ $push: { followings: req.params.id } });

          // adding to teh followers and followings
          userToFollow.followers.length;
          currentUser.followings.length;

          // Save user followings and followers
            console.log(userToFollow.userId + " " + currentUser.id);
          await userToFollow.save();
          await currentUser.save();

          res.status(200).json("User has been followed");
        } else {
          res.status(403).json("You already follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can't follow yourself");
    }
  };
  

  
  // UNFOLLOW
  const unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
  
        // Check if the logged-in user is following the userToUnfollow
        if (userToUnfollow.followers.includes(req.body.userId)) {
          // Remove the logged-in user 
          await userToUnfollow.updateOne({ $pull: { followers: req.body.userId } });
          // Remove userToUnfollow 
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
  
          //minusing the followings and followers
          userToUnfollow.followers.length;
          currentUser.followings.length;
          
          // Save user followings and followers
          await userToUnfollow.save();
          await currentUser.save();
  
          res.status(200).json("User has been unfollowed");
        } else {
          res.status(403).json("You are not following this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can't unfollow yourself");
    }
  };
  
  

module.exports = {
    follow,
    unfollow,
}


