const express = require("express");                                              // Import Express
const router = express.Router({ mergeParams : true});     // Using mergeParams: true allows this child router to access parameters from its parent route.                               
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");


const reviewController = require("../controllers/review.js");

//Create reviews route (step-2)
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));             // Child route accessing parent route parameter `id`,  isLoggedIn → Only logged-in users can submit reviews


// Deleting reviews route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));           // isReviewAuthor → Ensures only the author of the review can delete it





module.exports = router;