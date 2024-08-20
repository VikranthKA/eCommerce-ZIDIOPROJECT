require("dotenv").config()
const { validationResult, body } = require("express-validator")
const _ = require('lodash')
const nodemailer = require("../../utils/email/nodemailer")
const Product = require("../models/product-model")
const Category = require("../models/category-model")
const cloudinary = require("../../utils/Cloudinary/cloudinary")



const productCltr = new Object()

const findMinPrice = async (arr) => {
    let min = Infinity
    for (const element of arr) {
        if (element.price <= min) {
            min = element.price;
        }
    }
    return min;
}

function toArray(string) {
    if (typeof string === "string") {
        const array = JSON.parse(string.replace(/'/g, '"'))
        if (Array.isArray(array)) {
            return array
        }
    } else {
        return null
    }
}

productCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        try {
            if (req.file && req.file.path) {
                const uploaded = await cloudinary.uploader.upload(req?.file?.path)
                
                const body = _.pick(req.body,
                [
                    "name", "categoryId", "description",
                    "price", 'sizesAndColors',
                    'stock', "productType", "madeFrom",
                    "discount"

                ]
            )
            
            
            if (typeof body.sizesAndColors === 'string') {
                body.sizesAndColors = JSON.parse(body.sizesAndColors);
            }
            
            const product = new Product({
                name: body.name,
                categoryId: body.categoryId,
                description: body.description,
                min: await findMinPrice(body.sizesAndColors),
                stock: body.stock,
                images: uploaded.secure_url,
                discount: body.discount,
                productType: body.productType,
                madeFrom: body.madeFrom,
                sizesAndColors: body.sizesAndColors,
                userId: req.user.id
                
            })

            
            await product.save()
            
            if (!product._id) return res.status(400).json({
                error: "Cannot Create the Product"
            })

            await Category.findByIdAndUpdate(product.categoryId, { $push: { products: { productId: product._id } } })//check
            
            return res.status(201).json({
                message: `${product.name} Created Successfully`,
                data:product,
            })
        }
        return res.json({
            msg:"Error creating the product",
            
        })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error,
                msg: `Error creating the ${body.name}`
            })
        }
    }

}


productCltr.getAll = async (req, res) => {
    const products = await Product.find().populate("categoryId").populate({
        path: 'reviews.reviewId',
        populate: {
            path: 'profileId',
            populate: {
                path: 'userId', 
                model: 'User',  
                select: "_id username email" 
            },
            select: "_id profilePic"
        }
    })
    res.status(200).json({
        msg: "Success",
        data: products
    })
}


//need to change
productCltr.update = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        try {
            const body = _.pick(req.body,
                [
                    "name", "categoryId", "description",
                    "stock", "price", "images",
                    'sizes', 'colors', "productType",
                    "madeFrom"

                ]
            )
            // return res.json({
            //     sizes:toArray(body.sizes)
            // })
            const tempBody = {}

            if (body.name) {
                tempBody.name = body.name
            }
            if (body.categoryId) {
                tempBody.categoryId = body.categoryId

            }
            if (body.description) {
                tempBody.description = body.description
            }
            if (body.price) {
                tempBody.price = body.price
            }
            if (body.stock) {
                tempBody.stock = body.stock
            }
            if (body.images) {
                tempBody.image = body.images
            }
            if (body.colors) {
                tempBody.colors = toArray(body.colors)
            }
            if (body.productType) {
                tempBody.productType = body.productType
            }
            if (body.madeFrom) {
                tempBody.madeFrom = body.madeFrom
            }
            if (body.sizes) {
                tempBody.sizes = toArray(body.sizes)
            }
            if (body.images) {
                const uploaded = await cloudinary.uploader.upload(req.file.path)
                tempBody.images = uploaded.secure_url

            }


            const product = await Product.findOneAndUpdate({ _id: req.params.productId, userId: req.user.id }, tempBody, { new: true })


            if (body.categoryId) {

                await Category.findByIdAndUpdate(product.categoryId, { $push: { products: { productId: product._id } } })

            }

            if (!product._id) return res.status(400).json({
                error: "Cannot Create the Product"
            })

            return res.status(201).json({
                message: `${product.name} Product Created Successfully`,
                product,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error,
                msg: `Error Updating the ${body.name}`
            })
        }
    }

}

productCltr.getOne=async(req,res)=>{
    try{
        const product = await Product.find({_id:req.params.productId})
        .populate({
            path: 'reviews.reviewId',
            populate: {
                path: 'profileId',
                select: "_id userId profilePic" ,
                populate: {
                    path: 'userId',
                    model: 'User',  
                    select: "_id username email" 
                },
            }
        })
        return res.json({
            product
        })
    }catch(error){
        console.log(error)
        res.json({
            error
        })
    }
}

module.exports = productCltr