// services/diamondService.ts
import {
    Diamond,
    DiamondParams,
    PublicDiamond,
} from "@/interface/diamondInterface";
import apiClient from "@/lib/api";

interface ApiResponse {
    success: boolean;
    message: string;
    data: Diamond[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    appliedFilters?: Record<string, any>;
    totalFilteredRecords?: number;
}

// Add new interface for public diamonds
interface PublicApiResponse {
    success: boolean;
    message: string;
    data: PublicDiamond[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    appliedFilters?: Record<string, any>;
    totalFilteredRecords?: number;
}

export const fetchDiamonds = async (
    params: DiamondParams,
): Promise<{
    data: Diamond[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}> => {
    try {
        // Build query parameters
        const queryParams = new URLSearchParams();

        // Pagination
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());

        // Search
        if (params.search) queryParams.append("search", params.search);

        // Sorting
        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

        // Shape filters
        if (params.shape && params.shape.length > 0) {
            params.shape.forEach((shape) =>
                queryParams.append("shape[]", shape),
            );
        }

        // Color filters
        if (params.color && params.color.length > 0) {
            params.color.forEach((color) =>
                queryParams.append("color[]", color),
            );
        }

        // Clarity filters
        if (params.clarity && params.clarity.length > 0) {
            params.clarity.forEach((clarity) =>
                queryParams.append("clarity[]", clarity),
            );
        }

        // Cut filters
        if (params.cutGrade && params.cutGrade.length > 0) {
            params.cutGrade.forEach((cut) =>
                queryParams.append("cutGrade[]", cut),
            );
        }

        // Polish filters
        if (params.polish && params.polish.length > 0) {
            params.polish.forEach((pol) => queryParams.append("polish[]", pol));
        }

        // Symmetry filters
        if (params.symmetry && params.symmetry.length > 0) {
            params.symmetry.forEach((sym) =>
                queryParams.append("symmetry[]", sym),
            );
        }

        // Fluorescence filters
        if (
            params.fluorescenceIntensity &&
            params.fluorescenceIntensity.length > 0
        ) {
            params.fluorescenceIntensity.forEach((fluor) =>
                queryParams.append("fluorescenceIntensity[]", fluor),
            );
        }

        // Lab filters
        if (params.lab && params.lab.length > 0) {
            params.lab.forEach((lab) => queryParams.append("lab[]", lab));
        }

        // Price range
        if (params.minPrice !== undefined)
            queryParams.append("priceListUSD_MIN", params.minPrice.toString());
        if (params.maxPrice !== undefined)
            queryParams.append("priceListUSD_MAX", params.maxPrice.toString());

        // price per carat range
        if (params.minPricePerCarat !== undefined)
            queryParams.append(
                "pricePerCts_MIN",
                params.minPricePerCarat.toString(),
            );
        if (params.maxPricePerCarat !== undefined)
            queryParams.append(
                "pricePerCts_MAX",
                params.maxPricePerCarat.toString(),
            );

        // Discount percentage range
        if (params.minDiscount !== undefined)
            queryParams.append("discPerc_MIN", params.minDiscount.toString());
        if (params.maxDiscount !== undefined)
            queryParams.append("discPerc_MAX", params.maxDiscount.toString());
        // Carat range
        if (params.minCarat !== undefined)
            queryParams.append("weight_MIN", params.minCarat.toString());
        if (params.maxCarat !== undefined)
            queryParams.append("weight_MAX", params.maxCarat.toString());

        // Depth range
        if (params.minDepth !== undefined)
            queryParams.append("depthPerc_MIN", params.minDepth.toString());
        if (params.maxDepth !== undefined)
            queryParams.append("depthPerc_MAX", params.maxDepth.toString());

        // Width range
        if (params.minWidth !== undefined)
            queryParams.append("width_MIN", params.minWidth.toString());
        if (params.maxWidth !== undefined)
            queryParams.append("width_MAX", params.maxWidth.toString());

        // Length range
        if (params.minLength !== undefined)
            queryParams.append("length_MIN", params.minLength.toString());
        if (params.maxLength !== undefined)
            queryParams.append("length_MAX", params.maxLength.toString());

        // Table percentage range
        if (params.minTable !== undefined)
            queryParams.append("tablePerc_MIN", params.minTable.toString());
        if (params.maxTable !== undefined)
            queryParams.append("tablePerc_MAX", params.maxTable.toString());

        if (params.minHeight !== undefined)
            queryParams.append("height_MIN", params.minHeight.toString());
        if (params.maxHeight !== undefined)
            queryParams.append("height_MAX", params.maxHeight.toString());

        // Depth percentage range
        if (params.minDepthPercent !== undefined)
            queryParams.append(
                "minDepthPercent",
                params.minDepthPercent.toString(),
            );
        if (params.maxDepthPercent !== undefined)
            queryParams.append(
                "maxDepthPercent",
                params.maxDepthPercent.toString(),
            );

        // Natural/Lab filter
        if (params.isNatural !== undefined)
            queryParams.append("isNatural", params.isNatural.toString());

        // Color type filter
        if (params.colorType) queryParams.append("colorType", params.colorType);

        const response = await apiClient.get<ApiResponse>(
            `/diamonds?${queryParams.toString()}`,
        );
        const result = response.data;

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch diamonds");
        }

        return {
            data: result.data,
            totalCount: result.pagination.totalRecords,
            currentPage: result.pagination.currentPage,
            totalPages: result.pagination.totalPages,
            hasNextPage: result.pagination.hasNextPage,
            hasPrevPage: result.pagination.hasPrevPage,
        };
    } catch (error) {
        console.error("Error fetching diamonds:", error);
        throw error;
    }
};

// Search/Filter API - for advanced filtering
export const searchDiamonds = async (
    params: DiamondParams,
): Promise<{
    data: Diamond[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    appliedFilters?: Record<string, any>;
}> => {
    try {
        // Build query parameters for search endpoint
        const queryParams = new URLSearchParams();

        // Pagination
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());

        // Sorting
        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

        // Shape filters - using repeated parameters with &
        if (params.shape && params.shape.length > 0) {
            params.shape.forEach((shape) => queryParams.append("shape", shape));
        }

        // Color filters - using repeated parameters with &
        if (params.color && params.color.length > 0) {
            params.color.forEach((color) => queryParams.append("color", color));
        }

        // Clarity filters - using repeated parameters with &
        if (params.clarity && params.clarity.length > 0) {
            params.clarity.forEach((clarity) =>
                queryParams.append("clarity", clarity),
            );
        }

        // Cut filters - using repeated parameters with &
        if (params.cutGrade && params.cutGrade.length > 0) {
            params.cutGrade.forEach((cut) =>
                queryParams.append("cutGrade", cut),
            );
        }

        // Polish filters - using repeated parameters with &
        if (params.polish && params.polish.length > 0) {
            params.polish.forEach((pol) => queryParams.append("polish", pol));
        }

        // Symmetry filters - using repeated parameters with &
        if (params.symmetry && params.symmetry.length > 0) {
            params.symmetry.forEach((sym) =>
                queryParams.append("symmetry", sym),
            );
        }

        // Fluorescence filters - using repeated parameters with &
        if (
            params.fluorescenceIntensity &&
            params.fluorescenceIntensity.length > 0
        ) {
            params.fluorescenceIntensity.forEach((fluor) =>
                queryParams.append("fluorescenceIntensity", fluor),
            );
        }

        // Lab filters - using repeated parameters with &
        if (params.lab && params.lab.length > 0) {
            params.lab.forEach((lab) => queryParams.append("lab", lab));
        }

        // Price range
        if (params.minPrice !== undefined)
            queryParams.append("priceListUSD_MIN", params.minPrice.toString());
        if (params.maxPrice !== undefined)
            queryParams.append("priceListUSD_MAX", params.maxPrice.toString());

        // price per carat range
        if (params.minPricePerCarat !== undefined)
            queryParams.append(
                "pricePerCts_MIN",
                params.minPricePerCarat.toString(),
            );
        if (params.maxPricePerCarat !== undefined)
            queryParams.append(
                "pricePerCts_MAX",
                params.maxPricePerCarat.toString(),
            );

        // Discount percentage range
        if (params.minDiscount !== undefined)
            queryParams.append("discPerc_MIN", params.minDiscount.toString());
        if (params.maxDiscount !== undefined)
            queryParams.append("discPerc_MAX", params.maxDiscount.toString());

        // Carat range
        if (params.minCarat !== undefined)
            queryParams.append("weight_MIN", params.minCarat.toString());
        if (params.maxCarat !== undefined)
            queryParams.append("weight_MAX", params.maxCarat.toString());

        // Depth range
        if (params.minDepth !== undefined)
            queryParams.append("depthPerc_MIN", params.minDepth.toString());
        if (params.maxDepth !== undefined)
            queryParams.append("depthPerc_MAX", params.maxDepth.toString());

        // Width range
        if (params.minWidth !== undefined)
            queryParams.append("width_MIN", params.minWidth.toString());
        if (params.maxWidth !== undefined)
            queryParams.append("width_MAX", params.maxWidth.toString());

        // Length range
        if (params.minLength !== undefined)
            queryParams.append("length_MIN", params.minLength.toString());
        if (params.maxLength !== undefined)
            queryParams.append("length_MAX", params.maxLength.toString());

        if (params.minHeight !== undefined)
            queryParams.append("height_MIN", params.minHeight.toString());
        if (params.maxHeight !== undefined)
            queryParams.append("height_MAX", params.maxHeight.toString());

        // Table percentage range
        if (params.minTable !== undefined)
            queryParams.append("tablePerc_MIN", params.minTable.toString());
        if (params.maxTable !== undefined)
            queryParams.append("tablePerc_MAX", params.maxTable.toString());

        // Depth percentage range
        if (params.minDepthPercent !== undefined)
            queryParams.append(
                "minDepthPerc",
                params.minDepthPercent.toString(),
            );
        if (params.maxDepthPercent !== undefined)
            queryParams.append(
                "maxDepthPerc",
                params.maxDepthPercent.toString(),
            );

        // Natural/Lab filter
        if (params.isNatural !== undefined)
            queryParams.append("isNatural", params.isNatural.toString());

        // Color type filter
        if (params.colorType) queryParams.append("colorType", params.colorType);
        if (params.searchTerm)
            queryParams.append("searchTerm", params.searchTerm);

        const response = await apiClient.get<ApiResponse>(
            `/diamonds/search?${queryParams.toString()}`,
        );
        const result = response.data;

        if (!result.success) {
            throw new Error(result.message || "Failed to search diamonds");
        }

        return {
            data: result.data,
            totalCount: result.pagination.totalRecords,
            currentPage: result.pagination.currentPage,
            totalPages: result.pagination.totalPages,
            hasNextPage: result.pagination.hasNextPage,
            hasPrevPage: result.pagination.hasPrevPage,
            appliedFilters: result.appliedFilters,
        };
    } catch (error) {
        console.error("Error searching diamonds:", error);
        throw error;
    }
};

// Function to fetch a single diamond by ID
export const fetchDiamondById = async (
    id: string,
    isPublic = false,
): Promise<Diamond> => {
    try {
        const response = await apiClient.get<ApiResponse>(
            `/diamonds${isPublic ? "/safe" : "/search"}?searchTerm=${id}`,
        );
        const result = response.data;

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch diamond");
        }

        // The API returns an array, so we return the first match
        if (Array.isArray(result.data) && result.data.length > 0) {
            return result.data[0];
        }

        throw new Error("Diamond not found");
    } catch (error) {
        console.error("Error fetching diamond:", error);
        throw error;
    }
};

