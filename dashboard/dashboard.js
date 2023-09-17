const User = require("../model/User");
const Business = require("../model/Business");

const dashboardData = async (userData) => {
    try {
        const user_data = await User.findOne({
            fullname: userData.fullname,
            email: userData.email
        });
        
        if (!user_data) {
            throw new Error("User not found");
        }

        return user_data;
    } catch (error) {
        throw error;
    }
}

module.exports = dashboardData;
