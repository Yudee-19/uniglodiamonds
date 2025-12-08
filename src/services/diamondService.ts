// services/diamondService.ts
import { Diamond, DiamondParams } from "@/interface/diamondInterface";

// 1. DUMMY DATA
const MOCK_DIAMONDS: Diamond[] = [
    {
        id: "1",
        lotNumber: "CS461853",
        imageUrl: "",
        shape: "Round",
        carat: 1.05,
        color: "E",
        clarity: "VS2",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        fluorescence: "NON",
        lab: "GIA",
        certificateNumber: "LG617423",
        measurements: "6.5x6.5x4.0",
        location: "Mumbai",
        rapPercent: -99.55,
        pricePerCarat: 225.0,
        totalPrice: 2274.72,
        status: "AVAILABLE",
    },
    {
        id: "2",
        lotNumber: "CS992811",
        imageUrl: "",
        shape: "Oval",
        carat: 2.71,
        color: "F",
        clarity: "VVS1",
        cut: "VG",
        polish: "VG",
        symmetry: "G",
        fluorescence: "FNT",
        lab: "IGI",
        certificateNumber: "LG881237",
        measurements: "10.1x8.0x5.1",
        location: "Mumbai",
        rapPercent: -25.0,
        pricePerCarat: 4500.0,
        totalPrice: 12195.0,
        status: "AVAILABLE",
    },
    {
        id: "3",
        lotNumber: "CS110293",
        imageUrl: "",
        shape: "Princess",
        carat: 1.5,
        color: "D",
        clarity: "IF",
        cut: "I",
        polish: "EX",
        symmetry: "EX",
        fluorescence: "NON",
        lab: "GIA",
        certificateNumber: "LG110293",
        measurements: "6.5x6.5x4.0",
        location: "NY",
        rapPercent: -10.0,
        pricePerCarat: 8000.0,
        totalPrice: 12000.0,
        status: "HOLD",
    },
    {
        id: "4",
        lotNumber: "CS774829",
        imageUrl: "",
        shape: "Pear",
        carat: 0.9,
        color: "H",
        clarity: "SI1",
        cut: "VG",
        polish: "G",
        symmetry: "VG",
        fluorescence: "MED",
        lab: "HRD",
        certificateNumber: "LG774829",
        measurements: "8.0x5.0x3.2",
        location: "London",
        rapPercent: -40.0,
        pricePerCarat: 3000.0,
        totalPrice: 2700.0,
        status: "AVAILABLE",
    },
    {
        id: "5",
        lotNumber: "CS332112",
        imageUrl: "",
        shape: "Cushion",
        carat: 3.01,
        color: "I",
        clarity: "VS1",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        fluorescence: "NON",
        lab: "GIA",
        certificateNumber: "LG332112",
        measurements: "9.0x8.5x5.5",
        location: "HK",
        rapPercent: -35.5,
        pricePerCarat: 5500.0,
        totalPrice: 16555.0,
        status: "AVAILABLE",
    },
    {
        id: "6",
        lotNumber: "CS551029",
        imageUrl: "",
        shape: "Emerald",
        carat: 5.05,
        color: "G",
        clarity: "VVS2",
        cut: "NA",
        polish: "VG",
        symmetry: "VG",
        fluorescence: "NON",
        lab: "IGI",
        certificateNumber: "LG551029",
        measurements: "11.0x8.0x5.0",
        location: "Antwerp",
        rapPercent: -30.0,
        pricePerCarat: 6200.0,
        totalPrice: 31310.0,
        status: "SOLD",
    },
    {
        id: "7",
        lotNumber: "CS662910",
        imageUrl: "",
        shape: "Radiant",
        carat: 1.02,
        color: "D",
        clarity: "FL",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        fluorescence: "NON",
        lab: "GIA",
        certificateNumber: "LG662910",
        measurements: "6.0x5.5x3.8",
        location: "Dubai",
        rapPercent: 0.0,
        pricePerCarat: 9000.0,
        totalPrice: 9180.0,
        status: "AVAILABLE",
    },
    {
        id: "8",
        lotNumber: "CS883921",
        imageUrl: "",
        shape: "Heart",
        carat: 0.5,
        color: "E",
        clarity: "SI2",
        cut: "VG",
        polish: "VG",
        symmetry: "G",
        fluorescence: "STG",
        lab: "OTHERS",
        certificateNumber: "LG883921",
        measurements: "5.0x5.0x3.0",
        location: "Surat",
        rapPercent: -55.0,
        pricePerCarat: 1200.0,
        totalPrice: 600.0,
        status: "AVAILABLE",
    },
    {
        id: "9",
        lotNumber: "CS229103",
        imageUrl: "",
        shape: "Marquise",
        carat: 1.2,
        color: "J",
        clarity: "VS2",
        cut: "G",
        polish: "G",
        symmetry: "F",
        fluorescence: "VSL",
        lab: "IGI",
        certificateNumber: "LG229103",
        measurements: "10.0x5.0x3.0",
        location: "NA",
        rapPercent: -45.0,
        pricePerCarat: 2100.0,
        totalPrice: 2520.0,
        status: "AVAILABLE",
    },
    {
        id: "10",
        lotNumber: "CS448291",
        imageUrl: "",
        shape: "Asscher",
        carat: 4.0,
        color: "F",
        clarity: "IF",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        fluorescence: "NON",
        lab: "GIA",
        certificateNumber: "LG448291",
        measurements: "9.0x9.0x6.0",
        location: "Tel Aviv",
        rapPercent: -15.0,
        pricePerCarat: 7500.0,
        totalPrice: 30000.0,
        status: "AVAILABLE",
    },
];

