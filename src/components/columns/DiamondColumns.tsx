// components/columns/DiamondColumns.tsx
import {
    Diamond,
    getShapeFullName,
    calculateTotalPrice,
} from "@/interface/diamondInterface";
import { Badge } from "@/components/ui/badge";
import { PublicDiamond } from "@/interface/diamondInterface";
import Link from "next/link";

export interface PrivateColumn<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (row: Diamond) => React.ReactNode;
    cellClassName?: (row: Diamond) => string;
}
export interface PublicColumn<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (row: PublicDiamond) => React.ReactNode;
    cellClassName?: (row: PublicDiamond) => string;
}

export const getDiamondColumns = (
    onViewDetails: (diamond: Diamond) => void,
): PrivateColumn<Diamond>[] => [
    {
        key: "stockRef",
        header: "Stock Ref",
        render: (row: Diamond) => (
            <div
                className="flex items-center gap-2 cursor-pointer text-primary-purple hover:underline hover:text-primary-yellow-1 font-bold p-0"
                onClick={() => onViewDetails(row)}
            >
                {row.stockRef}
            </div>
        ),
    },
    {
        key: "availability",
        header: "Status",
        render: (row: Diamond) => {
            const color =
                row.availability === "A"
                    ? "bg-primary-purple text-white"
                    : row.availability === "S"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-primary-purple";
            return (
                <Badge className={`${color} text-xs rounded-[2] px-2 py-1`}>
                    {row.availability ? row.availability : "UNKNOWN"}
                </Badge>
            );
        },
    },

    // --- Basic Specs ---
    {
        key: "shape",
        header: "Shape",
        render: (row: Diamond) => getShapeFullName(row.shape),
    },
    { key: "weight", header: "Carat", cellClassName: () => "font-normal" },
    { key: "color", header: "Color" },
    { key: "clarity", header: "Clarity" },
    { key: "shade", header: "Shade" },

    // --- Cut & Finish ---
    { key: "cutGrade", header: "Cut" },
    { key: "polish", header: "Polish" },
    { key: "symmetry", header: "Symmetry" },

    // --- Fluorescence ---
    { key: "fluorescenceIntensity", header: "Fluor Intensity" },
    { key: "fluorescenceColor", header: "Fluor Color" },

    // --- Dimensions & Proportions ---
    {
        key: "measurements",
        header: "Measurement",
        render: (row: Diamond) =>
            row.length && row.width && row.height
                ? `${row.length.toFixed(2)} x ${row.width.toFixed(
                      2,
                  )} x ${row.height.toFixed(2)}`
                : row.measurements,
    },
    { key: "length", header: "Length" },
    { key: "width", header: "Width" },
    { key: "height", header: "Height" },
    { key: "depthPerc", header: "Depth %" },
    { key: "tablePerc", header: "Table %" },
    { key: "crownAngle", header: "Crown Angle" },
    { key: "crownHeight", header: "Crown Height" },
    { key: "pavalionAngle", header: "Pavilion Angle" },
    { key: "pavalionDepth", header: "Pavilion Depth" },

    // --- Girdle & Culet ---
    { key: "girdle", header: "Girdle" },
    { key: "girdleThin", header: "Girdle Thin" },
    { key: "girdlePerc", header: "Girdle %" },
    { key: "girdleCondition", header: "Girdle Condition" },
    { key: "culetSize", header: "Culet Size" },
    { key: "culetCondition", header: "Culet Condition" },

    // --- Certification & Lab ---
    { key: "lab", header: "Lab" },
    { key: "certiNo", header: "Cert No" },
    {
        key: "certIssueDate",
        header: "Cert Issue Date",
        render: (row: Diamond) =>
            row.certIssueDate
                ? new Date(row.certIssueDate).toLocaleDateString()
                : "N/A",
    },
    { key: "certComment", header: "Cert Comment" },
    { key: "laserInscription", header: "Laser Inscription" },

    // --- Pricing ---
    {
        key: "priceListUSD",
        header: "List Price",
        render: (row: Diamond) =>
            `$${row.priceListUSD ? row.priceListUSD.toLocaleString() : "N/A"}`,
    },
    {
        key: "pricePerCts",
        header: "Price/ct",
        render: (row: Diamond) =>
            `$${row.pricePerCts ? row.pricePerCts.toLocaleString() : "N/A"}`,
    },
    {
        key: "discPerc",
        header: "Disc %",
        render: (row: Diamond) => (
            <span
                className={row.discPerc > 0 ? "text-green-600" : "text-red-600"}
            >
                {row.discPerc}%
            </span>
        ),
    },
    { key: "cashDiscPerc", header: "Cash Disc %" },
    {
        key: "cashDiscPrice",
        header: "Cash Disc Price",
        render: (row: Diamond) =>
            `$${row.cashDiscPrice ? row.cashDiscPrice.toLocaleString() : "N/A"}`,
    },
    {
        key: "totalPrice",
        header: "Total",
        render: (row: Diamond) => {
            return <span className=" text-gray-900">${row.priceListUSD}</span>;
        },
    },

    // --- Inclusions & Comments ---
    {
        key: "keyToSymbols",
        header: "Key Symbols",
        render: (row: Diamond) =>
            row.keyToSymbols?.length > 0 ? row.keyToSymbols.join(", ") : "N/A",
    },
    { key: "milky", header: "Milky" },
    { key: "blackinclusion", header: "Black Inclusion" },
    { key: "eyeClean", header: "Eye Clean" },
    { key: "memberComment", header: "Comment" },
    { key: "handA", header: "H&A" },
    { key: "identificationMarks", header: "ID Marks" },
    { key: "enhancements", header: "Enhancements" },
    { key: "treatment", header: "Treatment" },

    // --- Fancy Color Details ---
    { key: "origin", header: "Origin" },
    { key: "fancyColor", header: "Fancy Color" },
    { key: "fancyIntensity", header: "Fancy Intensity" },
    { key: "fancyOvertone", header: "Fancy Overtone" },

    // --- Location & Logistics ---
    { key: "city", header: "City" },
    { key: "state", header: "State" },
    { key: "country", header: "Country" },

    // --- Pairing ---
    { key: "pairStockRef", header: "Pair Stock Ref" },
    {
        key: "isMatchedPairSeparable",
        header: "Pair Separable",
        render: (row: Diamond) => (row.isMatchedPairSeparable ? "Yes" : "No"),
    },
];

