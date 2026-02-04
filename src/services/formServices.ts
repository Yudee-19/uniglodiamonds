import apiClient from "@/lib/api";
import { AxiosError } from "axios";

// Types
export interface FormImage {
    fileName: string;
    s3Key: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: string;
    s3Url: string;
}

export interface FormSubmission {
    _id: string;
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    countryCode: string;
    material: string;
    description: string;
    images: FormImage[];
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface FormsPagination {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface FormsResponse {
    success: boolean;
    message: string;
    data: FormSubmission[];
    pagination: FormsPagination;
}

export interface ApiErrorResponse {
    success: boolean;
    message: string;
    error?: string;
}

// Service Functions
export const getAllFormSubmissions = async (
    page: number = 1,
    limit: number = 10,
): Promise<FormsResponse> => {
    try {
        const response = await apiClient.get<FormsResponse>("/forms", {
            params: {
                page,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw new Error(
            axiosError.response?.data?.message ||
                "Failed to fetch form submissions",
        );
    }
};

export const getFormSubmissionById = async (
    id: string,
): Promise<FormSubmission> => {
    try {
        const response = await apiClient.get<{
            success: boolean;
            message: string;
            data: FormSubmission;
        }>(`/forms/${id}`);
        return response.data.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw new Error(
            axiosError.response?.data?.message ||
                "Failed to fetch form submission",
        );
    }
};

export const updateFormStatus = async (
    id: string,
    status: "PENDING" | "APPROVED" | "REJECTED",
): Promise<FormSubmission> => {
    try {
        const response = await apiClient.patch<{
            success: boolean;
            message: string;
            data: FormSubmission;
        }>(`/forms/${id}`, { status });
        return response.data.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw new Error(
            axiosError.response?.data?.message ||
                "Failed to update form status",
        );
    }
};

export const deleteFormSubmission = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`/forms/${id}`);
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw new Error(
            axiosError.response?.data?.message ||
                "Failed to delete form submission",
        );
    }
};
