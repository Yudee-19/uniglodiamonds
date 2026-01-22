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

interface CreateInquiryParams {
    stockRef: string;
    query: string;
}

interface ReplyToQueryParams {
    queryId: string;
    reply: string;
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
