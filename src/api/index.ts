import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 💡 Base URL from environment variables
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    const language = localStorage.getItem("language") || "en"; // default

    if (config.headers) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers["Accept-Language"] = language;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("authToken");
    if (error.response?.status === 401 && token) {
      // 💡 Handle Unauthorized error (e.g., logout user)
      localStorage.removeItem("authToken");
      window.location.href = "/auth/login"; // 💡 Redirect to login
    }
    return Promise.reject(error);
  }
);
