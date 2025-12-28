import apiClient from "@/lib/api"; // Adjust path if needed
import { AxiosError } from "axios";

export interface User {
    _id: string;
    username: string;
    email: string;
    status: string;
    role: string;
    quotations: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface LoginResponseData {
    user: User;
}

export interface ApiSuccessResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiErrorResponse {
    success: boolean;
    message: string;
}

export const loginUser = async (
    email: string,
    password: string
): Promise<ApiSuccessResponse<LoginResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<LoginResponseData>
        >("/users/login", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        throw (
            axiosError.response?.data?.message ||
            "Something went wrong. Please try again."
        );
    }
};

export const getCurrentUser = async (): Promise<
    ApiSuccessResponse<LoginResponseData>
> => {
    try {
        // Assuming endpoint is /users/profile based on your reference
        const response = await apiClient.get<
            ApiSuccessResponse<LoginResponseData>
        >("/users/profile");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async (): Promise<ApiSuccessResponse<null>> => {
    try {
        const response = await apiClient.post<ApiSuccessResponse<null>>(
            "/users/logout"
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
