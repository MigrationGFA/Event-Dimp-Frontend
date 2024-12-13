import axios from "axios";
import { updateAccessToken } from "../features/authentication"; 

// Define your API endpoints

const API_URL = `${import.meta.env.VITE_API_URL}/creator`;
const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;


// Registration API call
const creatorRegister = async ({
  fullName,
  email,
  password,
  phoneNumber,
  gender,
  dateOfBirth,
  role,
  refCode,
  organizationName,
}) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      fullName,
      email,
      password,
      phoneNumber,
      gender,
      dateOfBirth,
      role,
      refCode,
      organizationName,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorVerifyToken = async ({ email, OTP }) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, {
      email,
      OTP,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
const creatorResendVerifyToken = async ({ email, phoneNumber }) => {
  try {
    const response = await axios.post(`${API_URL}/resend-otp`, {
      email,
      phoneNumber,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

//affiliateLogin
const affiliateLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(`${PLAIN_API_URL}/affiliate/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "SignIn failed");
  }
};

const emailLogin = async ({email}) => {
  try {
    const response = await axios.get(`${PLAIN_API_URL}/gfa-creator-login/${email}`,
      {}
    );
    return response; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const creatorForgetPassword = async ({email}) => {
  try {
    const response = await axios.post(`${API_URL}/forgot/password`, {
      email
    });
    return response; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const creatorResetPassword = async ({email, password}) => {
  try {
    const response = await axios.patch(`${API_URL}/reset/password`, {
      email,
      password
    });
    console.log("response for reset", response);
    return response; 
  } catch (error) {
    console.log("error for reset",error.response)
    throw new Error(error.response?.data?.data?.message || 'Password reset failed');
  }
};

const creatorResetPasswordOtp = async ({email, OTP}) => {
  try {
    const response = await axios.post(`${API_URL}/verify-reset-otp`, {
      email,
      OTP
    });
    return response; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};



export const refreshAccessToken = async (refreshToken, dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, { 
      creatorToken: refreshToken 
    });
    const { accessToken } = response.data;

    console.log("this is the new access token", accessToken)

    if (accessToken) {
      console.log("this is here 12")
      dispatch(updateAccessToken(accessToken)); 
      console.log("this is here 13")
      return accessToken;
    }
  } catch (error) {
    console.error("Failed to refresh token", error);
  }
  return null;
};


export default {
  creatorRegister,
  creatorVerifyToken,
  creatorLogin,
  affiliateLogin,
  // creatorLogin, 
  creatorResendVerifyToken,
  creatorForgetPassword,
  creatorResetPassword,
  emailLogin,
  creatorResetPasswordOtp,
  refreshAccessToken
};
