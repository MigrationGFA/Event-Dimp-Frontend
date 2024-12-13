import axios from 'axios';


// Define your API endpoints

const API_URL = `${import.meta.env.VITE_API_URL}`;

const submitBooking = async ({
    ecosystemDomain,
    name,
    email,
    phone,
    address,
    location,
    service,
    date,
    time,
    price,
    description,
    bookingType,

}) => {
    try {
      const response = await axios.post(
        `${API_URL}/create-booking`,
        {
    ecosystemDomain,
    name,
    email,
    phone,
    address,
    location,
    service,
    date,
    time,
    price,
    description,
    bookingType
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error creating booking "
      );
    }
  };


export default {
  submitBooking
};