const { validationResult } = require('express-validator');
const Review = require("../models/review-model")
const _ = require('lodash');
const Product = require('../models/product-model');
const cloudinary = require("../../utils/Cloudinary/cloudinary");
const Profile = require('../models/profile-model');


// Create a review for an prodcut
reviewCltr = {}
reviewCltr.createReviewForProduct = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    try {
        console.log(req.files.length, "files")
        console.log(req.file, "file")
        console.log(req.body, "body")

        const { productId } = req.params;
        const { body, rating } = req.body;


        // return res.send("Working")

        const uploadedImages = await Promise.all(req.files.map(async (file) => {
            const uploaded = await cloudinary.uploader.upload(file.path)
            return uploaded.secure_url


        }))

        // return res.json(tempReview)
        const profile = await Profile.findOne({ userId: req.user.id })


        // Create a new review instance
        const newReview = new Review({
            productId,
            profileId: profile._id,
            body,
            rating,
            images: uploadedImages

        });

        const savedReview = await newReview.save();

        await Product.findByIdAndUpdate(productId, { $push: { reviews: { reviewId: savedReview._id } } });

        const product = await Product.find({ _id: productId })
            .populate({
                path: 'reviews.reviewId',
                populate: {
                    path: 'profileId',
                    select: "_id userId profilePic",
                    populate: {
                        path: 'userId',
                        model: 'User',
                        select: "_id username email"
                    },
                }
            })

        // return res.json({review:product[0].reviews})
        console.log(product.reviews, "review")




        // Save the review to the db

        const finalResponse = {
            reviews: product[0].reviews,
            productId: product[0]._id,
            msg: "Review created successfully"
        }

        // Push the review ID to the products's reviews array
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
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), error: "validation Error" })
    try {
        const { productId, reviewId } = req.params;
        const body = _.pick(req.body, ["body", "rating"])

        // Find the review by ID
        const product = await Product.findById(productId)
        if (!product) res.status(404).json("Product Not Found")

        const profile = await Profile.findOne({ userId: req.user.id })

        const reviewToUpdate = await Review.findOneAndUpdate({ _id: reviewId, profileId: profile._id }, body, { new: true })

        if (!reviewToUpdate) {
            return res.status(404).json({ error: "Review not found" });
        }

        const productPopulated = await Product.find({ _id: productId })
        .populate({
            path: 'reviews.reviewId',
            populate: {
                path: 'profileId',
                select: "_id userId profilePic",
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: "_id username email"
                },
            }
        })

    // return res.json({review:productPopulated[0].reviews})
    // console.log(product.reviews, "review")
    const finalResponse = {
        reviews: productPopulated[0].reviews,
        productId: productPopulated[0]._id,
        msg: "Review Updated successfully"
    }

    console.log(finalResponse);
    res.status(201).json(finalResponse);

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
        
        const profile = await Profile.findOne({ userId: req.user.id })
        
        
        // Delete the review
        const deletedReview = await Review.findOneAndDelete({ _id: reviewId, profileId: profile._id})
        await Product.findByIdAndUpdate(productId, { $pull: { reviews: { reviewId } } });

        const productPopulated = await Product.find({ _id: productId })
        .populate({
            path: 'reviews.reviewId',
            populate: {
                path: 'profileId',
                select: "_id userId profilePic",
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: "_id username email"
                },
            }
        })

    // return res.json({review:productPopulated[0].reviews})
    // console.log(product.reviews, "review")
    const finalResponse = {
        reviews: productPopulated[0].reviews,
        productId: productPopulated[0]._id,
        msg: "Review Updated successfully"
    }

    console.log(finalResponse);
    res.status(201).json(finalResponse);    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = reviewCltr