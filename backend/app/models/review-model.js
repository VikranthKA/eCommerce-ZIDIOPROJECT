const mongoose = require("mongoose")
const {Schema,model} = mongoose

const reviewSchema = new Schema({
    profileId: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    images: {
        type: Array,
    }
}, { timestamps: true });

const Review = model('Review', reviewSchema);
module.exports = Review;
