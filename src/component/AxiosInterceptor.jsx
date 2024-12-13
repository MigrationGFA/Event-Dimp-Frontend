import axios from "axios";
import api from "../api/authApis";

// const AxiosInterceptor = (accessToken, refreshToken) => {
//   const authFetch = axios.create({
//     withCredentials: true,
//   });

//   authFetch.interceptors.request.use(
//     (config) => {
//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }

//       if (refreshToken) {
//         config.headers["Refresh-Token"] = `Bearer ${refreshToken}`;
//       }

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   authFetch.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response.status === 401) {
//         // Handle the error (e.g., return specific error type)
//         return Promise.reject({ ...error, isTokenExpired: true });
//       }
//       return Promise.reject(error);
//     }
//   );

//   return authFetch;
// };

// export default AxiosInterceptor;

// const AxiosInterceptor = (accessToken, refreshToken, dispatch, navigate) => {
//   const authFetch = axios.create({
//     withCredentials: true,
//   });

//   authFetch.interceptors.request.use(
//     (config) => {
//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   authFetch.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       if (
//         error.response &&
//         error.response.status === 401 &&
//         !originalRequest._retry
//       ) {
//         originalRequest._retry = true;

//         const tokenRefreshed = await api.refreshAccessToken(
//           refreshToken,
//           dispatch
//         );
//         console.log("this is inner ref 1");
//         if (tokenRefreshed) {
//           console.log("this is inner ref 2");
//           // Retry the original request with the new token
//           originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//           return authFetch(originalRequest);
//         } else {
//           // Navigate to login page if refreshing the token fails
//           navigate("/auth/login");
//         }
//       }

//       return Promise.reject(error);
//     }
//   );

//   return authFetch;
// };

// const AxiosInterceptor = (accessToken, refreshToken, dispatch, navigate) => {
//   const authFetch = axios.create({
//     withCredentials: true,
//   });

//   // Request Interceptor
//   authFetch.interceptors.request.use(
//     (config) => {
//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Response Interceptor
//   authFetch.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       if (
//         error.response &&
//         error.response.status === 401 &&
//         !originalRequest._retry
//       ) {
//         originalRequest._retry = true; // Mark the request as retried

//         if (!isRefreshing) {
//           isRefreshing = true;

//           try {
//             const newAccessToken = await api.refreshAccessToken(
//               refreshToken,
//               dispatch
//             );

//             if (newAccessToken) {
//               onRrefreshed(newAccessToken);
//               isRefreshing = false;
//               return authFetch(originalRequest); // Retry the failed request
//             } else {
//               navigate("/auth/login"); // Navigate to login if refresh fails
//             }
//           } catch (refreshError) {
//             console.error("Token refresh failed", refreshError);
//             navigate("/auth/login");
//           }
//         }

//         return new Promise((resolve) => {
//           addSubscriber((newToken) => {
//             // Retry the original request with the new token
//             originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//             resolve(authFetch(originalRequest));
//           });
//         });
//       }

//       return Promise.reject(error);
//     }
//   );

//   return authFetch;
// };

let isRefreshing = false; // Tracks if a token refresh is in progress
let refreshSubscribers = []; // Queue to store pending requests while token is refreshing

// Notify all subscribers with the new token
function onRefreshed(newToken) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = []; // Clear the queue
}

// Add a request to the queue
function addSubscriber(callback) {
  refreshSubscribers.push(callback);
}

const AxiosInterceptor = (accessToken, refreshToken, dispatch, navigate) => {
  const authFetch = axios.create({
    withCredentials: true,
  });

  // Request Interceptor
  authFetch.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  authFetch.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // Mark the request as retried

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const newAccessToken = await api.refreshAccessToken(
              refreshToken,
              dispatch
            );

            if (newAccessToken) {
              isRefreshing = false;
              onRefreshed(newAccessToken); // Notify all queued requests
              return authFetch({
                ...originalRequest,
                headers: {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${newAccessToken}`, // Attach the new token
                },
              });
            } else {
              navigate("/auth/login"); // Navigate to login if refresh fails
            }
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
            isRefreshing = false;
            navigate("/auth/login");
          }
        }

        return new Promise((resolve) => {
          addSubscriber((newToken) => {
            resolve(
              authFetch({
                ...originalRequest,
                headers: {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${newToken}`, // Use the new token
                },
              })
            );
          });
        });
      }

      return Promise.reject(error);
    }
  );

  return authFetch;
};

export default AxiosInterceptor;
