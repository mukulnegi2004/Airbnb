const Listing = require("../models/listing.js");

// // Phase-3(part->b)--------------------------
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');                         // Import the Mapbox Geocoding service from the Mapbox SDK
const mapToken = process.env.MAP_TOKEN;                                                         // Retrieve the Mapbox API token from environment variables
const geocodingClient = mbxGeocoding({ accessToken: mapToken });          // Create a new Mapbox Geocoding client using the access token

//-----------------------------------------------




// // Phase-3(part->a)--------------------------
const index = async (req, res) => {                                                                  // Show all listings
    let {destination} = req.query;
    
    if(destination){                                                            // if search happen
        const allListings = await Listing.find({$or : [
            { location: { $regex: destination, $options: "i" } },
            { country: { $regex: destination, $options: "i" } }]});

        if (allListings.length === 0) {
            req.flash("error", "No listings found!");
            return res.redirect("/listings");
        }
        return res.render("listings/index.ejs", { allListings });
    }else{                                                                   
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
    }
        
}


const renderNewForm = (req, res) => {                                                           // Form to create a new listing 
    res.render("listings/new.ejs");
}


const showListing = async (req, res) => {                                                     // Show details for one listing (by id)
    let { id } = req.params;
    const listing = await Listing.findById(id)                                                      // Find the listing by its ID
        .populate({
            path: "reviews",                                                                         // Populate the 'reviews' array
            populate: { path: "author" },                                                            // Also populate the 'author' of each review
        })
        .populate("owner");                                                                             // Replace owner ObjectId with full User document

    if (!listing) {                                                                         // If no listing is found with the given ID
        req.flash("error", "Listing you requested for does not exist!");                  // Set an error flash message to notify the user
        return res.redirect("/listings");                    // Redirect back to the listings index page, 'return' ensures function stops here and does NOT continue to res.render()
    }

    res.render("listings/show.ejs", { listing })
}


const createListing = async (req, res, next) => {                                // Add a new listing to DB, Triggered when the form from "new.ejs" is submitted

    let response = await geocodingClient                                     // Use Mapbox Geocoding client to convert the user-provided location into coordinates
        .forwardGeocode({                                                    // forwardGeocode converts a place name/address into [longitude, latitude]
            query: req.body.listing.location,                                // The location string entered by the user in the form
            limit: 1                                                         // Limit results to the most relevant match
        })
        .send();                                                             // Send the request to Mapbox API

    console.log(response.body.features[0].geometry);                          // Log the coordinates (longitude, latitude) returned by Mapbox


    let url = req.file.path;                                                 // Get the URL of the uploaded image from Cloudinary (provided by multer-storage-cloudinary)
    let filename = req.file.filename;                                        // Get the filename of the uploaded image from Cloudinary


    const newListing = new Listing(req.body.listing);                        // If validation passes, create a new Listing using the validated data
    newListing.owner = req.user._id;           // Associate the logged-in user as the owner of the new listing, req.user is provided by Passport after successful authentication
    newListing.image = { url, filename };                                         // Store the uploaded image information (URL + filename) in the listing document
    newListing.geometry = response.body.features[0].geometry;                     // Store the coordinates returned from Mapbox in the listing's geometry field
    let savedListing = await newListing.save();                                                     // Save the new listing to the database
    console.log(savedListing);

    req.flash("success", "New Listing Created!");           // Sets a temporary flash message with key "success", message will be stored in session and displayed on the next page load
    res.redirect("/listings");                                               // Flash message (set above) will now be accessible on that redirected page
}


const renderEditForm = async (req, res) => {                                // Show edit form,      
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {                                                                         // If no listing is found with the given ID
        req.flash("error", "Listing you requested for does not exist!");                  // Set an error flash message to notify the user
        return res.redirect("/listings");                    // Redirect back to the listings index page, 'return' ensures function stops here and does NOT continue to res.render()
    }

    let originalImageUrl = listing.image.url;                                     // Get the URL of the current image for display in the edit form
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_150,w_250");        // This uses Cloudinary's URL transformation feature for faster loading in the form, Modify the URL to request a smaller version of the image (height = 150px, width = 250px)

    res.render("listings/edit.ejs", { listing, originalImageUrl })             // If the listing exists, render the edit form template, provide image URL to display a smaller preview

}


const updateListing = async (req, res) => {                                                      // Update listing
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });        // Update the listing document in MongoDB with the new data from the form (req.body.listing), Using spread operator to copy all fields from the form into the document

    if (typeof req.file !== "undefined") {                                       // Check if a new image file was uploaded via the form
        let url = req.file.path;                                                 // Get the URL of the uploaded image from Cloudinary (provided by multer-storage-cloudinary)
        let filename = req.file.filename;                                        // Get the filename of the uploaded image from Cloudinary
        listing.image = { url, filename };                                       // Update the listing's image field with the new URL and filename
        await listing.save();                                                    // Save the updated listing document to the database
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
}


const destroyListing = async (req, res) => {                                                     // Delete listing
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}




//----------------------------------------------



module.exports = { index, renderNewForm, showListing, createListing, renderEditForm, updateListing, destroyListing };
























