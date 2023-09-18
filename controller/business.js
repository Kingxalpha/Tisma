const businessModel = require("../model/Business");
const userModel = require("../model/User");

// Create New Business Page...

const createBusiness = async (req, res)=>{
    const { businessname, email, phonenumber, businessaddress, bvn } = req.body;
    try{
        const newbusiness = await userModel.findOne({email});
        if(!newbusiness){
            const business = await businessModel.create({
                businessname,
                businessaddress,
                phonenumber,
                email,
                description,
                bvn
            });
            res.json({msg: "New Business Created", alert : newbusiness.businessname});
        } else{
            res.status(409).json({msg: "Business Already Exist"});
        }
    }catch (error){
        console.error(error);
        res.status(500).json({msg: "Server Error"});
    }
};

// Get Business Page

const getBusiness = async (req, res) => {
    try {
        const businesses = await businessModel.find();
        res.json(businesses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

// Update Business Page

const updateBusiness = async (req, res) => {
    const { id } = req.params;
    const { businessname, email, phonenumber, businessaddress, bvn, description} = req.body;

    try {
        const business = await businessModel.findById(id);

        if (!business) {
            return res.status(404).json({ msg: "Business not found" });
        }

        // Update the business fields
        business.businessname = businessname;
        business.email = email;
        business.phonenumber = phonenumber;
        business.businessaddress = businessaddress;
        business.bvn = bvn;
        business.description = description;

        await business.save();

        res.json({ msg: "Business updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

// Delete A Business Page

const deleteBusiness = async (req, res) => {
    const { id } = req.params;

    try {
        const business = await businessModel.findById(id);

        if (!business) {
            return res.status(404).json({ msg: "Business not found" });
        }

        await business.remove();

        res.json({ msg: "Business deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = {
    createBusiness,
    getBusiness,
    updateBusiness,
    deleteBusiness
}



