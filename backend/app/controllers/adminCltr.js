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
    const orders = await Order.find({ userId: { $ne: req.user.id } }).populate('userId').
    populate({
                path: 'products.productId',
                model: 'Product',
    })

    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};




adminCltr.updateDeliveryStatus = async (req, res) => {
  const { orderId } = req.params;
  console.log(req.body,"body")
  const { deliveryStatus } = req.body;
  console.log(deliveryStatus,'status')

  const validStatuses = ['PENDING', 'SHIPPING', 'INPROGRESS', 'DELIVERED', 'CANCELLED'];

  if (!validStatuses.includes(deliveryStatus)) {
    return res.status(400).json({ error: 'Invalid delivery status' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { deliveryStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Delivery status updated', data: updatedOrder,orderId,deliveryStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};





module.exports = adminCltr
