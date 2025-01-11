import express from "express";
const router = express.Router();

import {
  Register,
  Login,
  googleLogin,
  dashboard,
  requestPasswordReset,
  verifyOTP,
  updatePassword,
  requestRegistrationOtp,
  githubLogin
} from "../controllers/authControllers.js";

router.post("/register", Register);
router.post("/register-otp", requestRegistrationOtp);
router.post("/login", Login);

// recovery password
router.post("/reset", requestPasswordReset);
router.post("/verifyotp", verifyOTP);
router.post("/update-password", updatePassword);

// third-party login
router.post("/google/login", googleLogin);
router.post("/github/login", githubLogin)
// router.get("/dashboard", dashboard);

export default router;
