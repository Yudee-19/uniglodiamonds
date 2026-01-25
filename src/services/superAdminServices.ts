import apiClient from "@/lib/api";
import { AxiosError } from "axios";

// Interfaces
export interface AdminUser {
    _id: string;
    username: string;
    email: string;
    status: "APPROVED" | "PENDING" | "REJECTED";
    role: "ADMIN" | "SUPER_ADMIN";
    quotations: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CreateAdminRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: "ADMIN";
}

export interface CreateAdminResponse {
    success: boolean;
    data: AdminUser;
    message: string;
}

export interface GetAdminsListResponse {
    success: boolean;
    message: string;
    data: AdminUser[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface DeleteAdminResponse {
    success: boolean;
    message: string;
}

export interface ApiErrorResponse {
    success: boolean;
    message: string;
    error?: string;
}

// Service Functions
export const createAdmin = async (
    adminData: CreateAdminRequest,
): Promise<CreateAdminResponse> => {
    try {
        const response = await apiClient.post<CreateAdminResponse>(
            "/users/admin/create",
            adminData,
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw new Error(
            axiosError.response?.data?.message || "Failed to create admin",
        );
    }
};

export const getAdminsList = async (
    page: number = 1,
    limit: number = 10,
): Promise<GetAdminsListResponse> => {
    try {
        const response = await apiClient.get<GetAdminsListResponse>(
            `/users/admin/list?page=${page}&limit=${limit}`,
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw new Error(
            axiosError.response?.data?.message || "Failed to fetch admins list",
        );
    }
};

export const deleteAdmin = async (
    adminId: string,
): Promise<DeleteAdminResponse> => {
    try {
        const response = await apiClient.delete<DeleteAdminResponse>(
            `/users/admin/${adminId}`,
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw new Error(
            axiosError.response?.data?.message || "Failed to delete admin",
        );
    }
};
