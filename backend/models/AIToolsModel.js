import mongoose from "mongoose";

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 1000,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const AIProsConsSchema = new Schema({
  generated_by: {
    type: String,
    enum: ["LLM", "manual"],
    required: true,
    default: "LLM",
  },
  pros: [{ type: String, trim: true, }],
  cons: [{ type: String, trim: true, }],
  generated_at: { type: Date, default: Date.now },
});

const AlternativesSchema = new Schema({
  generation_method: {
    type: String,
    enum: ["LLM", "manual"],
    required: true,
    default: "LLM",
  },
  tool_ids: [{ type: Schema.Types.ObjectId, ref: "AITool" }],
  generated_at: { type: Date, default: Date.now },
});

const AIToolSchema = new Schema({
  name: {
    type: String,
    required: [true, "Tool name is required"],
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "Tool description is required"],
    trim: true,
    minlength: 10,
   
  },
  logo_url: {
    type: String,
    required: [true, "Logo URL is required"],
    trim: true,
    default:
      "https://cbbstwltufvzpsqvnahz.supabase.co/storage/v1/object/public/avatars/public/logoipsum.png",
  },
  img_url: {
    type: String,
    trim: true,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png",
  },
  categories: [
    {
      type: String,
      required: true,
      trim: true,
      // minlength: 1,
      // maxlength: 200,
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
      // minlength: 1,
      // maxlength: 200,
    },
  ],
  created_at: { type: Date, default: Date.now },
  popularity_score: {
    type: Number,
    default: 0,
    min: 0,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  likes_noyco: {
    type: Number,
    default: 0,
    min: 0,
  },
  rating_noyco: {
    type: Number,
    default: 0,
  },
  saved: {
    type: Number,
    default: 0,
    min: 0,
  },
  saved_noyco: {
    type: Number,
    default: 0,
    min: 0,
  },
  pricing: {
    type: String,
    required: true,
    // enum: ['free', 'freemium', 'paid'],
    default: "freemium",
  },
  website_url: {
    type: String,
    required: [true, "Website URL is required"],
    trim: true,
  },
  submitted_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    default: new mongoose.Types.ObjectId("6773b464369514be9b03938f"), 
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "approved",
  },
  // reviews: [ReviewSchema],
  alternatives: {
    type: AlternativesSchema,
    default: null,
  },
  pros_cons: {
    type: AIProsConsSchema,
    default: null,
  },
});

export const AITool = mongoose.model("AITool", AIToolSchema);
