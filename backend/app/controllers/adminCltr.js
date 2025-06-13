const Order = require("../models/order-model");
const Profile = require("../models/profile-model");

const adminCltr = {}

adminCltr.getUser = async (req, res) => {
  try {
    const userData = await Profile.find({ userId: { $ne: req.user.id } }).populate('userId')

    return res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

adminCltr.getNewOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: { $ne: req.user.id } }).populate('userId').populate('products');

    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};


module.exports = adminCltr
