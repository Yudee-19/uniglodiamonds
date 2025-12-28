import { ApiErrorResponse } from "@/services/authServices";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

const apiClient = axios.create({
    // The base URL of your backend
    baseURL: "https://uniglow-service-dev.onrender.com/api",

    // timeout: 40000, // 10 seconds timeout
    withCredentials: true,

    headers: {
        "Content-Type": "application/json",
        // "Cache-Control": "no-cache, no-store, must-revalidate",
        // // 2. HTTP 1.0 compatibility
        // Pragma: "no-cache",
        // // 3. Expire immediately
        // Expires: "0",
    },
});

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // If the response is good, just return it
        return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        if (error.response && error.response.status === 401) {
            if (window.location.pathname === "/login") {
                return Promise.reject(error);
            }

            console.log("Unauthorized! Redirecting to login...");
            toast.error(
                error.response?.data?.message ||
                    "Session expired. Please log in again."
            );

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
