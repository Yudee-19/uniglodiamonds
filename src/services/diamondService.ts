// services/diamondService.ts
import { Diamond, DiamondParams } from "@/interface/diamondInterface";

const API_BASE_URL = "https://uniglow-service-dev.onrender.com/api";

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

export const fetchDiamonds = async (
    params: DiamondParams
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
        if (params.shapes && params.shapes.length > 0) {
            params.shapes.forEach((shape) =>
                queryParams.append("shapes[]", shape)
            );
        }

        // Color filters
        if (params.colors && params.colors.length > 0) {
            params.colors.forEach((color) =>
                queryParams.append("colors[]", color)
            );
        }

        // Clarity filters
        if (params.clarities && params.clarities.length > 0) {
            params.clarities.forEach((clarity) =>
                queryParams.append("clarities[]", clarity)
            );
        }

        // Cut filters
        if (params.cuts && params.cuts.length > 0) {
            params.cuts.forEach((cut) => queryParams.append("cuts[]", cut));
        }

        // Polish filters
        if (params.polish && params.polish.length > 0) {
            params.polish.forEach((pol) => queryParams.append("polish[]", pol));
        }

        // Symmetry filters
        if (params.symmetry && params.symmetry.length > 0) {
            params.symmetry.forEach((sym) =>
                queryParams.append("symmetry[]", sym)
            );
        }

        // Fluorescence filters
        if (params.fluorescence && params.fluorescence.length > 0) {
            params.fluorescence.forEach((fluor) =>
                queryParams.append("fluorescence[]", fluor)
            );
        }

        // Lab filters
        if (params.lab && params.lab.length > 0) {
            params.lab.forEach((lab) => queryParams.append("lab[]", lab));
        }

        // Price range
        if (params.minPrice !== undefined)
            queryParams.append("minPrice", params.minPrice.toString());
        if (params.maxPrice !== undefined)
            queryParams.append("maxPrice", params.maxPrice.toString());

        // Carat range
        if (params.minCarat !== undefined)
            queryParams.append("minCarat", params.minCarat.toString());
        if (params.maxCarat !== undefined)
            queryParams.append("maxCarat", params.maxCarat.toString());

        // Depth range
        if (params.minDepth !== undefined)
            queryParams.append("minDepth", params.minDepth.toString());
        if (params.maxDepth !== undefined)
            queryParams.append("maxDepth", params.maxDepth.toString());

        // Width range
        if (params.minWidth !== undefined)
            queryParams.append("minWidth", params.minWidth.toString());
        if (params.maxWidth !== undefined)
            queryParams.append("maxWidth", params.maxWidth.toString());

        // Length range
        if (params.minLength !== undefined)
            queryParams.append("minLength", params.minLength.toString());
        if (params.maxLength !== undefined)
            queryParams.append("maxLength", params.maxLength.toString());

        // Table percentage range
        if (params.minTable !== undefined)
            queryParams.append("minTable", params.minTable.toString());
        if (params.maxTable !== undefined)
            queryParams.append("maxTable", params.maxTable.toString());

        // Depth percentage range
        if (params.minDepthPercent !== undefined)
            queryParams.append(
                "minDepthPercent",
                params.minDepthPercent.toString()
            );
        if (params.maxDepthPercent !== undefined)
            queryParams.append(
                "maxDepthPercent",
                params.maxDepthPercent.toString()
            );

        const url = `${API_BASE_URL}/diamonds?${queryParams.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

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
    params: DiamondParams
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
        if (params.shapes && params.shapes.length > 0) {
            params.shapes.forEach((shape) =>
                queryParams.append("shape", shape)
            );
        }

        // Color filters - using repeated parameters with &
        if (params.colors && params.colors.length > 0) {
            params.colors.forEach((color) =>
                queryParams.append("color", color)
            );
        }

        // Clarity filters - using repeated parameters with &
        if (params.clarities && params.clarities.length > 0) {
            params.clarities.forEach((clarity) =>
                queryParams.append("clarity", clarity)
            );
        }

        // Cut filters - using repeated parameters with &
        if (params.cuts && params.cuts.length > 0) {
            params.cuts.forEach((cut) => queryParams.append("cutGrade", cut));
        }

        // Polish filters - using repeated parameters with &
        if (params.polish && params.polish.length > 0) {
            params.polish.forEach((pol) => queryParams.append("polish", pol));
        }

        // Symmetry filters - using repeated parameters with &
        if (params.symmetry && params.symmetry.length > 0) {
            params.symmetry.forEach((sym) =>
                queryParams.append("symmetry", sym)
            );
        }

        // Fluorescence filters - using repeated parameters with &
        if (params.fluorescence && params.fluorescence.length > 0) {
            params.fluorescence.forEach((fluor) =>
                queryParams.append("fluorescenceIntensity", fluor)
            );
        }

        // Lab filters - using repeated parameters with &
        if (params.lab && params.lab.length > 0) {
            params.lab.forEach((lab) => queryParams.append("lab", lab));
        }

        // Price range
        if (params.minPrice !== undefined)
            queryParams.append("minPrice", params.minPrice.toString());
        if (params.maxPrice !== undefined)
            queryParams.append("maxPrice", params.maxPrice.toString());

        // Carat range
        if (params.minCarat !== undefined)
            queryParams.append("minWeight", params.minCarat.toString());
        if (params.maxCarat !== undefined)
            queryParams.append("maxWeight", params.maxCarat.toString());

        // Depth range
        if (params.minDepth !== undefined)
            queryParams.append("minDepth", params.minDepth.toString());
        if (params.maxDepth !== undefined)
            queryParams.append("maxDepth", params.maxDepth.toString());

        // Width range
        if (params.minWidth !== undefined)
            queryParams.append("minWidth", params.minWidth.toString());
        if (params.maxWidth !== undefined)
            queryParams.append("maxWidth", params.maxWidth.toString());

        // Length range
        if (params.minLength !== undefined)
            queryParams.append("minLength", params.minLength.toString());
        if (params.maxLength !== undefined)
            queryParams.append("maxLength", params.maxLength.toString());

        // Table percentage range
        if (params.minTable !== undefined)
            queryParams.append("minTablePerc", params.minTable.toString());
        if (params.maxTable !== undefined)
            queryParams.append("maxTablePerc", params.maxTable.toString());

        // Depth percentage range
        if (params.minDepthPercent !== undefined)
            queryParams.append(
                "minDepthPerc",
                params.minDepthPercent.toString()
            );
        if (params.maxDepthPercent !== undefined)
            queryParams.append(
                "maxDepthPerc",
                params.maxDepthPercent.toString()
            );

        const url = `${API_BASE_URL}/diamonds/search?${queryParams.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

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
export const fetchDiamondById = async (id: string): Promise<Diamond> => {
    try {
        const response = await fetch(`${API_BASE_URL}/diamonds/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch diamond");
        }

        return result.data;
    } catch (error) {
        console.error("Error fetching diamond:", error);
        throw error;
    }
};