// Add new function for public columns
export const getPublicDiamondColumns = (
    onViewDetails: (diamond: PublicDiamond) => void,
): PublicColumn<PublicDiamond>[] => [
    {
        key: "stockRef",
        header: "Stock Ref",
        render: (row: PublicDiamond) => (
            <div
                className="flex items-center gap-2 cursor-pointer text-primary-purple hover:underline hover:text-primary-yellow-1 font-bold p-0"
                onClick={() => onViewDetails(row)}
            >
                {row.stockRef}
            </div>
        ),
    },
    {
        key: "availability",
        header: "Status",
        render: (row: PublicDiamond) => {
            const color =
                row.availability === "A"
                    ? "bg-primary-purple text-white"
                    : row.availability === "S"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-primary-purple";
            return (
                <Badge className={`${color} text-xs rounded-[2] px-2 py-1`}>
                    {row.availability ? row.availability : "UNKNOWN"}
                </Badge>
            );
        },
    },
    {
        key: "shape",
        header: "Shape",
        render: (row: PublicDiamond) => getShapeFullName(row.shape),
    },
    { key: "weight", header: "Carat", cellClassName: () => "font-normal" },
    { key: "color", header: "Color" },
    { key: "clarity", header: "Clarity" },
    { key: "shade", header: "Shade" },
    { key: "cutGrade", header: "Cut" },
    { key: "polish", header: "Polish" },
    { key: "symmetry", header: "Symmetry" },
    { key: "fluorescenceIntensity", header: "Fluor Intensity" },
    { key: "fluorescenceColor", header: "Fluor Color" },
    {
        key: "measurements",
        header: "Measurement",
        render: (row: PublicDiamond) =>
            row.length && row.width && row.height
                ? `${row.length.toFixed(2)} x ${row.width.toFixed(
                      2,
                  )} x ${row.height.toFixed(2)}`
                : row.measurements,
    },
    { key: "depthPerc", header: "Depth %" },
    { key: "tablePerc", header: "Table %" },
    { key: "lab", header: "Lab" },
    {
        key: "certIssueDate",
        header: "Cert Issue Date",
        render: (row: PublicDiamond) =>
            row.certIssueDate
                ? new Date(row.certIssueDate).toLocaleDateString()
                : "N/A",
    },
    { key: "country", header: "Country" },
    {
        key: "price",
        header: "Price",
        render: () => (
            <div className="flex items-center gap-2 cursor-pointer text-primary-purple hover:underline hover:text-primary-yellow-1 font-bold p-0">
                <Link href="/login">Login to view price</Link>
            </div>
        ),
    },
];
