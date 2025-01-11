// components/GitHubLoginButton.js
"use client";

import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { githubLogin } from "../services/authService";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const GitHubLoginButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGitHubLogin = async (code) => {
    try {
      const userData = await githubLogin(code);
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
      router.push("/home");
  
    } catch (error) {
      console.error(
        "Error during GitHub login:",
        error
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

  const handleLogin = () => {
    const redirectUri = "http://localhost:3000/auth/login";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user:email`;

    window.location.href = githubAuthUrl;
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      (async () => {
        try {
          await handleGitHubLogin(code);
          router.push("/home");
        } catch (error) {
          console.error("Login process failed:", error);
          alert("Login failed. Please try again.");
        }
      })();
    }
  }, []);

  return (
   

  
  <button
      onClick={handleLogin}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #D1D5DB',
        backgroundColor: 'white',
        color: '#1F2937',
        padding: '8px 18px',
        fontWeight: 600,
        borderRadius: '0.375rem',
        transition: 'background-color 0.3s ease',
        width: 'auto',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#F3F4F6')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
    >
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        style={{ marginRight: '12px' }}
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.537 2.29 6.53 5.47 7.59.4.073.547-.17.547-.38 0-.188-.007-.677-.011-1.327-2.221.478-2.768-.577-2.768-.577-.37-.93-.902-1.179-.902-1.179-.738-.505.056-.494.056-.494.817.058 1.247.838 1.247.838.724 1.235 1.898.878 2.361.672.074-.523.283-.878.507-1.079-1.777-.202-3.635-.89-3.635-3.94 0-.869.313-1.577.828-2.133-.083-.202-.358-.57-.085-1.209 0 0 1.053-.338 3.448 1.285 1.007-.28 2.084-.421 3.15-.426 1.065.005 2.143.145 3.15.426 2.395-1.623 3.448-1.285 3.448-1.285-.274.639-.001 1.007-.085 1.209.515.556.828 1.264.828 2.133 0 3.051-1.859 3.738-3.636 3.94.225.201.433.595.433 1.194 0 .866-.01 1.565-.01 1.775 0 .211.146.454.548.377 3.18-1.065 5.47-4.053 5.47-7.59 0-4.42-3.58-8-8-8z" />
      </svg>
      Login with GitHub
    </button>
  
  
  
  
  
  );
};

export default GitHubLoginButton;
