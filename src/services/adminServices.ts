import apiClient from "@/lib/api";

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
