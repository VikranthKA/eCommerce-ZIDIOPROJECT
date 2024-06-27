const { validationResult } = require("express-validator")
const Category = require("../models/category-model")
const _ = require("lodash")
const cloudinary = require("../../utils/Cloudinary/cloudinary")

const categoryCltr = {}

categoryCltr.create = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }else{

        const body = _.pick(req.body,["name"])
        try{
         const uploaded = await cloudinary.uploader.upload(req.file.path)

            const cat = new Category({
                name: body.name,
                // image:req.file.key,
                image:uploaded.secure_url
            })
            await cat.save()
            res.status(201).json(cat)
        }catch(err){
            console.log(err)
            res.status(500).json(err)

        }
    }
}

categoryCltr.getAll = async(req,res)=>{
    try{
        const cat =await CategoryModel.find()
        res.status(200).json(cat)
    }catch(err){
        res.status(500).json(err)

    }
}

module.exports = categoryCltr