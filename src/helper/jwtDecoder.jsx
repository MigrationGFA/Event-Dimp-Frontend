import { jwtDecode } from "jwt-decode";

// export const isTokenExpired = (token) => {
//   if (!token) return true;

//   const decoded = jwtDecode(token);
//   console.log("this is decoded", decoded);
//   const currentTime = Date.now() / 1000;
//   return decoded.exp < currentTime;
// };

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If decoding fails, consider the token expired
  }
};
