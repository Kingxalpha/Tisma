const User = require('../model/User');

const UserProfile = async (req, res) => {
  try {
    // const userId = req.params.email;

    
    const user = await User.findOne({email: req.params.email})
      .populate('followers', 'fullname')
      .populate('followings', 'fullname'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user profile data with populated followers and followings
    res.json({
      fullname: user.fullname,
      followers: user.followers,
      followings: user.followings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {UserProfile};

