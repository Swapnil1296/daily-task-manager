import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // Replace with your API base URL
    timeout: 10000, // Timeout after 10 seconds
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get the token from sessionStorage
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            // Set the token in the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Return the modified config
        return config;
    },
    (error) => {
        // Handle request errors
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Process response data here if needed
        return response;
    },
    (error) => {
        // Handle response errors
        if (error.response?.status === 401) {
            // Optional: Add logic to handle token expiration or unauthorized access
            console.error("Unauthorized: Redirecting to login.");
            // Redirect logic (if applicable)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
