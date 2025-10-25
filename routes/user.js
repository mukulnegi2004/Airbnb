const express = require("express");                                                  // Import Express
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");



// // Phase-3(part->a)--------------------------
router
    .route("/signup")
    .get(userController.renderSignupForm)                                                     // Route to display the signup form
    .post(wrapAsync(userController.signup));                                                  // Route to handle signup form submission


router
    .route("/login")
    .get(userController.renderLoginForm)                                                       // Route to display the login form
    .post(                                                                                    // Route to handle login form submission
        saveRedirectUrl,            // Middleware that checks if there's a saved redirect URL (from session), and stores it in res.locals.redirectUrl for use after successful login  
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),          // Use Passport's 'local' strategy to authenticate the user, If authentication fails, redirect back to /login and show a flash message
        userController.login
    );


//--------------------------------------------



//logout
router.get("/logout", userController.logout)                                // Route to log the user out of the application


module.exports = router;