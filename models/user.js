const mongoose = require("mongoose");  
const passportLocalMongoose = require("passport-local-mongoose");                    // Import passport-local-mongoose plugin for handling username/password authentication

const userSchema = new mongoose.Schema({                                            // Define a Mongoose schema for the User model                                
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);             // Add (plugin) passport-local-mongoose to userSchema, This plugin automatically adds username, hash, and salt fields to store user credentials securely, It also provides convenient methods like register(), authenticate(), serializeUser(), etc.

const User = mongoose.model("User", userSchema);                        
module.exports = User;                                          