const { validationResult } = require('express-validator');
const Review = require("../models/review-model")
const _= require('lodash');
const Product = require('../models/product-model');
const cloudinary = require("../../utils/Cloudinary/cloudinary")


// Create a review for an prodcut
reviewCltr = {}
reviewCltr.createReviewForProduct = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()}) 
    try {
        const { productId } = req.params;
        const { body, rating } = req.body;

        console.log(req.files,"file")

        const uploadedImages = await Promise.all( req.files.map(async(file)=>{
            const uploaded = await cloudinary.uploader.upload(file.path)
            return uploaded.secure_url


         }))
        
        // return res.json(tempReview)



        // Create a new review instance
        const newReview = new Review({
            productId,
            userId: req.user.id,
            body,
            rating,
            images:uploadedImages

        });

        const savedReview = await newReview.save();


        // Save the review to the database
        const populatedReview = await Review.findById(savedReview._id).populate('userId');
        const finalResponse={
            reviewId:populatedReview,
            _id:savedReview._id
        }

        // Push the review ID to the products's reviews array
        await Product.findByIdAndUpdate(productId, { $push: { reviews: { reviewId: savedReview._id } } });
        console.log(finalResponse);
        res.status(201).json(finalResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};


// Update a review for an product
reviewCltr.updateReviewForProduct = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array(),error:"validation Error"})
    try {
        const { productId, reviewId } = req.params;
        const body = _.pick(req.body,["body","rating"])

        // Find the review by ID
        const product = await Product.findById(productId)
        if(!product) res.status(404).json("Product Not Found")

        const reviewToUpdate = await Review.findByIdAndUpdate({_id:reviewId},body,{new:true}).populate({path:"userId",select:"_id username email"})

        if (!reviewToUpdate) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Prepare the final response
        const finalResponse = {
            reviewId: reviewToUpdate,
            _id: reviewId
        };

        res.status(200).json(finalResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}


// Delete a review for an Product
reviewCltr.deleteReviewForProduct = async (req, res) => {
    try {
        const { productId, reviewId } = req.params;

        // Remove the review ID from the products's reviews array
        await Product.findByIdAndUpdate(productId, { $pull: { reviews: { reviewId } } });

        // Delete the review
       const deletedReview =  await Review.findOneAndDelete({_id:reviewId,userId:req.user.id})

        res.json({ message: 'Review deleted successfully',review:deletedReview})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = reviewCltr