// 2. MOCK FETCH FUNCTION
export const fetchDiamonds = async (
    params: DiamondParams
): Promise<{ data: Diamond[]; totalCount: number }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = [...MOCK_DIAMONDS];

    // Apply filters
    if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(
            (d) =>
                d.lotNumber.toLowerCase().includes(q) ||
                d.certificateNumber.toLowerCase().includes(q)
        );
    }
    if (params.shapes && params.shapes.length > 0) {
        filtered = filtered.filter((d) => params.shapes!.includes(d.shape));
    }
    if (params.colors && params.colors.length > 0) {
        filtered = filtered.filter((d) => params.colors!.includes(d.color));
    }
    if (params.clarities && params.clarities.length > 0) {
        filtered = filtered.filter((d) => params.clarities!.includes(d.clarity));
    }
    if (params.cuts && params.cuts.length > 0) {
        filtered = filtered.filter((d) => params.cuts!.includes(d.cut));
    }
    if (params.polish && params.polish.length > 0) {
        filtered = filtered.filter((d) => params.polish!.includes(d.polish));
    }
    if (params.symmetry && params.symmetry.length > 0) {
        filtered = filtered.filter((d) => params.symmetry!.includes(d.symmetry));
    }
    if (params.fluorescence && params.fluorescence.length > 0) {
        // Note: Enum matching might be needed depending on exact values
        filtered = filtered.filter((d) => params.fluorescence!.includes(d.fluorescence));
    }
    if (params.lab && params.lab.length > 0) {
        filtered = filtered.filter((d) => params.lab!.includes(d.lab));
    }

    if (params.minPrice) {
        filtered = filtered.filter((d) => d.totalPrice >= params.minPrice!);
    }
    if (params.maxPrice) {
        filtered = filtered.filter((d) => d.totalPrice <= params.maxPrice!);
    }
    if (params.minCarat) {
        filtered = filtered.filter((d) => d.carat >= params.minCarat!);
    }
    if (params.maxCarat) {
        filtered = filtered.filter((d) => d.carat <= params.maxCarat!);
    }
    // Implement other ranges as needed (depth, table, etc.) if mock data has fields for them


    // Sorting (Mock)
    if (params.sortBy) {
        filtered.sort((a: any, b: any) => {
            if (a[params.sortBy!] < b[params.sortBy!])
                return params.sortOrder === "asc" ? -1 : 1;
            if (a[params.sortBy!] > b[params.sortBy!])
                return params.sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }

    // Pagination (Mock)
    const page = params.page || 1;
    const limit = params.limit || 10;
    const start = (page - 1) * limit;
    const paginatedData = filtered.slice(start, start + limit);

    return {
        data: paginatedData,
        totalCount: filtered.length,
    };
};
