// // Phase-3(part->a)---------------------------------------
//cloud setup
if(process.env.NODE_ENV != "production"){         // If the app is **not** running in the production environment, then load environment variables from the `.env` file using the `dotenv` package, This helps keep sensitive data (like API keys, DB passwords) out of the codebase during development
    require('dotenv').config();
}

//-----------------------------------------------------------



// // Phase-1(part->a)
//basic setup
const express = require("express");                                        // Import dependencies
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");                  // Import custom error class for handling errors
const listingRouter = require("./routes/listing.js");                     // Import route modules, Listing routes (handles all /listings routes)
const reviewRouter = require("./routes/review.js");                       // Review routes (handles reviews for specific listings)
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js"); 


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let port = 8080;
app.listen(port, () => {                                                          // Start server
    console.log(`server is listening at port no: ${port} `)
})

const dbUrl = process.env.ATLASDB_URL;
// const dbUrl = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {                                                           // Connect to MongoDB
    // await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    await mongoose.connect(dbUrl);         // establish connection with MongoDB Atlas, Connect to MongoDB using the connection string stored in the .env file
}

main()
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log(err);
    });


// app.get("/", (req, res) => {                                                    // Root route
//     res.send("hi i am root route");
// });

app.get("/", (req, res) => {
    res.redirect("/listings");
});


// // Phase-1(part->b)------------------------------------------
//Creating Boilerplate
const ejsMate = require("ejs-mate");
const { wrap } = require("module");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//-------------------------------------------------------------




// // Phase-3 (part -> d)------------------------------------

const store = MongoStore.create({
    mongoUrl: dbUrl,                                                         // MongoDB connection URL (Atlas), fetched from .env
    crypto: {
        secret: process.env.SECRET,                                         // Used to encrypt session data before saving to MongoDB
    },
    touchAfter: 24 * 3600,                               // Session will be updated only once every 24 hours (in seconds), even if accessed multiple times — helps reduce DB writes.
})

store.on("error", () => {                                                // Event listener to catch and log any store-related errors
    console.log("error in mongo session store", err);
})

//------------------------------------------------------------




// // Phase-2(part->c)---------------------------------------
const sessionOptions = {        
    store: store,                                             // Use MongoDB store for session persistence                   
    secret: process.env.SECRET,                    //Secret key used to sign session ID cookie (prevents tampering), sends a cookie named 'connect.sid' (session ID) to browser
    resave: false,                               // If true, forces session to be saved to store on every request, even if not modified,  Usually kept false to improve performance
    saveUninitialized: true,                                      // If true, saves a new but unmodified session to the store
    cookie: {                                                       // Cookie-related options that control behavior of the session ID cookie
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,              // Absolute expiration date (in ms) — here, 7 days from now cookie will be deleted from the browser
        maxAge: 7 * 24 * 60 * 60 * 1000,                           // Cookie lifespan (in ms) — also 7 days
        httpOnly: true,                                            // Makes cookie inaccessible to client-side JavaScript (security measure)
    },
};
app.use(session(sessionOptions));                                //  Setup Express session middleware — it creates a session on the server

app.use(flash());                           // Enables the use of flash messages in the app, connect-flash stores temporary messages in the session that persist for only one request.



//--------------------------------------------------------------






// // Phase-2(part->d)---------------------------------------
//configuring startegy
app.use(passport.initialize());                                       // Initialize Passport middleware for authentication
app.use(passport.session());                                          // Enable persistent login sessions (for storing user data across requests)
passport.use(new LocalStrategy(User.authenticate()));                  // Use the local strategy provided by passport-local-mongoose for authentication, User.authenticate() is a method added by the plugin to verify username and password

passport.serializeUser(User.serializeUser());                         // Serialize user data into session, determines which user data should be stored in the session 
passport.deserializeUser(User.deserializeUser());                  // Deserialize user data from the session, allows retrieving the full user details from the stored session data


app.use((req, res, next) =>{             //Phase-2(part->c) :  middleware ensures flash messages can be displayed on any page without manually passing them in res.render().
    res.locals.success = req.flash("success");           // Make 'success' flash messages available to all EJS templates, 'res.locals' allows passing variables to every rendered view.

    res.locals.error = req.flash("error");                          // Make 'error' flash messages available to all EJS templates
    res.locals.currUser = req.user || null;          // Make the currently logged-in user available in all templates as 'currUser', Passport automatically adds the logged-in user to req.user

    next();                                                              // Moves control to the next middleware or route handler.
})


//Demo user 
// app.get("/demouser", async (req, res) =>{                        // Route to create a demo (fake) user for testing
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "mukul"
//     });

//     let registeredUser = await User.register(fakeUser, "1234");        // Register user using passport-local-mongoose,  It automatically hashes the password ("1234") and saves the user to the database

//     res.send(registeredUser);                                         // Send the registered user details as a response
// })



//SignUp User-Get
app.use("/", userRouter);                                // Parent route: /, All routes defined in user.js will be prefixed with /


//---------------------------------------------------------




//listing model
// app.get("/testListing", async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute,Goa",
//         country: "India"
//     })
//     await sampleListing.save();
//     console.log("Sample was Saved");
//     res.send("successfull testing");
// })



// // Phase-2(part->b)---------------------------------------

app.use("/listings", listingRouter);                    // Parent route: /listings, All routes defined in listing.js will be prefixed with /listings
app.use("/listings/:id/reviews", reviewRouter);         // Parent route: /listings/:id/reviews, All routes defined in review.js will be prefixed with /listings/:id/reviews

//----------------------------------------------------------













// // Phase-1(part->c)----------------------------------------------
//Add ExpressError
app.use((req, res, next) => {                        // Catch-all route: runs when no other route matches, sends a 404 "Page not found!" error
    next(new ExpressError(404, "Page not found!"));
});

//custom error handling                                   
app.use((err, req, res, next) => {                                   // Custom error handling middleware 
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });            // Renders an error page (error.ejs) with the error message
    // res.status(statusCode).send(message);  // Sends a response with error's status code & message, Defaults to 500 and a generic message if not provided
})

//----------------------------------------------