const router = require('express').Router();
const Review = require("../models/review");
const Product = require("../models/product");
const verifyToken = require("../middlewares/verify-token");
const upload = require("../middlewares/upload-photo");

router.post('/review/productID', [verifyToken, upload.single("photo")], async (req, res) => {
    try {
        const review = new Review();
        review.headline = req.body.headline;
        review.body = req.body.body;
        review.rating = req.body.rating;
        review.photo = req.file.location;
        review.user = req.decoded._id;
        review.productID = req.params.productID;

        await Product.update({
            $push: review._id
        });

        const savedReview = await review.save();

        if (savedReview) {
            res.json({
                success: true,
                message: "Successfully Added Review"
            });
        }

    } catch (err) {
        res.status(500).json({
            success: true,
            message: err.message
        });
    }
});