// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";
// import dotenv from "dotenv";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// const FAiStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "FAiStorage",
//       allowed_formats: ["jpg", "png"],
//     },
//   });


//   const FAiParser = multer({storage: FAiStorage})
//   export {FAiParser}

import pkg from "cloudinary"; // Import the CommonJS module
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Extract `v2` from the default export of the `cloudinary` package
const { v2: cloudinary } = pkg;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary Storage
const FAiStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "FAiStorage",
    allowed_formats: ["jpg", "png"], // Restrict to specific formats
  },
});

// Set up Multer with Cloudinary Storage
const FAiParser = multer({ storage: FAiStorage });

// Export the Multer parser
export { FAiParser };
