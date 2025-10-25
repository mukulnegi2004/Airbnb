const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");  
const { listingSchema, reviewSchema } = require('./schema.js');


const isLoggedIn = (req, res, next) => {                         // Middleware to check if a user is logged in before allowing certain actions
    console.log(req.user);                                     // Logs the currently logged-in user (stored in req.user) for debugging purposes
    if(!req.isAuthenticated()){                                  // req.isAuthenticated() is provided by Passport, Returns true if the user is logged in, false otherwise

        req.session.redirectUrl = req.originalUrl;              // Save the URL the user originally requested, So after logging in, they can be redirected back to that same page

        req.flash("error", "you must be logged in to create listing");                    // If the user is not authenticated, set an error flash message
        return res.redirect("/login");                                                    // Redirect the user to the login page
    }
    next();                                                        // If the user is logged in, allow the request to proceed to the next middleware/route
}


const saveRedirectUrl = (req, res, next) => {          // Middleware to save redirect URL in res.locals, This makes redirect URL accessible to templates or subsequent middleware
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;                  // Move redirectUrl from session to res.locals 
    }
    next();                                                // Continue to the next middleware or route handler
}


const isOwner = async (req, res, next) => {    
    let { id } = req.params;      
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){                         // Authorization Check: Compare the listing owner's ID with the currently logged-in user's ID
        req.flash("error", "You are not the owner of the listing");
        return res.redirect(`/listings/${id}`);                                      // Stop execution and redirect user back to listing page
    } 
    next();                                                                    // If the logged-in user is the owner, allow the request to proceed

}


const isReviewAuthor = async (req, res, next) => {    
    let { id, reviewId } = req.params;      
    let review = await Review.findById(reviewId);           
    if(!review.author.equals(res.locals.currUser._id)){                       // Authorization check: Compare the review's author ID with the currently logged-in user's ID                     
        req.flash("error", "You are not the author of the review");
        return res.redirect(`/listings/${id}`);                                   // Redirect back to the listing page and stop further execution                   
    }
    next();                                                                // If the current user is the author, allow the request to proceed                   
}


//--------------------------------------------
// // Phase-1(part->c)
//Validation for schema (middleware)
const validateListing = (req, res, next) => {                                     // Middleware to validate listing data before creating a new listing
    let { error } = listingSchema.validate(req.body);                             // Validate the incoming request data against the Joi schema

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");    // If validation fails, extract all error messages from Joi, Join multiple error messages into a single string

        throw new ExpressError(400, errMsg);                                      // Throw a custom ExpressError with status 400 (Bad Request) and the validation message
    } else {
        next();                                                     // If validation passes, proceed to the next middleware or route handler
    }
};
//----------------------------------------------


// // Phase-2(part->a)
//Validation for schema (middleware, server-side validation)
const validateReview = (req, res, next) => {                                   
    let { error } = reviewSchema.validate(req.body);                        

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ");   

        throw new ExpressError(400, errMsg);                         
    } else {
        next();                                                
    }
};



module.exports = {isLoggedIn, saveRedirectUrl, isOwner, validateListing, validateReview, isReviewAuthor};