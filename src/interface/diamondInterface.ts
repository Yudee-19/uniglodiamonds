// interfaces/diamond.interface.ts

export type DiamondShape =
    | "RD" // Round
    | "PR" // Princess
    | "PS" // Pear
    | "OV" // Oval
    | "EM" // Emerald
    | "CU" // Cushion
    | "MQ" // Marquise
    | "RA" // Radiant
    | "HT" // Heart
    | "AS"; // Asscher

export type DiamondColor =
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z";

export type DiamondClarity =
    | "FL"
    | "IF"
    | "VVS1"
    | "VVS2"
    | "VS1"
    | "VS2"
    | "SI1"
    | "SI2"
    | "I1"
    | "I2"
    | "I3";

export type DiamondCut = "EX" | "VG" | "G" | "F" | "I" | "NA";
export type DiamondLab = "GIA" | "IGI" | "HRD" | "OTHERS";
export type DiamondAvailability = "A" | "M" | "H" | "S"; // Available, Memo, Hold, Sold

export interface Diamond {
    // --- Identity & Meta ---
    _id: string;
    stockRef: string;
    InternalStockRefKey: number;
    availability: DiamondAvailability | string; // e.g., "M"
    source: string;

    // --- Basic Specs ---
    shape: DiamondShape | string; // e.g., "RD"
    weight: number; // Carat weight
    color: DiamondColor | string; // e.g., "E", "D", "F"
    clarity: DiamondClarity | string; // e.g., "SI1", "VS2"
    shade: string;

    // --- Cut & Finish ---
    cutGrade: DiamondCut | string; // e.g., "EX"
    polish: DiamondCut | string; // e.g., "EX", "VG"
    symmetry: DiamondCut | string; // e.g., "EX"

    // --- Fluorescence ---
    // Updated based on data seeing "NON", "STG", "FNT"
    fluorescenceIntensity: "NON" | "FNT" | "MED" | "STG" | "VSL" | string;
    fluorescenceColor: string; // e.g., "Blue" or ""

    // --- Dimensions & Proportions ---
    measurements: string; // e.g., "4.72-4.74x2.89"
    length: number;
    width: number;
    height: number;
    depthPerc: number;
    tablePerc: number;
    crownAngle: number;
    crownHeight: number;
    pavalionAngle: number; // Note: API typo matches this spelling
    pavalionDepth: number; // Note: API typo matches this spelling

    // --- Girdle & Culet ---
    girdle: string; // e.g., "MED to STK"
    girdleThin: string;
    girdlePerc: number;
    girdleCondition: string;
    culetSize: string;
    culetCondition: string;

    // --- Certification & Lab ---
    lab: DiamondLab | string; // e.g., "GIA"
    certiNo: string;
    certIssueDate: string; // ISO Date String
    certComment: string;
    laserInscription: string; // "Y" or "N"

    // --- Pricing ---
    priceListUSD: number;
    pricePerCts: number;
    discPerc: number;
    cashDiscPerc: number;
    cashDiscPrice: number;

    // --- Inclusions & Comments ---
    keyToSymbols: string[]; // e.g., ["Crystal", "Cloud"]
    milky: string;
    blackinclusion: string;
    eyeClean: string;
    memberComment: string;
    handA: string; // Hearts and Arrows
    identificationMarks: string;
    enhancements: string;
    treatment: string;

    // --- Fancy Color Details (If applicable) ---
    origin: string;
    fancyColor: string;
    fancyIntensity: string;
    fancyOvertone: string;

    // --- Location & Logistics ---
    city: string;
    state: string;
    country: string; // e.g., "ITALY"

    // --- Media ---
    webLink: string; // Image URL
    videoLink: string; // Video URL

    // --- Pairing ---
    pairStockRef: string;
    isMatchedPairSeparable: boolean;

    // --- System Timestamps ---
    __v: number;
    createdAt: string; // ISO Date String
    updatedAt: string; // ISO Date String
}

export interface DiamondParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    shapes?: DiamondShape[];
    colors?: DiamondColor[];
    clarities?: DiamondClarity[];
    cuts?: DiamondCut[];
    polish?: DiamondCut[];
    symmetry?: DiamondCut[];
    fluorescence?: string[];
    lab?: string[];
    minPrice?: number;
    maxPrice?: number;
    minCarat?: number;
    maxCarat?: number;
    minDepth?: number;
    maxDepth?: number;
    minWidth?: number;
    maxWidth?: number;
    minLength?: number;
    maxLength?: number;
    minTable?: number;
    maxTable?: number;
    minDepthPercent?: number;
    maxDepthPercent?: number;
}

// Helper function to get full shape name from code
export const getShapeFullName = (shapeCode: DiamondShape | string): string => {
    const shapeMap: Record<DiamondShape, string> = {
        RD: "Round",
        PR: "Princess",
        PS: "Pear",
        OV: "Oval",
        EM: "Emerald",
        CU: "Cushion",
        MQ: "Marquise",
        RA: "Radiant",
        HT: "Heart",
        AS: "Asscher",
    };
    if (typeof shapeCode === "string" && shapeCode in shapeMap) {
        return shapeMap[shapeCode as DiamondShape];
    } else {
        // Optionally, return a fallback string if shapeCode is not recognized
        return typeof shapeCode === "string" ? shapeCode : "Unknown Shape";
    }
};

// Helper function to get availability status display text
export const getAvailabilityText = (
    availability: DiamondAvailability | string
): string => {
    const availabilityMap: Record<DiamondAvailability, string> = {
        A: "AVAILABLE",
        M: "MEMO",
        H: "HOLD",
        S: "SOLD",
    };
    return typeof availability === "string" && availability in availabilityMap
        ? availabilityMap[availability as DiamondAvailability]
        : availability;
};

// Helper function to calculate total price
export const calculateTotalPrice = (
    weight: number,
    pricePerCts: number
): number => {
    return weight * pricePerCts;
};

export interface CartItem {
    diamondId: string;
    addedAt: string;
    diamond: Diamond;
}

export interface Cart {
    _id: string;
    userId: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}
