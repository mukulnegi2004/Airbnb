const mongoose = require("mongoose");  

const reviewSchema = new mongoose.Schema({                                      // Define schema for 'Review' collection
    comment: String,                                                            // Review text/comment
    rating: {                                                                    // Rating field (1 to 5)
        type: Number,
        min: 1, 
        max: 5
    },
    createdAt: {                                                                 // Auto-set creation date
        type: Date,
        default: Date.now()
    },
    author:{                                                                   // Reference to the user who wrote the review
        type: mongoose.Schema.Types.ObjectId,                                 // Stores the ObjectId of the User                       
        ref: "User",                                                               // Reference the User model for population
    }
})

const Review = mongoose.model("Review", reviewSchema);                        // Create model for 'reviews' collection      
module.exports = Review;                                          