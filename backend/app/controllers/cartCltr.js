require("dotenv").config()
const { validationResult, body } = require("express-validator")
const _ = require('lodash')
const Cart = require("../models/cart-model")
const Product = require("../models/product-model")
const cartCltr = new Object()

cartCltr.addProducts = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    } else {
        const body = _.pick(req.body,
            [
                "productId", "quantity"
            ]
        )

        const { productId, quantity } = body

        try {
            const isPresentProduct = await Product.findById({ _id: productId })
            if (!isPresentProduct || isPresentProduct.stock < 1) {
                return res.status(400).json({
                    error: "Cannot add the Product",

                })
            }

            let cart = await Cart.findOne({ userId: req.user.id })
            if (!cart) cart = new Cart({ userId: req.user.id })

            const productIndex = cart.products.findIndex(product => product.productId.toString() === productId)

            if (productIndex > -1) {
                //product in cart
                cart.products[productIndex].quantity += quantity
            } else {

                cart.products.push({
                    productId, quantity
                })

            }

            await cart.save()
            return res.status(201).json({
                msg: "Updated Successfully",
                cart: cart
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Something went wrong' });


        }}
}


module.exports = cartCltr



