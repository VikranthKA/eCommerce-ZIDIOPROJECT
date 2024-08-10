
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const checkArray = {
    validator: function (value) {
        return Array.isArray(value) && value.length > 0
    },
    message: "Size must be non empty array"
}

const productSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        reviewId:{
        type: Schema.Types.ObjectId,
        ref: 'ReviewModel'
    }
    }],
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    description: {
        type: String,
        required: true,
    },
    minPrice: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        default: 'INR',
    },
    totalStock: {
        type: Number,
        default: 0,
    },
    images: {
        type: String,
    },
    sizesAndColors : [{
            size: {
                type:String,
            }, 
            color:{
                type:String
            },
            price:{
                type:Number
            },
            stock: {
                type:Number
            },

    }],
    discount:{
        type:Number,
    },
    productType: {
        type: String,
        required: true,
        enum: ['3DModelWithLogo', '3DModelWithoutLogo', '3DSoftwareWithLogo', '3DSoftwareWithoutLogo', '3DModelWithLogo & 3DSoftwareWithLogo', "3DModelWithLogo & 3DSoftwareWithoutLogo ", "3DModelWithoutLogo & 3DSoftwareWithLogo ", "3DModelWithoutLogo & 3DSoftwareWithoutLogo"],
    },

    madeFrom: {
        type: String,
        default: "Plastic"
    }
}, { timestamps: true })

const Product = model('Product', productSchema)
module.exports = Product;
