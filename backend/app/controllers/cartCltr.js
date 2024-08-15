require("dotenv").config()
const { validationResult, body } = require("express-validator")
const _ = require('lodash')
const Cart = require("../models/cart-model")
const Product = require("../models/product-model")
const Category = require("../models/category-model")
const cartCltr = new Object()

// cartCltr.addProducts = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const body = _.pick(req.body, ["productId", "sc_id", "count"]);
    
//     const { productId, sc_id, count } = body;
//     // console.log(productId, sc_id, count,"psc")
//     // return "Working"

//     if (!productId || !sc_id || !count) {
//         return res.status(400).json({ msg: "productId, sc_id, and count are required" });
//     }

//     try {
//         // product exists
//         const isProductPresent = await Product.findById(productId);
//         if (!isProductPresent) {
//             return res.status(404).json({ msg: "Product not found" });
//         }

//         // size and color combination 
//         const isSizeAndColorPresent = isProductPresent.sizesAndColors.find((sc) => sc._id && sc._id.toString() === sc_id);
//         if (!isSizeAndColorPresent || isSizeAndColorPresent.stock < count) {
//             return res.status(400).json({ msg: "Size and color combination not found or insufficient stock" });
//         }

//         // user's cart
//         let cart = await Cart.findOne({ userId: req.user.id });
//         if (!cart) {
//             cart = new Cart({ userId: req.user.id, products: [] });
//         }

//         // already exists in the cart
//         const existingProductIndex = cart.products.findIndex(product =>
//             product.productId && product.productId.toString() === productId &&
//             product.quantity && product.quantity.sc_id && product.quantity.sc_id.toString() === sc_id
//         );
//         console.log(existingProductIndex,"1")

//         if (existingProductIndex > -1) {
//             // Update the count if the product  exists in the cart
//             cart.products[existingProductIndex].quantity.count += count;
//         } else {
//             // cart if it doesn't already exist
//             cart.products.push({
//                 productId,
//                 quantity: {
//                     sc_id,
//                     count
//                 }
//             });
//         }
//         console.log(cart,"cartInfo")
//         // await cart.save();
//         const updatedUserCart = await Cart.findOneAndUpdate({userId:req.user.id},cart,{new:true}).populate({path:"products.productId",select:"sizesAndColors _id name currency images discount"})
//         return res.status(201).json({
//             msg: "Updated Cart Successfully",
//             cart: updatedUserCart
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: 'Something went wrong' });
//     }
// };

cartCltr.addProducts = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { productId, sc_id, count } = req.body;

    if (!productId || !sc_id || !count) {
        return res.status(400).json({ msg: "productId, sc_id, and count are required" });
    }

    try {
        const isProductPresent = await Product.findById(productId);
        if (!isProductPresent) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const isSizeAndColorPresent = isProductPresent.sizesAndColors.find((sc) => sc._id.toString() === sc_id);
        if (!isSizeAndColorPresent || isSizeAndColorPresent.stock < count) {
            return res.status(400).json({ msg: "Size and color combination not found or insufficient stock" });
        }

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, products: [] });
        }

        const existingProductIndex = cart.products.findIndex(product =>
            product.productId.toString() === productId &&
            product.quantity.sc_id.toString() === sc_id
        );

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity.count = count;
        } else {
            cart.products.push({
                productId,
                quantity: {
                    sc_id,
                    count
                }
            });
        }

        const updatedUserCart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $set: { products: cart.products } },
            { new: true }
        ).populate({
            path: "products.productId",
            select: "sizesAndColors _id name currency images discount"
        });

        return res.status(201).json({
            msg: "Updated Cart Successfully",
            cart: updatedUserCart
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

cartCltr.removeProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      console.log(productId, req.params, "params");
  
      const cartItems = await Cart.findOne({ userId: req.user.id }).populate({
        path: "products.productId",
        select: "_id"
      });
  
      const removeProduct = cartItems.products.filter(product => 
        product.productId._id.toString() !== productId
      );
  
      console.log(removeProduct.length, "removeProduct");
  
      const updatedCartItems = await Cart.findOneAndUpdate(
        { userId: req.user.id },
        { $set: { products: removeProduct }},
        { new: true }
      ).populate({
        path: "products.productId",
        select: "sizesAndColors _id name currency images discount"
      });
  
      return res.status(200).json({
        msg: "Product removed from the Cart",
        productId,
        data: updatedCartItems
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error removing the product",
        error: error
      });
    }
  };
  


//add the stock remaning in the product while send ing to the FE
cartCltr.cartItems = async(req,res)=>{
    try {
        const cartItems = await Cart.findOne({userId:req.user.id}).populate("products.productId")
        console.log(cartItems)
        return res.json({
            data:cartItems
        })
    } catch (error) {
        res.json(error)
    }
}


module.exports = cartCltr



