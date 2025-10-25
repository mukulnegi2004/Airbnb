const express = require("express");                                              // Import Express
const router = express.Router();                                                // Create router instance
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer  = require('multer')      
const { storage } = require("../cloudConfig.js")                        
const upload = multer({ storage })                                // This means every file uploaded using this 'upload' instance will automatically be stored on Cloudinary.


// // Phase-3(part->a)--------------------------
router
    .route("/")
    .get(wrapAsync(listingController.index))                                                                    //Index route   
    .post(                                                                                                     // Create route
        isLoggedIn, 
        upload.single('listing[image]'),                       // 'upload.single("listing[image]")' handles a single file upload, Once uploaded, multer adds file info to 'req.file'
        validateListing,                                                        // validateListing -> Middleware to validate the incoming listing data using Joi schema
        wrapAsync(listingController.createListing));                        // Uses wrapAsync to automatically forward any errors to our custom error handler


        

//new route                      ->             This route must come BEFORE the show route, otherwise "/listings/new" will be treated as an ":id"
router.get("/new", isLoggedIn, listingController.renderNewForm)                          //'isLoggedIn' middleware ensures only authenticated users can access this route


router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))                                                               //Show route 
    .put(isLoggedIn,                                                                                               //update route
        isOwner,
        upload.single('listing[image]'),                     // 'upload.single("listing[image]")' handles a single file upload, Once uploaded, multer adds file info to 'req.file'
        validateListing, 
        wrapAsync(listingController.updateListing))                    
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));                                  //delete route



//------------------------------------




// // Phase-1(part->a)------------------------

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));                    // isOwner → Ensures that only the owner of the listing can edit it   


//---------------------------------------------


module.exports = router;