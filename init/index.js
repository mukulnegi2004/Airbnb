const mongoose = require("mongoose");                                    // Import dependencies
const initData = require("./data.js");                                   // sample listings data
const Listing = require("../models/listing.js");                         // Listing model

async function main() {                                                  // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

main()
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log(err);
    })

const initDB = async () => {                                           // Initialize DB with sample data
    await Listing.deleteMany({});                                      // clear old data

    initData.data = initData.data.map((obj) => ({                        // Add a default owner ID to each sample listing object
        ...obj,                                                           // Using the spread operator (...) to copy all existing fields of each object
        owner: '68ead360cd4341a1c23d9ddc',                              // then adding a new 'owner' field with a specific user ObjectId
    }))
    await Listing.insertMany(initData.data);                           // insert sample data, Insert the modified sample data into the Listing collection
    console.log("data was initialised");
}

initDB();