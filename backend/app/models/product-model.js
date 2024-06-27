const mongoose = require("mongoose")
const {Schema,model} = mongoose

const productSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
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
    price: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        default: 'INR',
    },
    stock: {
        type: Number,
        default: 0,
    },
    // images: [{
    //     type: String,
    //     required: true,
    // }],
    images:{
        type:String
    },
    color: {
        type: String,
        default: 'black',
        enum: ['black', 'white', 'grey'],
    },
    size: {
        type: String,
        default: 'Small',
        enum: ['Small', 'Medium', 'Large'],
    },
}, { timestamps: true });

const Product = model('Product', productSchema);
module.exports = Product;
