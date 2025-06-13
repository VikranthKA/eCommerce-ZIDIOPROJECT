require('dotenv').config();
const cloudinary  = require('cloudinary').v2;

const { CLOUD_NAME, CLOUD_API_SECRET, CLOUD_API_KEY } = process.env;
//cloudinary for images
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: CLOUD_API_KEY, 
  api_secret: CLOUD_API_SECRET 
});


module.exports = cloudinary;



// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