// Add new function for public diamonds
export const fetchPublicDiamonds = async (
    params: DiamondParams,
): Promise<{
    data: PublicDiamond[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}> => {
    try {
        const queryParams = new URLSearchParams();

        // Pagination
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());

        // Sorting
        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

        // Add all other filter parameters (same as fetchDiamonds)
        if (params.shape && params.shape.length > 0) {
            params.shape.forEach((shape) =>
                queryParams.append("shape[]", shape),
            );
        }

        if (params.color && params.color.length > 0) {
            params.color.forEach((color) =>
                queryParams.append("color[]", color),
            );
        }

        if (params.clarity && params.clarity.length > 0) {
            params.clarity.forEach((clarity) =>
                queryParams.append("clarity[]", clarity),
            );
        }

        if (params.cutGrade && params.cutGrade.length > 0) {
            params.cutGrade.forEach((cut) =>
                queryParams.append("cutGrade[]", cut),
            );
        }

        if (params.polish && params.polish.length > 0) {
            params.polish.forEach((pol) => queryParams.append("polish[]", pol));
        }

        if (params.symmetry && params.symmetry.length > 0) {
            params.symmetry.forEach((sym) =>
                queryParams.append("symmetry[]", sym),
            );
        }

        if (
            params.fluorescenceIntensity &&
            params.fluorescenceIntensity.length > 0
        ) {
            params.fluorescenceIntensity.forEach((fluor) =>
                queryParams.append("fluorescenceIntensity[]", fluor),
            );
        }

        if (params.lab && params.lab.length > 0) {
            params.lab.forEach((lab) => queryParams.append("lab[]", lab));
        }

        // Carat range
        if (params.minCarat !== undefined)
            queryParams.append("weight_MIN", params.minCarat.toString());
        if (params.maxCarat !== undefined)
            queryParams.append("weight_MAX", params.maxCarat.toString());

        // Discount percentage range
        if (params.minDiscount !== undefined)
            queryParams.append("discPerc_MIN", params.minDiscount.toString());
        if (params.maxDiscount !== undefined)
            queryParams.append("discPerc_MAX", params.maxDiscount.toString());

        // Dimension ranges
        if (params.minDepth !== undefined)
            queryParams.append("depthPerc_MIN", params.minDepth.toString());
        if (params.maxDepth !== undefined)
            queryParams.append("depthPerc_MAX", params.maxDepth.toString());

        if (params.minWidth !== undefined)
            queryParams.append("width_MIN", params.minWidth.toString());
        if (params.maxWidth !== undefined)
            queryParams.append("width_MAX", params.maxWidth.toString());

        if (params.minLength !== undefined)
            queryParams.append("length_MIN", params.minLength.toString());
        if (params.maxLength !== undefined)
            queryParams.append("length_MAX", params.maxLength.toString());
        if (params.minHeight !== undefined)
            queryParams.append("height_MIN", params.minHeight.toString());
        if (params.maxHeight !== undefined)
            queryParams.append("height_MAX", params.maxHeight.toString());

        if (params.minTable !== undefined)
            queryParams.append("tablePerc_MIN", params.minTable.toString());
        if (params.maxTable !== undefined)
            queryParams.append("tablePerc_MAX", params.maxTable.toString());

        if (params.minDepthPercent !== undefined)
            queryParams.append(
                "minDepthPercent",
                params.minDepthPercent.toString(),
            );
        if (params.maxDepthPercent !== undefined)
            queryParams.append(
                "maxDepthPercent",
                params.maxDepthPercent.toString(),
            );

        if (params.isNatural !== undefined)
            queryParams.append("isNatural", params.isNatural.toString());

        if (params.colorType) queryParams.append("colorType", params.colorType);
        if (params.searchTerm)
            queryParams.append("searchTerm", params.searchTerm);

        const response = await apiClient.get<PublicApiResponse>(
            `/diamonds/safe?${queryParams.toString()}`,
        );
        const result = response.data;

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch diamonds");
        }

        return {
            data: result.data,
            totalCount: result.pagination.totalRecords,
            currentPage: result.pagination.currentPage,
            totalPages: result.pagination.totalPages,
            hasNextPage: result.pagination.hasNextPage,
            hasPrevPage: result.pagination.hasPrevPage,
        };
    } catch (error) {
        console.error("Error fetching public diamonds:", error);
        throw error;
    }
};
