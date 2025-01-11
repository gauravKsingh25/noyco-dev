import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import crypto from "crypto";
import { sendPasswordResetOTP } from "../utils/mailer.js";
import { verifyToken } from "../utils/verifyGoogleToken.js";
import {
  verifyGithubToken,
  getGithubAccessToken,
} from "../utils/githubUtils.js";
const JWT_EXPIRES_IN = "1h";

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const Register = async (req, res) => {
  try {
    const { fullName, email, password, otp } = req.body;
    console.log(req.body);
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields (fullName, email, password) are required.",
      });
    }

    // Check email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    if (password.length < 4) {
      return res
        .status(400)
        .json({ message: "Password should be at least 4 characters long." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const verified = await verifyRegisterOtp(email, otp);
    console.log(verified);

    const newUser = new User({
      fullName: capitalizeWords(fullName), // Capitalize the full name
      email,
      password,
    });

    if (verified.success) {
      await newUser.save();
    } else {
      console.log(verified);
      return res.status(400).json({
        message: verified.message,
      });
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
    res.status(201).json({
      token: token,
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
      },
      message: "Registration successful! Welcome to Noyco.",
    });
  } catch (err) {
    console.error("Error during registration:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already registered." });
    }
    res.status(500).json({
      message: "Error signing up. Please try again later.",
      error: err.message || "Unknown error",
    });
  }
};

// User login controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    // const existingUser = await User.findOne({ email });
    if (user && (user.isGoogleUser || user.isGithubUser) && !user.password) {
      return res.status(401).json({
        message:
          "You have logged via third-party. Please reset a password to continue.",
      });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      token: token,
      user: await User.findOne({ email }),
      message: "Login successful! Welcome back.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging in." });
  }
};

// RegisterOTPGeneratetor

export const requestRegistrationOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already registered. Please log in." });
    }

    const otpCode = generateOTP();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

    const existingOtp = await OTP.findOne({ email });
    if (existingOtp) {
      existingOtp.otp = otpCode;
      existingOtp.expiry = expiryTime;
      await existingOtp.save();
    } else {
      const newOtp = new OTP({
        email,
        otp: otpCode,
        expiry: expiryTime,
      });
      await newOtp.save();
    }

    try {
      await sendPasswordResetOTP(email, otpCode);
    } catch (emailError) {
      console.error("Error sending OTP email:", emailError);
      return res.status(500).json({ message: "Error sending OTP email." });
    }

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Error requesting OTP:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

// Controller to request password reset

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // if (!emailRegex.test(email)) {
  //   return res.status(400).json({ message: "Invalid email format." });
  // }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    const otp = generateOTP();
    user.passwordResetTokenOTP = otp;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    try {
      await sendPasswordResetOTP(email, otp);
    } catch (emailError) {
      console.error(emailError);
      return res.status(500).json({ message: "Error sending OTP email." });
    }

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating OTP." });
  }
};

// verify Register-User OTP
const verifyRegisterOtp = async (email, otp) => {
  try {
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return {
        success: false,
        status: 404,
        message: "No OTP found for this email. Please request a new one.",
      };
    }

    if (new Date() > otpRecord.expiry) {
      return {
        success: false,
        status: 400,
        message: "OTP has expired. Please request a new one.",
      };
    }

    if (otpRecord.otp !== otp) {
      return {
        success: false,
        status: 400,
        message: "Invalid OTP. Please try again.",
      };
    }

    return {
      success: true,
      status: 200,
      message: "OTP verified successfully.",
    };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      status: 500,
      message: "An error occurred while verifying the OTP.",
    };
  }
};

// verify forgot-password OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (
      user.passwordResetTokenOTP !== otp ||
      Date.now() > user.passwordResetExpires
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying OTP." });
  }
};

// password update Controller

export const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.password = password;
    user.passwordResetTokenOTP = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating password." });
  }
};

// Google oAuth controllers
export const googleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const userData = await verifyToken(token);

    if (!userData) {
      return res
        .status(400)
        .json({ message: "Invalid token or token expired" });
    }
    let user = await User.findOne({
      $or: [{ googleId: userData.sub }, { email: userData.email }],
    });

    if (!user) {
      user = new User({
        googleId: userData.sub,
        fullName: userData.name,
        email: userData.email,
        profilePic: userData.picture,
        isGoogleUser: true,
      });
      await user.save();

      // return res.json({
      //   message: "Login successful. New user created.",
      //   user: {
      //     fullName: user.fullName,
      //     email: user.email,
      //     profilePic: user.profilePic,
      //   },
      // });
    } else {
      user.profilePic = userData.picture;

      await user.save();

      // return res.json({
      //   message: "Login successful. Existing user found.",
      //   user: {
      //     fullName: user.fullName,
      //     email: user.email,
      //     profilePic: user.profilePic,
      //   },
      // });
    }

    const token2 = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    const tempEmail = user.email;
    res.status(200).json({
      token: token2,
      user: await User.findOne({ email: tempEmail }),
      message: "Login successful! Welcome back.",
    });
  } catch (error) {
    console.error(error);

    // Check for specific errors
    if (error.name === "JsonWebTokenError") {
      return res
        .status(400)
        .json({ message: "Invalid token. Please provide a valid token." });
    }

    // Default error response
    return res.status(500).json({
      message: "Google login failed. Please try again later.",
      error: error.message,
    });
  }
};

// Update the path based on your project structure
// // Create a utility to verify GitHub tokens

export const githubLogin = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const accessToken = await getGithubAccessToken(code);

    const userData = await verifyGithubToken(accessToken);
    if (!userData) {
      return res
        .status(400)
        .json({ message: "Invalid token or token expired" });
    }

    let user = await User.findOne({
      $or: [{ githubId: userData.data.id }, { email: userData.email[0].email }],
    });

    if (!user) {
      user = new User({
        githubId: userData.data.id,
        fullName: userData.data.name || userData.data.login, // Use `login` as fallback
        email: userData.email[0].email,
        profilePic: userData.data.avatar_url,
        isGithubUser: true,
      });

      await user.save();
    } else {
      user.profilePic = userData.data.avatar_url;
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    return res.status(200).json({
      token: token,
      user: {
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
      message: "Login successful! Welcome back.",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "JsonWebTokenError") {
      return res
        .status(400)
        .json({ message: "Invalid token. Please provide a valid token." });
    }

    return res.status(500).json({
      message: "GitHub login failed. Please try again later.",
      error: error.message,
    });
  }
};

export const dashboard = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json(req.session.user);
};
