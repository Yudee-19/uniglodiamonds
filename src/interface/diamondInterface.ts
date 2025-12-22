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
    id: string;
    stockRef: string;
    availability: DiamondAvailability;
    origin: string;
    shape: DiamondShape;
    shade: string;
    color: DiamondColor;
    fancyColor: string;
    fancyIntensity: string;
    fancyOvertone: string;
    clarity: DiamondClarity;
    lab: DiamondLab;
    certiNo: string;
    weight: number; // carat weight
    priceListUSD: number;
    discPerc: number; // discount percentage
    pricePerCts: number; // price per carat
    cashDiscPerc: number;
    cashDiscPrice: number;
    cutGrade: DiamondCut;
    polish: DiamondCut;
    symmetry: DiamondCut;
    fluorescenceIntensity: "NON" | "FNT" | "MED" | "STG" | "VSL";
    fluorescenceColor: string;
    measurements: string;
    length: number;
    width: number;
    height: number;
    depthPerc: number;
    tablePerc: number;
    crownAngle: number;
    crownHeight: number;
    pavalionAngle: number;
    pavalionDepth: number;
    girdle: string;
    girdleThin: string;
    girdlePerc: number;
    girdleCondition: string;
    culetSize: string;
    culetCondition: string;
    milky: string;
    blackinclusion: string;
    eyeClean: string;
    laserInscription: string;
    keyToSymbols: string[];
    memberComment: string;
    handA: string;
    identificationMarks: string;
    enhancements: string;
    treatment: string;
    certComment: string;
    certIssueDate: string;
    city: string;
    state: string;
    country: string;
    pairStockRef: string;
    isMatchedPairSeparable: boolean;
    webLink: string; // image URL
    videoLink: string;
    InternalStockRefKey: number;
    source: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
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
export const getShapeFullName = (shapeCode: DiamondShape): string => {
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
    return shapeMap[shapeCode] || shapeCode;
};

// Helper function to get availability status display text
export const getAvailabilityText = (
    availability: DiamondAvailability
): string => {
    const availabilityMap: Record<DiamondAvailability, string> = {
        A: "AVAILABLE",
        M: "MEMO",
        H: "HOLD",
        S: "SOLD",
    };
    return availabilityMap[availability] || availability;
};

// Helper function to calculate total price
export const calculateTotalPrice = (
    weight: number,
    pricePerCts: number
): number => {
    return weight * pricePerCts;
};
