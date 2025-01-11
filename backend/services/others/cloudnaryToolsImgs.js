import path from 'path';
import { cloudinary } from '../../config/cloudinaryConfig.js';
import fs from 'fs';

export const uploadImageToCloudinary = async (imageName) => {
  try {
   
    const imagePath = path.join("E:/Office/Noyco/dev_repo/noyco/backend", 'screenshots', imageName);

 
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'NoycoTools',
    });

  
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
