const Joi = require('joi');

//--------------------------------------------
// Joi schema to validate listing data from forms
// Ensures that the 'listing' object contains all required fields with proper types
//--------------------------------------------

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),          // Title must be a non-empty string
        description: Joi.string().required(),    // Description must be a non-empty string
        location: Joi.string().required(),       // Location must be a non-empty string
        country: Joi.string().required(),        // Country must be a non-empty string
        price: Joi.number().required().min(0),   // Price must be a number >= 0
        image: Joi.string().allow("", null),     // Image is optional, can be empty string or null
    }).required(),                                // The 'listing' object itself is required
});








//--------------------------------------------
// Joi schema to validate review data
// Ensures 'rating' is a number between 1-5 and 'comment' is a non-empty string
//--------------------------------------------

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),  // Rating must be 1-5
        comment: Joi.string().required()                // Comment is required
    }).required(),                                      // The 'review' object itself is required
});

//--------------------------------------------
// Export both schemas for use in route validation
//--------------------------------------------




module.exports = { listingSchema, reviewSchema };