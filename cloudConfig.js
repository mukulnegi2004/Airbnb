const cloudinary = require('cloudinary').v2;                                  // cloudinary → Official SDK to interact with Cloudinary's image/video cloud service
const { CloudinaryStorage } = require('multer-storage-cloudinary');            // CloudinaryStorage → A Multer storage engine that allows direct uploads to Cloudinary


//Cloudinary Configuration, The `config()` method connects your app to your Cloudinary account, using credentials stored in environment variables (for security reasons).
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,                                               // Cloudinary account name
    api_key: process.env.CLOUD_API_KEY,                                               // Cloudinary API key (public identifier)
    api_secret: process.env.CLOUD_API_SECRET                                          // Cloudinary API secret (keep this private)
});


//Multer Storage Configuration, Multer handles multipart/form-data (used for file uploads in forms), CloudinaryStorage tells Multer to upload files directly to Cloudinary instead of local storage.
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,                                                             // Link Cloudinary account
    params: {
        folder: 'wanderlust_DEV',                                                       // Folder name in Cloudinary where files will be stored
    },
});


module.exports = { cloudinary, storage };


