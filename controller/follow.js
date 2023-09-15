const mongoose = require("mongoose");
const userModel = require("../model/User");
const jwt = require("jsonwebtoken");
const secretkey = process.env.secret_key;
const token = process.env.token;

// to follow a business

// const followUp = async(req, res)=>{
//     const {userId} = req.params;
//     const {followerId} = req.body;

//     try{
//         const followership = new followership({follower: followerId, following: userId});
//         await followership.save();

//         await userModel.findByIdAndUpdate(userId, {$inc: {followers: 1 }});

//         await userModel.findByIdAndUpdate(followerId, {$inc: {followings: 1 }});

//         res.status(201).json({msg: "Followed Successfully"});
//     }catch(error){
//         console.error(error);
//         res.status(500).json({error: "Could not follow user"})
//     }
// };
const followUp = async (req, res) => {
    const busId = req.params['id'];

    try {
        const loggedInUser = jwt.verify(token, 'secretkey')
        if (!loggedInUser) {
            return res.json({ message: "You need to login to follow a business" });
        }

        const business = await userModel.findById(busId);

        if (!business) {
            return res.json({ message: "No business profile for this user!" });
        }

        business.followers += 1; // Increment the followers count
        await business.save(); // Save the updated business object

        res.json({ message: "Successfully followed the business" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// const follower = async(req, res)=>{
//     const busId = req.params['id']
//     const loggedInUser = jwt.verify(token, secretkey );
//     if(!loggedInUser){
//         res.json({message: "You need to login to follow a business"})
//     }
//     const business = await userModel.findById({_id : busId});

//     if(!business){
//         res.json({message: "No business profile for this user!"})
//     }

//     business.followers +1
//     business.save() 
//          res.json({ message: "Successfully followed the business" });
//     } catch (err) {
//             console.error(err);
//             res.status(500).json({ message: "Internal server error" });
//         }
// };
// to unfollow a business

// const unfollowUp = async(req, res)=>{
//     const {userId} = req.params;
//     const {followerId} = req.body;


//     try{
//         const followership = new followership({follower: followerId, following: userId});

//         await followership.findOneAndDelete({follower: followerId, following: userId});

//         await userModel.findByIdAndUpdate(userId, {$inc: {followers: -1 }});

//         await userModel.findByIdAndUpdate(followerId, {$inc: {followings: -1 }});

//         res.json({msg: "Unfollowed Successfully"});
//     }catch(error){
//         console.error(error);
//         res.status(500).json({error: "Could not unfollow user"})
//     }
// };

module.exports = {
    followUp,
    // unfollowUp
}
