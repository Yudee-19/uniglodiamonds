import apiClient from "@/lib/api";
import { Diamond, CartItem } from "@/interface/diamondInterface";

// Types
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface BusinessInfo {
    companyName: string;
    businessType: string;
    vatNumber: string;
    websiteUrl: string;
}

export interface CustomerData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    landlineNumber: string;
    countryCode: string;
    address: Address;
    businessInfo: BusinessInfo;
    submittedAt: string;
}

export interface PendingUser {
    _id: string;
    username: string;
    email: string;
    status: string;
    role: string;
    companyName: string;
    contactName: string;
    customerData: CustomerData;
    quotations: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetPendingUsersResponse {
    success: boolean;
    data: PendingUser[];
    count: number;
    message: string;
}

export interface ApproveUserResponse {
    success: boolean;
    message: string;
    data?: any;
}

// Cart-related interfaces
export interface CartWithDetails {
    _id: string;
    userId: string;
    items: CartItem[];
    holdItems: CartItem[];
    createdAt: string;
    updatedAt: string;
}

export interface UserDetails {
    _id: string;
    username: string;
    email: string;
    status: string;
    role: string;
    companyName?: string;
    contactName?: string;
    customerData?: CustomerData;
    quotations: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    entityKey?: number;
}

export interface AdminCartData {
    cart: CartWithDetails;
    user: UserDetails;
    totalItems: number;
    totalHoldItems: number;
}

export interface GetAllCartsResponse {
    success: boolean;
    message: string;
    data: AdminCartData[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface GetAllCartsParams {
    page?: number;
    limit?: number;
}

// Service Functions
export const getPendingUsers = async (): Promise<GetPendingUsersResponse> => {
    const response = await apiClient.get("/users/customer-data-pending");
    return response.data;
};

export const approveCustomerData = async (
    userId: string,
): Promise<ApproveUserResponse> => {
    const response = await apiClient.post(
        `/users/${userId}/approve-customer-data`,
    );
    return response.data;
};

export const rejectCustomerData = async (
    userId: string,
): Promise<ApproveUserResponse> => {
    const response = await apiClient.post(
        `/users/${userId}/reject-customer-data`,
    );
    return response.data;
};

export const getAllCarts = async (
    params?: GetAllCartsParams,
): Promise<GetAllCartsResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) {
        queryParams.append("page", params.page.toString());
    }
    if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
    }

    const queryString = queryParams.toString();
    const url = `/diamonds/cart/admin/all${queryString ? `?${queryString}` : ""}`;

    const response = await apiClient.get<GetAllCartsResponse>(url);
    return response.data;
};
