import axios from "axios";
import { API_BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            console.error("Server error, try later.");
        } else if (error.response.code === "ECONNABORTED") {
            console.error("Request timed out, please try again.");
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
