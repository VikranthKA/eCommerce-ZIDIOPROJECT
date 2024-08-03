const { validationResult } = require("express-validator")
const Category = require("../models/category-model")
const _ = require("lodash")
const cloudinary = require("../../utils/Cloudinary/cloudinary")

const categoryCltr = {}

categoryCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    } else {

        const body = _.pick(req.body, ["name"])
        try {
            const uploaded = await cloudinary.uploader.upload(req.file.path)

            const cat = new Category({
                name: body.name,
                // image:req.file.key,
                image: uploaded.secure_url
            })
            await cat.save()
            res.status(201).json(cat)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)

        }
    }
}

categoryCltr.getAll = async (req, res) => {
    try {
        const cat = await Category.find()
        return res.status(200).json(cat)
    } catch (err) {
        console.log(err,"err in category")
        return res.status(500).json(err)

    }
}

categoryCltr.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    } else {

        const body = _.pick(req.body, ["name"])
        const { categoryId } = req.params
        try {
            let categoryBody={

            }
            if (req.file && req.file.path) {
                categoryBody.uploaded = await cloudinary.uploader.upload(req.file.path)
            }
            if (body?.name !== undefined) {
                categoryBody.name = body.name
            }
 

            const updatedCategory = await Category.findOneAndUpdate({
                                            userId: req.user.id,
                                            _id: categoryId
                                            }, categoryBody,   
                                            { new: true }
            )
            return res.status(201).json({
                msg: "Category created",
                data: updatedCategory
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: "Error in the Category Update",
                error: error
            })
        }
    }
}

categoryCltr.delete=async(req,res)=>{
    try {
        const {categoryId} = req.params
        const checkCategory = await Category.findOne({_id:categoryId,userId:req.user.id})
        const totalProducts = checkCategory.products.length
        if( totalProducts >= 0){
            return res.status(400).json({
                msg:`This Category has these ${totalProducts}`
            })

        }else if(totalProducts <= 0){
            const deleteProduct = await Category.findOneAndDelete({_id:categoryId,userId:req.user.id})
            return res.status(200).json({
                msg:`${deleteProduct.name} deleted`,
                data:deleteProduct
            })
        }
    } catch (error) {
    console.log(error)
    return res.status(500).json({
        msg:"Error Deleting the Category",
        error
    }) 
    }
}


module.exports = categoryCltr