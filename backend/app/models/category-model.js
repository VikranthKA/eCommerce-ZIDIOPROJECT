const mongoose = require('mongoose')
const {Schema,model} = mongoose

const CategorySchema = new Schema({
    name: {
        type:String,
        required:true,
        // unique:true,
    },
    image:{
        type:String,
        required:true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
},{timestamps:true})

const Category = model("Category",CategorySchema)
module.exports = Category