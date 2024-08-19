const { Schema, model } = require("mongoose")

const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    paymentDate: Date,
    amount: Number,
    paymentType: {
        type:String,
        default:["card"],
        enum:["card","COD"]

    },
    transaction_Id: String,
    status: {
        type: Boolean,   // Payment status
        default: false
    }
},{timestamps:true});

const Payment = model("Payment", paymentSchema)

module.exports = Payment
