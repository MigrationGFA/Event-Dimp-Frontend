import axios from "axios";
import AxiosInterceptor from "../component/AxiosInterceptor";
// Define your API endpoints
const API_URL = `${import.meta.env.VITE_API_URL}/creator`;

const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

// // Registration API call
const creatorBusInfo = async ({
  creatorId,
  ecosystemName,
  ecosystemDomain,
  targetAudienceSector,
  mainObjective,
  contact,
  address,
  ecosystemDescription,
  country,
  state,
  localGovernment,
  type,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${API_URL}/business-details`, {
      creatorId,
      ecosystemName,
      ecosystemDomain,
      targetAudienceSector,
      mainObjective,
      contact,
      address,
      ecosystemDescription,
      country,
      state,
      localGovernment,
      type
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Form Submmision Failed");
  }
};

const getBusInfo = async ({ creatorId}) => {
 
  try {
    const response = await authFetch.get(
      `${API_URL}/get-business-info/${creatorId}`
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Could not get Business Details"
    );
  }
};

// create services
const createServices = async ({
  category,
  subCategory,
  header,
  description,
  format,
  currency,
  ecosystemDomain,
  services,
  creatorId,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken, dispatch);
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/create-service`, {
      category,
      subCategory,
      header,
      description,
      format,
      currency,
      ecosystemDomain,
      services,
      creatorId,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error creating service"
      );
    }
  }
};

export default {
  creatorBusInfo,
  getBusInfo,
  createServices,
};
