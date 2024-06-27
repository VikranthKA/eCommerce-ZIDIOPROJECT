require("dotenv").config()
const { validationResult } = require("express-validator")
const _ = require('lodash')
const nodemailer = require("../../utils/email/nodemailer")
const Product = require("../models/product-model")
const Category = require("../models/category-model")
const cloudinary = require("../../utils/Cloudinary/cloudinary")



const productCltr = new Object()

productCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {

        const uploaded = await cloudinary.uploader.upload(req.file.path)

        const body = _.pick(req.body,
            [
                "name", "categoryId", "description",
                "stock", "price","images",'size',
                'color'

            ]
        )
        const product = new Product({
            name: body.name,
            description: body.description,
            stock: body.stock,
            price: body.price,
            categoryId: body.categoryId,
            userId: req.user.id,
            description:body.description,
            color:body.color,
            size:body.size,
            images:uploaded.secure_url

              })
       
       await product.save()

        if (!product._id) return res.status(400).json({
            error: "Cannot Create the Product"
        })

        await Category.findByIdAndUpdate(product.categoryId, { $push: { products: {productId:product._id} } })//check


        
        return res.status(201).json({
            message: `${product.name} Created Successfully`,
            product
        })
    }

}


productCltr.getAll =async(req,res)=>{
    const products = await Product.find()
    res.status(200).json({
        products,
        uid:req.user.id,
    })
}

module.exports = productCltr