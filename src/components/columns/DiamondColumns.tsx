// components/columns/DiamondColumns.tsx
import {
    Diamond,
    getShapeFullName,
    calculateTotalPrice,
} from "@/interface/diamondInterface";
import { Badge } from "@/components/ui/badge";
import { PublicDiamond } from "@/interface/diamondInterface";
import Link from "next/link";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export interface PrivateColumn<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (row: Diamond) => React.ReactNode;
    cellClassName?: (row: Diamond) => string;
    sortable?: boolean; // Add sortable flag
}
export interface PublicColumn<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (row: PublicDiamond) => React.ReactNode;
    cellClassName?: (row: PublicDiamond) => string;
    sortable?: boolean; // Add sortable flag
}

// Helper component for sortable headers
const SortableHeader = ({
    label,
    columnKey,
    currentSortBy,
    currentSortOrder,
    onSort,
}: {
    label: string;
    columnKey: string;
    currentSortBy: string;
    currentSortOrder: "asc" | "desc";
    onSort: (key: string) => void;
}) => {
    const isActive = currentSortBy === columnKey;

    return (
        <button
            onClick={() => onSort(columnKey)}
            className="flex items-center gap-1 cursor-pointer"
        >
            <span>{label}</span>
            {isActive ? (
                currentSortOrder === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                ) : (
                    <ArrowDown className="h-4 w-4" />
                )
            ) : (
                <ArrowUpDown className="h-4 w-4 opacity-40" />
            )}
        </button>
    );
};

export const getDiamondColumns = (
    onViewDetails: (diamond: Diamond) => void,
    onSort: (columnKey: string) => void,
    currentSortBy: string,
    currentSortOrder: "asc" | "desc",
): PrivateColumn<Diamond>[] => [
    {
        key: "stockRef",
        header: (
            <SortableHeader
                label="Stock Ref"
                columnKey="stockRef"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
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
        header: (
            <SortableHeader
                label="Shape"
                columnKey="shape"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row: Diamond) => getShapeFullName(row.shape),
    },
    {
        key: "weight",
        header: (
            <SortableHeader
                label="Carat"
                columnKey="weight"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        cellClassName: () => "font-normal",
    },
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
    {
        key: "depthPerc",
        header: (
            <SortableHeader
                label="Depth %"
                columnKey="depthPerc"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
    },
    {
        key: "tablePerc",
        header: (
            <SortableHeader
                label="Table %"
                columnKey="tablePerc"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
    },

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
        header: (
            <SortableHeader
                label="List Price"
                columnKey="priceListUSD"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row: Diamond) =>
            `$${row.priceListUSD ? row.priceListUSD.toLocaleString() : "N/A"}`,
    },
    {
        key: "pricePerCts",
        header: (
            <SortableHeader
                label="Price/ct"
                columnKey="pricePerCts"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row: Diamond) =>
            `$${row.pricePerCts ? row.pricePerCts.toLocaleString() : "N/A"}`,
    },
    {
        key: "discPerc",
        header: (
            <SortableHeader
                label="Disc %"
                columnKey="discPerc"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
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
    onSort: (columnKey: string) => void,
    currentSortBy: string,
    currentSortOrder: "asc" | "desc",
): PublicColumn<PublicDiamond>[] => [
    {
        key: "stockRef",
        header: (
            <SortableHeader
                label="Stock Ref"
                columnKey="stockRef"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
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
        header: (
            <SortableHeader
                label="Shape"
                columnKey="shape"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row: PublicDiamond) => getShapeFullName(row.shape),
    },
    {
        key: "weight",
        header: (
            <SortableHeader
                label="Carat"
                columnKey="weight"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        cellClassName: () => "font-normal",
    },
    {
        key: "color",
        header: (
            <SortableHeader
                label="Color"
                columnKey="color"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
    },
    {
        key: "clarity",
        header: (
            <SortableHeader
                label="Clarity"
                columnKey="clarity"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
    },
    { key: "shade", header: "Shade" },
    {
        key: "cutGrade",
        header: (
            <SortableHeader
                label="Cut"
                columnKey="cutGrade"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
    },
    {
        key: "polish",
        header: (
            <SortableHeader
                label="Polish"
                columnKey="polish"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
    },
    {
        key: "symmetry",
        header: (
            <SortableHeader
                label="Symmetry"
                columnKey="symmetry"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
    },
    { key: "fluorescenceIntensity", header: "Fluor Intensity" },
    { key: "fluorescenceColor", header: "Fluor Color" },
    {
        key: "measurements",
        header: "Measurement",
        render: (row: PublicDiamond) =>
            row.length && row.width && row.height
                ? `${row.length.toFixed(2)} x ${row.width.toFixed(2)} x ${row.height.toFixed(2)}`
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
