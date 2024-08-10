const mongoose = require("mongoose")
const {Schema,model} = mongoose
const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],

    //cart information like this product and these much quantity and other info
    addressId: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    currency: {
        type: String,
        required: true,
        default: 'INR',
    },
    deliveryStatus: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'INPROGRESS', 'DELIVERED', 'CANCELLED'],
    },
    paymentStatus: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Order = model('Order', orderSchema);
module.exports = Order;
