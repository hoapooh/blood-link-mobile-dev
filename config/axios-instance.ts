import { clearAuthLocalStorage } from "@/utils/auth-utils";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Function to set the auth token dynamically
export const setAuthToken = (token: string | null) => {
	if (token) {
		axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axiosInstance.defaults.headers.common["Authorization"];
	}
};

// Add request interceptor
axiosInstance.interceptors.request.use(
	async (config) => {
		if (!config.headers.Accept && config.headers["Content-Type"]) {
			config.headers.Accept = "application/json";
			config.headers["Content-Type"] = "application/json; charset=utf-8";
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			await clearAuthLocalStorage();
			// Redirect to login
			// You might want to use router.replace('/auth/signin');
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
