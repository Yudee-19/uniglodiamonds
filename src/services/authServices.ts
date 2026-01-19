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

export interface RegisterRequestData {
    username: string;
    email: string;
    password: string;
    companyName: string;
    customerData: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        countryCode: string;
        landlineNumber: string;
        address: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        };
        businessInfo: {
            companyName: string;
            businessType: string;
            vatNumber: string;
            websiteUrl: string;
        };
    };
}

export interface RegisterResponseData {
    user: User;
}

export interface VerifyOtpRequestData {
    email: string;
    otp: string;
}

export interface VerifyOtpResponseData {
    user: User;
}

export const loginUser = async (
    email: string,
    password: string,
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
        const response =
            await apiClient.get<ApiSuccessResponse<LoginResponseData>>(
                "/users/profile",
            );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async (): Promise<ApiSuccessResponse<null>> => {
    try {
        const response =
            await apiClient.post<ApiSuccessResponse<null>>("/users/logout");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (
    data: RegisterRequestData,
): Promise<ApiSuccessResponse<RegisterResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<RegisterResponseData>
        >("/users/register", data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        throw (
            axiosError.response?.data?.message ||
            "Something went wrong. Please try again."
        );
    }
};

export const verifyOtp = async (
    data: VerifyOtpRequestData,
): Promise<ApiSuccessResponse<VerifyOtpResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<VerifyOtpResponseData>
        >("/users/verify-otp", data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        throw (
            axiosError.response?.data?.message ||
            "Invalid OTP. Please try again."
        );
    }
};
