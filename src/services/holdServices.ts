import apiClient from "@/lib/api";
import { AxiosError } from "axios";

interface ExtendHoldParams {
    userId: string;
    stockRef: string;
    hours: number;
}

interface ExtendHoldResponse {
    success: boolean;
    message: string;
    data?: any;
}

export const extendHoldDiamond = async (
    params: ExtendHoldParams,
): Promise<ExtendHoldResponse> => {
    try {
        const response = await apiClient.post<ExtendHoldResponse>(
            `/diamonds/hold/admin/${params.userId}`,
            {
                stockRef: params.stockRef,
                hours: params.hours,
            },
        );

        if (!response.data.success) {
            throw new Error(response.data.message || "Failed to extend hold");
        }

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.message || "Failed to extend hold period",
            );
        }
        throw error;
    }
};
