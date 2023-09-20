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
                email: userData.email
            });
            
            if (!user_data) {
                throw new Error("User not found");
            }

            return res.json(user_data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Server Error' });
        }
    });

}

module.exports = dashboardData;

