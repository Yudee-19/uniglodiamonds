// interfaces/diamond.interface.ts

export type DiamondShape =
    | "Round"
    | "Princess"
    | "Pear"
    | "Oval"
    | "Emerald"
    | "Cushion"
    | "Marquise"
    | "Radiant"
    | "Heart"
    | "Asscher";
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
    | "O-Z";
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
    | "I2";
export type DiamondCut = "EX" | "VG" | "G" | "F" | "I" | "NA";
export type DiamondLab = "GIA" | "IGI" | "HRD" | "OTHERS";

export interface Diamond {
    id: string;
    lotNumber: string;
    imageUrl: string;
    shape: DiamondShape;
    carat: number;
    color: DiamondColor;
    clarity: DiamondClarity;
    cut: DiamondCut;
    polish: DiamondCut;
    symmetry: DiamondCut;
    fluorescence: "NON" | "FNT" | "MED" | "STG" | "VSL";
    lab: DiamondLab;
    certificateNumber: string;
    measurements: string;
    location: string;
    rapPercent: number;
    pricePerCarat: number;
    totalPrice: number;
    status: "AVAILABLE" | "HOLD" | "SOLD" | "MEMO";
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
