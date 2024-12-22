import axios from "axios";
import { toast } from "sonner";
const token = localStorage.getItem("token");
let suspended = false;

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // if (response.data && response.data.data && !response.data.token) {
    //   response.data = response.data.data;
    //   delete response.data.data;
    // }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is due to an expired token
    if (
      error.response &&
      error.response.status === 403 &&
      (error.response.data.message === "Authorization token malformed" ||
        error.response.data.message === "Bearer token malformed") &&
      !token
    ) {
      try {
        console.log("Refreshing token");
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/auth/refresh-token`,
          {
            refreshToken: localStorage.getItem("refreshToken"),
          },
        );
        console.log("Token refreshed");
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "expires",
          String(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        );

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (error) {
        console.log("Error refreshing token");
        console.error(error);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expires");
        localStorage.removeItem("refreshTokenExpires");
        window.location.href = "/login";
      }
      return;
    } else if (
      error.response &&
      error.response.status === 403 &&
      !!error.response.data.accountSuspension
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expires");
      localStorage.removeItem("refreshTokenExpires");
      if (!suspended) {
        toast.error(
          "Your account has been deactivated by The Outfitter’s Platform.",
          {
            description:
              "Please contact support for more information:\n support@outfitters.com. you will be redirected to the login page",
          },
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 5000);
      }
      suspended = true;
    }
    return Promise.reject(error);
  },
);

export default api;
