// components/GoogleLoginButton.js
"use client";

import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { googleLogin } from "../services/authService";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const GoogleLoginButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleGoogleLogin = async (token) => {
    try {
      const userData = await googleLogin(token);
     dispatch(loginSuccess({token:userData.token, user:userData.user}));
      const message = userData?.message || "Login successful!";
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      return userData;
    } catch (error) {
      console.error(
        "Error during Google login:",
        error.response?.data || error.message
      );
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      throw error;
    }
  };

  const handleLoginSuccess = async (response) => {
    try {
      await handleGoogleLogin(response.credential);
      router.push("/home");
    } catch (error) {
      console.error("Login process failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
    alert("Login failed. Please try again.");
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginFailure}
      useOneTap
    />
  );
};

export default GoogleLoginButton;
