const User = require("../models/user.js");



// // Phase-3(part->a)--------------------------
const renderSignupForm =  (req, res) => {                                     
    res.render("users/signup.ejs");                                           // Render the 'signup.ejs' template inside 'users' folder
}


const signup = async (req, res) => {                                  
    try {
        let { username, email, password } = req.body;                                   // Destructure the username, email, and password from the request body
        const newUser = new User({ email, username });                                  // Create a new User instance (but do not save password yet)
        const registeredUser = await User.register(newUser, password);        // Register the new user with the password using Passport's 'register' method, This method will hash the password and save the user in the data
        console.log(registeredUser);                                          // Log the newly registered user to the console for debugging

        req.logIn(registeredUser, (err) => {                                  // Automatically log in the user after successful signup               
            if(err){                                                                      
                return next(err);                                              // If there is an error during login, pass it to the next error handler     
            }
            req.flash("success", "Welcome to Wanderlust")                         // Set a success flash message to greet the user
            res.redirect("/listings");                                             // Redirect the user to the listings page after successful signup
        })

        
    } catch (e) {
        req.flash("error", e.message);                                         // If there is an error (e.g., user already exists), set an error flash message
        res.redirect("/signup")                                                // Redirect back to the signup page so the user can try again
    }

}


const renderLoginForm =  (req, res) => {                                   
    res.render("users/login.ejs");                                       // Render the 'login.ejs' template inside 'users' folder
}


const login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");                                     // If authentication succeeds, set a success flash message

    let redirectUrl = res.locals.redirectUrl || "/listings";         // Redirect the user to their originally requested page (if any) Otherwise, default to the /listings page
    res.redirect(redirectUrl);  

}


const logout =  (req, res, next) => {                   
    req.logOut((err) => {                                       // Passport's logOut() method terminates the user's session, Accepts a callback to handle potential errors
        if(err){                                              
            return next(err);                                   // If an error occurs during logout, pass it to the next error handler
        }
        req.flash("success", "You are logged out!");                // Set a success flash message to inform the user they have logged out
        res.redirect("/listings");

    })
}



//----------------------------------------------


module.exports = { renderSignupForm, signup, renderLoginForm, login, logout }; 