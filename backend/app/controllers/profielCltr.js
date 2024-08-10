require("dotenv").config()

const Profile = require("../models/profile-model")
const _ = require("lodash")
const { getCoByGeoApify } = require("../../utils/Address/getLatLon")
const profileCltr = {}
const cloudinary = require("../../utils/Cloudinary/cloudinary")


profileCltr.getOne = async (req, res) => {

    try {
        const profile = await Profile.findOne({ userId: req.user.id }).populate("userId")
            .populate({
                path: 'orders.ordersId',
                populate: {
                    path: 'products.productId',
                    model: 'Product',
                    // select: "_id name images"
                }
            })

        if (!profile) {
            //  profile is not found 
            return res.status(404).json({ error: "Profile not found" });
        }
        return res.status(200).json(profile);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

profileCltr.update = async (req, res) => {
    try {
        // return res.json(req.body)
        const profileId = req.params.profileId

        const updatedProfile = {

        }

        if (req.body.addresses && req.body.addresses.length <= 3) {

            // addresses is a array of object
            const geocodedAddresses = []
            //loop over array
            for (const address of req.body.addresses) {
                const geocoded = await getCoByGeoApify(address);
                if (geocoded.error) {
                    return res.status(400).json({ errors: [{ msg: geocoded.error }] });
                }
                geocodedAddresses.push(geocoded)
            }

            updatedProfile.addresses = geocodedAddresses

        }


        if (req.body.gender) {

            updatedProfile.gender = req.body.gender
        }

        if (req.file) {

            const uploaded = await cloudinary.uploader.upload(req.file.path)
            updatedProfile.profilePic = uploaded.secure_url

        }

        const profile = await Profile.findOneAndUpdate({ userId: req.user.id, _id: profileId }, updatedProfile, { new: true });

        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


module.exports = profileCltr