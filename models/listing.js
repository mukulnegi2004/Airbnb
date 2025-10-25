const mongoose = require("mongoose");                                   // Import mongoose
const Review = require("./review");
const User = require("./user");

const listingSchema = new mongoose.Schema({                            // Define schema for listings
    title: {
        type: String,
        required: true,                                                  // title must be provided
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [                                                                   // Array of review references associated with this listing
        {
            type: mongoose.Schema.Types.ObjectId,                                     // Each review stores ObjectId of a Review document
            ref: "Review",                                                               // Reference to the Review model
        }
    ],
    owner: {                                                                       // Owner of the listing (User who created it)
        type: mongoose.Schema.Types.ObjectId,                                        // Stores ObjectId of a User
        ref: "User",                                                                     // References the User model
    },
    geometry: {
        type: {
            type: String,                                     // The data type for the geometry. Must be a string.
            enum: ['Point'],                                  // Restrict the value to 'Point' only (GeoJSON standard for a single point)
            required: true                                    // This field is mandatory
        },
        coordinates: {
            type: [Number],                                   // An array of numbers: [longitude, latitude]
            required: true                                    // Coordinates are required to place the point on the map
        }
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {                       //middleware, After a listing is deleted, remove all associated reviews from the reviews collection
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});                        // Delete all reviews whose _id is in the deleted listing's reviews array
    }
})

const Listing = mongoose.model("listing", listingSchema);                // Create model
module.exports = Listing;                                               // Export model