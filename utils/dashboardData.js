const User = require("../model/User");
const Business = require("../model/Business");
const auth = require('../verifytoken');

const dashboardData = async (req, res) => {
    // verifying user
    auth(req, res, async (err) => {
        if (err) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        try {
            const userData = req.user;
            
            const user_data = await User.findOne({
               businessemail: userData.businessemail
            }).populate('business')
            
            if (!user_data) {
                throw new Error("User not found");
            }

            return res.json(userData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Server Error' });
        }
    });

}

// const dashboardData = async (req, res) => {
//     try {
//       // Assuming the authenticated user's ID is available in req.user
//         userId = req.user.id
  
//       // Fetch the user data with populated business info
//       const user = await User.findById(userId)
//         .populate('business', 'businessname') // Only select the 'name' field from the business
  
//       if (!user) {
//         console.log(Error)
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Prepare the response data
//       const dashboardData = {
//         businessname: user.business ? user.businessname : 'N/A',
//         businessemail: user.businessemail,
//         date: new Date(), // You can format this date as needed
//       };
  
//       res.json(dashboardData);
//       console.log(dashboardData)
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server Error' });
//     }
// };
  

module.exports = dashboardData;

