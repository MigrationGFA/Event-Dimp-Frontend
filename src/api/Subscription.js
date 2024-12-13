import axios from 'axios';
import AxiosInterceptor from "../component/AxiosInterceptor"

// Define your API endpoints
const API_URL = `${import.meta.env.VITE_API_URL}/payment`;

const PLAIN_API_URL =  `${import.meta.env.VITE_API_URL}`;

const creatorFreeSubscribtion = async ({
  creatorId, 
  planType, 
  sizeLimit, 
  interval, 
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${API_URL}/free-subscription`,
      {
        creatorId, 
        planType, 
        sizeLimit, 
        interval, 
        ecosystemDomain,
      }
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.message || "Error creating domain name"
      );
    }
  }
};

export default {
    creatorFreeSubscribtion
}