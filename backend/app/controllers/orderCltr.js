const Cart = require("../models/cart-model")
const Order = require("../models/order-model")
const Profile = require("../models/profile-model")
const mongoose = require("mongoose")


const orderCltr = {}

orderCltr.create = async (req, res) => {
  try {
    let { addressIndex } = req.body;
    console.log(addressIndex,"i")
    // return res.json(addressIndex)

    const cartItems = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
    const profile = await Profile.findOne({ userId: req.user.id });

    const totalCartAmount = cartItems.products.reduce((amount, item) => {
      return amount + (item.productId.sizesAndColors[0].price) * item.quantity.count;
    }, 0);

    if (profile?.orders.length === 0) {
      // Apply your logic to adjust the totalCartAmount
    }

    const orderProducts = cartItems.products.map(cartItem => {
    
      return {
        productId: cartItem.productId._id,
        quantity: cartItem.quantity, 
    
        isLogo: cartItem.isLogo,
        licenseKey: cartItem.licenseKey,
        isRealModelIncluded: cartItem.isRealModelIncluded
      };
    });



    
    const newOrder = new Order({
      userId: req.user.id,
      cartId: cartItems._id,
      addressId: addressIndex,
      totalAmount: totalCartAmount,
      products: orderProducts
    });

    await newOrder.save();

    if (profile) {
      await Profile.findByIdAndUpdate(profile._id, {
        $push: { orders: { ordersId: newOrder._id } }
      });
    }

    // const emptyUserCart = await Cart.findByIdAndUpdate(cartItems._id, { $set: { products: [] } });

    const populatedOrdersInfo = await Order.findOne({userId:req.user.id,_id:newOrder._id}).populate("products")

    return res.status(201).json({
      msg: "Order created successfully",
      order: populatedOrdersInfo
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Error creating the order",
      error
    });
  }
};



orderCltr.getOrders = async (req, res) => {

  try {
    const userOrders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 })

    return res.json({
      msg: "Fetched data successfully",
      data: userOrders
    })

  } catch (error) {
    console.log(error)
    return res.status(400).json({
      msg: "Error fetching the Orders",
      error
    })

  }
}


module.exports = orderCltr