// Once the order created successfully check if the order created and payment is false

// minus the stock in the that product and give the cartItems to the payment

//payment is true make the payment in the order as true and remove the product from the cart and add the newly brought item to the user profile

require("dotenv").config()
const { validationResult } = require("express-validator");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const _ = require("lodash");
// const {cancelBookingFunction} = require("../controllers/booking-Cltr");
const sendMail = require("../../utils/email/nodemailer")
const Profile = require("../models/profile-model");
const Order = require("../models/order-model");
const Payment = require("../models/payment-model");
const Cart = require("../models/cart-model");

const paymentCltr = {};


const findTheSizeAndColor = (arr, id) => {
    return arr.find((sz) => console.log(sz._id, "sz") === console.log(id, "id"));
};


paymentCltr.paymentCheckoutSession = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    } else {
        const body = _.pick(req.body, ["card"])

        // return res.json(body.card)

        const { orderId } = req.params
        console.log(orderId, "id")
        try {

            const orderItems = await Order.findOne({ _id: orderId, userId: req.user.id }).populate("products.productId");

            // return res.json(orderItems)


            if (!orderItems) {
                return res.status(404).json({ error: orderItems, message: "Cannot find the order" });
            }

            const profile = await Profile.findOne({ userId: req.user.id }).populate("userId")
            console.log(profile?.userId?.username, "Profile")
            const customer = await stripe.customers.create({
                name: profile?.userId?.username,
                // name: "eCommerce",
                address: {
                    line1: 'India',
                    postal_code: '560002',
                    city: 'Banglore',
                    state: 'KA',
                    country: 'US',
                },
            })

            const session = await stripe.checkout.sessions.create({
                payment_method_types: {
                    "0": body.card
                },
                mode: "payment",
                line_items: orderItems.products.map((product) => {
                    console.log(findTheSizeAndColor(product?.productId?.sizesAndColors, product?.quantity?.sc_id)?.price, "price")
                    console.log((findTheSizeAndColor(product?.productId?.sizesAndColors, product?.quantity?.sc_id)?.price * (1 - product?.productId?.discount / 100)).toFixed(2) * 100, "uA")
                    console.log(product?.productId?.images, 'image')

                    return {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: `${product.productId.name} (Qty: ${product.quantity.count})`,
                                images: [`${product?.productId?.images}`],
                                quantity: product?.productId?.quantity?.count
                            },
                            unit_amount: (findTheSizeAndColor(product?.productId?.sizesAndColors, product?.quantity?.sc_id)?.price * (1 - product?.productId?.discount / 100)).toFixed(2) * 100, // not done the converting to cents for usd
                        },
                        quantity: product.quantity.count,
                    };
                }),
                customer: customer.id,

                success_url: `${process.env.FRONTEND_URL}/success`,
                cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            })

            const totalPaidAmount = () => {
                const value = orderItems.products.reduce((acc, cv) => {
                    const sizeAndColor = findTheSizeAndColor(cv.productId.sizesAndColors, cv.quantity.sc_id);
                    const priceAfterDiscount = sizeAndColor.price * (1 - cv?.productId?.discount / 100);
                    return acc + (cv.quantity.count * priceAfterDiscount);
                }, 0);
                return value.toFixed(2);
            }
            console.log(totalPaidAmount(), "total")
            res.json({ id: session.id, url: session.url })
            if (session.id) {
                const paymentPending = new Payment({
                    userId: req.user.id,
                    orderId: orderItems._id,
                    paymentDate: new Date(),
                    amount: totalPaidAmount(),
                    paymentType: session.payment_method_types[0],
                    transaction_Id: session.id
                })

                await paymentPending.save()

            }

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}


paymentCltr.updatedPayment = async (req, res) => {
    const { stripeId } = req.body
    console.log(stripeId, "id 24")
    try {
        console.log("1")
        const payment = await Payment.findOneAndUpdate(
            { transaction_Id: stripeId },
            { status: true },
            { new: true }
        )
        if (payment.status) {
            console.log("2")
            const orderUpdate = await Order.findOneAndUpdate({ _id: payment.orderId }, { paymentStatus: true,deliveryStatus:'SHIPPING' }, { new: true })
            console.log(orderUpdate, "order3")

            await Cart.findOneAndUpdate({ userId: req.user.id }, { $set: { products: [] } });

            console.log("4")
            const profile = await Profile.find(
                { userId: req.user.id }
            ).populate("userId")
                .populate({
                    path: 'orders.ordersId',
                    populate: {
                        path: 'products.productId',
                        model: 'Product',
                        // select: "_id name images"
                    }
                })

            await sendMail({
                email: orderUpdate.userId.email,
                subject: "Order CONFIRMED",
                message: `YOU'R ORDER IS SUCCESSFULLY${new Date()}`
            })

            console.log("5")

            res.status(200).json({ msg: `Payment Successfull ${orderUpdate.totalAmount} Rs`, profile })
        } else {
            if (!payment) return res.status(404).json("Cannot find the Payment Info")
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

paymentCltr.deletePayment = async (req, res) => {
    const { paymentId } = req.params
    try {
        const paymentData = await Payment.findOneAndDelete({ userId: req.user.id, transaction_Id: paymentId }, { new: true })
        //delete the order and add the product stock back

        return res.status(200).json("Your Order is Canceled")
    } catch (err) {
        //write the status code for payments
        return res.status(400).json(err)
    }
}



module.exports = paymentCltr