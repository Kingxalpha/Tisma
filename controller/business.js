const businessModel = require("../model/Business");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const cookieParser = require("cookie-parser");
const auth = require('../verifytoken'); 
// const passport = require('passport');

// Create New Business Page...

// Middleware to authenticate with JWT
// const authenticateJWT = passport.authenticate('jwt', { session: false });

const createBusiness = async (req, res) => {
  const { businessname, businessemail, phonenumber, businessaddress, bvn, description } = req.body;

  try {
    // Check if a business already exists for this user
    const existingBusiness = await businessModel.findOne({ businessemail });

    if (existingBusiness) {
      return res.status(409).json({ msg: 'Business Already Exists' });
    }

    // Create a new business
    const business = await businessModel.create({
      businessname,
      businessaddress,
      phonenumber,
      businessemail,
      description,
      bvn,
    });

    return res.json({ msg: 'New Business Created', business });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

// Get Business Page

const getBusiness = async (req, res) => {
  auth(req, res, async (err) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  try {
    const { businessId } = req.params;
    const business = await businessModel.findById(businessId);

    if (!business) {
      return res.status(404).json({ msg: 'Business not found' });
    }

    return res.json({ business });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});
};


// Update Business Page

const updateBusiness = async (req, res) => {
  auth(req, res, async (err) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  try {
    const { businessId } = req.params;
    const updateData = req.body; // Update data from request body

    console.log('Updating business with ID:', businessId);
    console.log('Update data:', updateData);
    // Use findByIdAndUpdate to update the business
    const updatedBusiness = await businessModel.findByIdAndUpdate(
      businessId,
      updateData,
      { new: true,runValidators :true } // Return the updated document
    );

    if (!updatedBusiness) {
      return res.status(404).json({ msg: 'Business not found' });
    }

    return res.json({ msg: 'Business updated', business: updatedBusiness });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});
};



// Delete A Business Page

const deleteBusiness = async (req, res) => {
  auth(req, res, async (err) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  try {
    const { businessId } = req.params;

    // Use findByIdAndDelete to delete the business
    const deletedBusiness = await businessModel.findByIdAndDelete(
      businessId
    );

    if (!deletedBusiness) {
      return res.status(404).json({ msg: 'Business not found' });
    }

    return res.json({ msg: 'Business deleted', business: deletedBusiness });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});
};


module.exports = {
    createBusiness,
    getBusiness,
    updateBusiness,
    deleteBusiness
}



