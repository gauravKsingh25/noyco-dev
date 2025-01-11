"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { register, sendRegisterOtp } from "@/services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import AuthPoster from "@/app/components/authPoster";
import Google from "../../../utils/oAuthGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GitHubLoginButton from "@/utils/oAuthgithub";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  const handleSendRegisterOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validatePassword()) {
      return;
    }

    dispatch(registerStart());
    try {
      const userData = await sendRegisterOtp(email);
      const message = userData?.message || "Opt sent";
      console.log(message);
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
      setStep(2);
      // dispatch(registerSuccess(userData));
      // router.push("/auth/login"); // Redirect to home page after successful registration
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        error ||
        "Error in registration!";
      console.log(message);
      dispatch(registerFailure(message));
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
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      return;
    }
    setLoading(true);
    dispatch(registerStart());
    try {
      const userData = await register({ email, password, fullName, otp });
      const message = userData?.message || "Registration Succesful!";
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
      dispatch(registerSuccess(userData));
      router.push("/auth/login"); // Redirect to home page after successful registration
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Error in registration!";
      dispatch(registerFailure(message));
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
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
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
      return false;
    } else {
      return true;
    }
  };

  const handleNavigationLogin = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <div
        className="flex flex-col md:flex-row h-full"
        style={{ overflow: "hidden", maxHeight: "100vh" }}
      >
        <div className="hidden md:flex w-full md:w-1/2 h-full">
          <AuthPoster />
        </div>

        <div
          className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-8"
          style={{ maxHeight: "100vh", overflow: "hidden" }}
        >
          <div className="mb-8">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv1Tt9_33HyVMm_ZakYQy-UgsLjE00biEArg&s"
              alt="Logo"
              className="w-16 h-auto mx-auto rounded-full"
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {step == 1 && "Register"}
              {step == 2 && "Enter OTP"}
            </h1>
            <p className="text-gray-600 mt-2">
              Automate tasks and boost efficiency.
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSendRegisterOtp} className="w-full max-w-md">
              <div className="mb-6">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6 relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-loginBtn-800 text-white  hover:bg-loginBtn-900 text-white font-semibold rounded-md  focus:outline-none disabled:bg-gray-300 transition-all"
              >
                {loading ? "Loading..." : "Sign up"}
              </button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleRegister} className="w-full max-w-md">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter your OTP"
                className="w-full p-3 rounded-lg mb-6 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-loginBtn-800 text-white  hover:bg-loginBtn-900 text-white font-semibold rounded-md  focus:outline-none disabled:bg-gray-300 transition-all"
              >
                {loading ? "Verifying..." : "Enter OTP"}
              </button>
            </form>
          )}

          <div className="flex flex-col items-center justify-center  w-full max-w-md mt-4 text-sm text-gray-500">
            <div className="cursor-pointer underline text-blue-600 hover:text-gray-500">
              <div onClick={handleNavigationLogin}>Have an account?</div>
            </div>
          </div>

          {/* OAuth Login */}
          <div className="mt-4">
            <GoogleOAuthProvider clientId={clientId}>
              <Google />
            </GoogleOAuthProvider>
          </div>
          <div className="mt-4">
          <GitHubLoginButton/>
        </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
