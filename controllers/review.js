const Review = require("../models/review.js");
const Listing = require("../models/listing.js");



// // Phase-3(part->a)--------------------------
const createReview = async (req,res) => {                     // Create a review for a listing
    let { id } = req.params;                                  // Since we used { mergeParams: true } in the router, req.params.id comes from the parent route /listings/:id/reviews
    const listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);                                  // Create a new Review document from form data

    newReview.author = req.user._id;                         // Associate the review with the currently logged-in user

    listing.reviews.push(newReview);                                             // Add the review's ObjectId to the listing's reviews array

    await newReview.save();                                                      // Save the review to the database
    await listing.save();                                                        // Save the updated listing with the new review

    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${id}`);                                              // Redirect back to the listing's page to show the new review
}


const destroyReview = async (req,res) => {                            // Delete a review for a listing,  Child route accessing parent route parameter `id`
    
    let { id, reviewId } = req.params;                         // Since we used { mergeParams: true } in the router, req.params.id comes from the parent route /listings/:id/reviews                         
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});                 // Remove the review's ObjectId from the listing's reviews arr   
    await Review.findByIdAndDelete(reviewId);                                          // Delete the review document from the reviews collection
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);                                                   // Redirect back to the listing page
}



//----------------------------------------------


module.exports = {createReview, destroyReview};