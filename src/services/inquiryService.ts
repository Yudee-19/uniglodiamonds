import apiClient from "@/lib/api";
import { Diamond } from "@/interface/diamondInterface";

interface InquiryResponse {
    success: boolean;
    message: string;
    data: {
        query: {
            userId: string;
            userEmail: string;
            stockRef: string;
            diamondId: Diamond;
            query: string;
            status: "pending" | "answered" | "closed" | "replied";
            createdAt: string;
            updatedAt: string;
            __v: number;
            id: string;
            adminReply?: string;
            repliedAt?: string;
            repliedBy?: string;
        };
    };
}

interface GroupedQuery {
    userId: string;
    userEmail: string;
    stockRef: string;
    diamondId: Diamond;
    query: string;
    status: "pending" | "answered" | "closed" | "replied";
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
    adminReply?: string;
    repliedAt?: string;
    repliedBy?: string;
}

interface AdminQueriesResponse {
    success: boolean;
    message: string;
    data: {
        groupedQueries: {
            email: string;
            queries: GroupedQuery[];
        }[];
    };
}

interface UserQueriesResponse {
    success: boolean;
    message: string;
    data: {
        queries: GroupedQuery[];
    };
}

interface CreateInquiryParams {
    stockRef: string;
    query: string;
}

interface ReplyToQueryParams {
    queryId: string;
    reply: string;
}

interface FormSubmitResponse {
    success: boolean;
    message: string;
    data?: any;
}

export const createDiamondInquiry = async (
    params: CreateInquiryParams,
): Promise<InquiryResponse> => {
    try {
        const response = await apiClient.post<InquiryResponse>(
            "/diamonds/queries",
            {
                stockRef: params.stockRef,
                query: params.query,
            },
        );

        if (!response.data.success) {
            throw new Error(
                response.data.message || "Failed to create inquiry",
            );
        }

        return response.data;
    } catch (error: any) {
        console.error("Error creating diamond inquiry:", error);
        throw error.response?.data?.message || "Failed to submit inquiry";
    }
};

export const getAllAdminQueries = async (): Promise<AdminQueriesResponse> => {
    try {
        const response = await apiClient.get<AdminQueriesResponse>(
            "/diamonds/queries/admin/all",
        );

        if (!response.data.success) {
            throw new Error(
                response.data.message || "Failed to fetch admin queries",
            );
        }

        return response.data;
    } catch (error: any) {
        console.error("Error fetching admin queries:", error);
        throw error.response?.data?.message || "Failed to fetch queries";
    }
};

export const getUserQueries = async (): Promise<UserQueriesResponse> => {
    try {
        const response =
            await apiClient.get<UserQueriesResponse>("/diamonds/queries");

        if (!response.data.success) {
            throw new Error(
                response.data.message || "Failed to fetch user queries",
            );
        }

        return response.data;
    } catch (error: any) {
        console.error("Error fetching user queries:", error);
        throw error.response?.data?.message || "Failed to fetch queries";
    }
};

export const replyToQuery = async (
    params: ReplyToQueryParams,
): Promise<InquiryResponse> => {
    try {
        const response = await apiClient.put<InquiryResponse>(
            `/diamonds/queries/${params.queryId}/reply`,
            {
                reply: params.reply,
            },
        );

        if (!response.data.success) {
            throw new Error(
                response.data.message || "Failed to reply to query",
            );
        }

        return response.data;
    } catch (error: any) {
        console.error("Error replying to query:", error);
        throw error.response?.data?.message || "Failed to send reply";
    }
};

export interface InquiryFormData {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    type: "private" | "business";
    city: string;
    country: string;
    diamondDetails: string;
    images?: File[];
}

export const submitInquiryForm = async (
    data: InquiryFormData,
): Promise<FormSubmitResponse> => {
    try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("address", data.address);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("type", data.type);
        formData.append("city", data.city);
        formData.append("country", data.country);
        formData.append("diamondDetails", data.diamondDetails);

        // Append multiple images
        if (data.images && data.images.length > 0) {
            data.images.forEach((image) => {
                formData.append("images", image);
            });
        }

        const response = await apiClient.post<FormSubmitResponse>(
            "/forms/inquiry/submit",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        if (!response.data.success) {
            throw new Error(
                response.data.message || "Failed to submit inquiry form",
            );
        }

        return response.data;
    } catch (error: any) {
        console.error("Error submitting inquiry form:", error);
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to submit inquiry form"
        );
    }
};

export interface SellDiamondFormData {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    material: string;
    description: string;
    images?: File[];
}

export const submitSellDiamondForm = async (
    data: SellDiamondFormData,
): Promise<FormSubmitResponse> => {
    try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("address", data.address);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("material", data.material);
        formData.append("description", data.description);

        // Append multiple images
        if (data.images && data.images.length > 0) {
            data.images.forEach((image) => {
                formData.append("images", image);
            });
        }

        const response = await apiClient.post<FormSubmitResponse>(
            "/forms/submit",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        if (!response.data.success) {
            throw new Error(
                response.data.message || "Failed to submit sell diamond form",
            );
        }

        return response.data;
    } catch (error: any) {
        console.error("Error submitting sell diamond form:", error);
        throw (
            error.response?.data?.message ||
            error.message ||
            "Failed to submit sell diamond form"
        );
    }
};
