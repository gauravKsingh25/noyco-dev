import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    // Basic User Information
    fullName: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      index: true,
      minlength: [1, "Username must be at least 1 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      // required: function () {
      //   return !this.isGoogleUser || !this.isGithubUser; // Password is required only for non-Google users or non-github user
      // },
      select: false,
    },
    isGoogleUser: { type: Boolean, default: false },
    isGithubUser:{ type: Boolean, default: false },
    profilePic: {
      type: String, // URL or path to image stored in Cloudinary
      default: "default-avatar.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    githubId:{ type: String,
      required: function () {
        return this.isGithubUser; 
      }
    },
    googleId: {
      type: String,
      required: function () {
        return this.isGoogleUser; 
      },
    },

    passwordResetTokenOTP: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    
  //  savedAI:String,
  //  downloadedAI:String,
  //  likedAI:Number,

    // notificationSettings: {
    //     email: Boolean,
    //     push: Boolean
    // },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash passwords before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.pre("save", function (next) {
  if (!this.isGoogleUser && !this.isGithubUser && !this.password) {
    return next(new Error("Password is required for non-Google and non-GitHub users."));
  }
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Index for search optimization
UserSchema.index({ fullName: "text", email: "text" });

export default mongoose.model("User", UserSchema);
