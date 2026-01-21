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
            status: "pending" | "answered" | "closed";
            createdAt: string;
            updatedAt: string;
            __v: number;
            id: string;
        };
    };
}

interface CreateInquiryParams {
    stockRef: string;
    query: string;
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
