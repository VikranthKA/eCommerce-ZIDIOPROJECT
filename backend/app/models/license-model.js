const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const licenseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    licenseKey: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    expiryDate: {
        type: Date,
    },
}, { timestamps: true })

const License = model('License', licenseSchema)
module.exports = License
