import mongoose from 'mongoose';

const { Schema } = mongoose;

const FAiSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
   link: {
    type: String,
    required: [true, 'Link is required'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  pricing: {
    type: String,
    required: [true, 'Pricing is required'],
    
  },

 
});

const FAi = mongoose.model('FAi', FAiSchema);

export default FAi;
