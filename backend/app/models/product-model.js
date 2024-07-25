// const mongoose = require("mongoose")
// const {Schema,model} = mongoose

// const productSchema = new Schema({
//     userId: {
//         type: String,
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     categoryId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Category',
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         default: 0,
//     },
//     currency: {
//         type: String,
//         default: 'INR',
//     },
//     stock: {
//         type: Number,
//         default: 0,
//     },
//     // images: [{
//     //     type: String,
//     //     required: true,
//     // }],
//     images:{
//         type:String
//     },
//     color: {
//         type: String,
//         default: 'black',
//         enum: ['black', 'white', 'grey'],
//     },
//     size: {
//         type: String,
//         default: 'Small',
//         enum: ['Small', 'Medium', 'Large'],
//     },
// }, { timestamps: true });

// const Product = model('Product', productSchema);
// module.exports = Product;

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
    images: {
        type: String,
    },
    colors: [{
        name: String,
        quantity: Number
    }],
    // required: true,
    // validate:checkArray        
    productType: {
        type: String,
        required: true,
        enum: ['3DModelWithLogo', '3DModelWithoutLogo', '3DSoftwareWithLogo', '3DSoftwareWithoutLogo', '3DModelWithLogo & 3DSoftwareWithLogo', "3DModelWithLogo & 3DSoftwareWithoutLogo ", "3DModelWithoutLogo & 3DSoftwareWithLogo ", "3DModelWithoutLogo & 3DSoftwareWithoutLogo"],
    },
    discount:{
        type:Number,

    },
    madeFrom: {
        type: String,
        default: "Plastic"
    }
}, { timestamps: true })

const Product = model('Product', productSchema);
module.exports = Product;



// sizes and color : [{
//     size: S, color:"green",stock: 30,
//      size: L, color:"blue",stock: 30,
//       size: XL,color:"violet", stock: 30

// }]

// sizes:[{
//     size:"S",
// }]



// sizes and color : [{
//     size: S, color:["green","violet"],stock: 30,
//      size: L, color:"blue",stock: 30,
//       size: XL,color:"violet", stock: 30

// }]

// // color:[{
// //     color:"green",
// //     stock:30,
// //     color:"green",
// //     stock:30, 
// //     color:"green",
// //     stock:30,

// // }]