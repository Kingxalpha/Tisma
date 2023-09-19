const businessModel = require("../model/Business");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const cookieParser = require("cookie-parser");
const auth = require('../verifytoken'); 

// Create New Business Page...
const createBusiness = async (req, res) => {
  // Verifing user
  auth(req, res, async (err) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    
    const { businessname, email, phonenumber, businessaddress, bvn, description} = req.body;

    try {
      const user = req.user;

      // Check if a business already exists for this user
      const existingBusiness = await businessModel.findOne({ user: user._id });

      if (!existingBusiness) {
        const business = await businessModel.create({
          user: user._id,
          businessname,
          businessaddress,
          phonenumber,
          email,
          description,
          bvn,
        });
        return res.json({ msg: 'New Business Created', business });
      } else {
        return res.status(409).json({ msg: 'Business Already Exists' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server Error' });
    }
  });
};

// Get Business Page

const getBusiness = async (req, res) => {
  auth(req, res, async (err) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const { _id } = req.params;

    try {
      const business = await businessModel.findById(_id);

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

    const { _id } = req.params;
    const updates = req.body;

    try {
      const updatedBusiness = await businessModel.findByIdAndUpdate(
        _id,
        updates,
        { new: true }
      );

      if (!updatedBusiness) {
        return res.status(404).json({ msg: 'Business not found' });
      }

      return res.json({ msg: 'Business updated successfully', business: updatedBusiness });
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

    const { _id } = req.params;

    try {
      const deletedBusiness = await businessModel.findByIdAndRemove(_id);

      if (!deletedBusiness) {
        return res.status(404).json({ msg: 'Business not found' });
      }

      return res.json({ msg: 'Business deleted successfully' });
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



