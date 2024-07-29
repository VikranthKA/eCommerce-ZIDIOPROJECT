const Cart = require("../models/cart-model")
const Order = require("../models/order-model")
const Profile = require("../models/profile-model")
const mongoose = require("mongoose")


const orderCltr = {}

orderCltr.create = async(req,res)=>{
  try {
    let {addressIndex} = req.body

        // const checkoutAddress = await Profile.findOne({userId:req.user.id})
        const cartItems = await Cart.findOne({userId:req.user.id}).populate("products.productId")


        const totalCartAmount = cartItems.products.reduce((amount, item) => {
          return amount + item.productId.sizesAndColors[0].price * item.quantity.count;
      }, 0);

        const newUser = await Profile.findOne({userId:req.user.id})

        if(newUser.orders.length === 0){
          //logic to minus the delivery free
        }

        const newOrder = new Order({
            userId: req.user.id,
            cart: req.user.id,
            // addressId,
            addressId:addressIndex,
            totalAmount: totalCartAmount
             

      })

      await newOrder.save()

    return res.status(201).json({
      msg:"Order Created successfully",
      order:newOrder
    })

    } catch (error) {
      console.log(error)  
    }
}


module.exports = orderCltr