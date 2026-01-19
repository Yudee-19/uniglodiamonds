import apiClient from "@/lib/api";
import { ApiSuccessResponse, ApiErrorResponse } from "./authServices";
import { Cart, CartItem } from "@/interface/diamondInterface";
import { AxiosError } from "axios";

export interface CartResponseData {
    cart: Cart;
    totalItems: number;
}

export interface AddToCartResponseData {
    cartItem: CartItem;
}

export interface HoldDiamondResponseData {
    message: string;
    stockRef: string;
}

export const getCart = async (): Promise<
    ApiSuccessResponse<CartResponseData>
> => {
    try {
        const response =
            await apiClient.get<ApiSuccessResponse<CartResponseData>>(
                "/diamonds/cart",
            );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to retrieve cart. Please try again."
        );
    }
};

export const addToCart = async (
    diamondId: string[],
): Promise<ApiSuccessResponse<AddToCartResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<AddToCartResponseData>
        >("/diamonds/cart/add", {
            diamondId,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw axiosError.response?.data?.message;
    }
};

export const holdDiamond = async (
    stockRef: string,
): Promise<ApiSuccessResponse<HoldDiamondResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<HoldDiamondResponseData>
        >("/diamonds/hold", {
            stockRef,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to hold diamond. Please try again."
        );
    }
};
