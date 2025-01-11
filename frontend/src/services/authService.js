import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_PORT
// const API_URL = "http://localhost:5000";

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    ...credentials,
  });
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, {
    ...userData,
  });
  return response.data;
};

export const sendRegisterOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register-otp`, { email });
    
    return response.data; // Return the response data to the calling function
  } catch (error) {
    console.log(error)
    throw error.response?.data.message || "An error occurred while sending OTP."; // Handle and rethrow errors
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/reset`, { email });
    
    return response.data; // Return the response data to the calling function
  } catch (error) {
    console.log(error)
    throw error.response?.data.message || "An error occurred while sending OTP."; // Handle and rethrow errors
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/verifyotp`, { email, otp });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error.response?.data.message)
    throw error.response?.data.message || "Invalid OTP. Please try again.";
  }
};

export const resetPassword = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/update-password`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "An error occurred. Please try again.";
  }
};

export const googleLogin = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_PORT}/api/auth/google/login`,
      { token },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data.message || "An error occurred. Please try again.";
  }
};

export const githubLogin = async (code) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_PORT}/api/auth/github/login`,
      { code },
      { withCredentials: true }
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    throw error.response?.data.message || "An error occurred during GitHub login. Please try again.";
  }
};
