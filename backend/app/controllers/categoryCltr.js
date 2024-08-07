const { validationResult } = require("express-validator")
const Category = require("../models/category-model")
const _ = require("lodash")
const cloudinary = require("../../utils/Cloudinary/cloudinary")

const categoryCltr = {}
categoryCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const body = _.pick(req.body, ["name"]);

 
    console.log('Request file:', req.file);

    try {
        if (req.file && req.file.path) {
            const uploaded = await cloudinary.uploader.upload(req.file.path);

            const cat = new Category({
                name: body.name,
                userId: req.user.id,
                image: uploaded.secure_url
            });

            await cat.save();

            return res.status(201).json({
                msg: `${cat.name} created successfully`,
                data: cat
            });
        } else {
            return res.status(400).json({
                msg: "Error in the image/file"
            })
        }
    } catch (err) {
        console.log('Error:', err);
        return res.status(500).json({
            msg: 'Internal server error',
            error: err.message
        });
    }
};

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const body = _.pick(req.body, ['name']);
    const { categoryId } = req.params;

    // Logging to debug the incoming request
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request user ID:', req.user.id);
    console.log('Category ID:', categoryId);

    let categoryBody = {};

    try {
        if (req.file && req.file.path) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            categoryBody.uploaded = uploadResult.url; // Assuming you need the URL
        }

        if (body.name !== undefined) {
            categoryBody.name = body.name;
        }

        // Logging to debug the constructed category body
        console.log('Category body:', categoryBody);

        const updatedCategory = await Category.findOneAndUpdate(
            { userId: req.user.id, _id: categoryId },
            categoryBody,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                msg: 'Category not found or user not authorized',
            });
        }

        console.log('Updated category:', updatedCategory);

        return res.status(201).json({
            msg: 'Category updated',
            data: updatedCategory,
        });
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({
            msg: 'Error in the Category Update',
            error: error.message,
        });
    }
};

categoryCltr.delete=async(req,res)=>{
    try {
        const {categoryId} = req.params
        const checkCategory = await Category.findOne({_id:categoryId,userId:req.user.id})
        const totalProducts = checkCategory.products.length
        if( totalProducts > 0){
            return res.status(400).json({
                msg:`${checkCategory.name
                } has ${totalProducts} products`
            })

        }else if(totalProducts === 0){
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