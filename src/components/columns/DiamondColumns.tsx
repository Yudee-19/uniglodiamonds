// components/columns/DiamondColumns.tsx
import {
    Diamond,
    getShapeFullName,
    getAvailabilityText,
    calculateTotalPrice,
} from "@/interface/diamondInterface";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export interface Column<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (row: Diamond) => React.ReactNode;
    cellClassName?: (row: Diamond) => string;
}

export const getDiamondColumns = (
    onViewDetails: (diamond: Diamond) => void
): Column<Diamond>[] => [
    {
        key: "webLink",
        header: "Image",
        render: (row: Diamond) => (
            <div
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border cursor-pointer hover:ring-2 hover:ring-primary-purple2 transition-all"
                onClick={() => onViewDetails(row)}
            >
                {row.webLink ? (
                    <img
                        src={row.webLink}
                        alt={`${getShapeFullName(row.shape)} diamond`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-[10px] text-gray-500">
                        {row.shape}
                    </span>
                )}
            </div>
        ),
    },
    { key: "country", header: "Loc." },
    { key: "weight", header: "Carat", cellClassName: () => "font-normal" },
    { key: "color", header: "Color" },
    { key: "clarity", header: "Clarity" },
    { key: "cutGrade", header: "Cut" },
    { key: "fluorescenceIntensity", header: "Fluor" },
    { key: "lab", header: "Lab" },
    {
        key: "measurements",
        header: "Measurement",
        render: (row: Diamond) =>
            row.length && row.width && row.height
                ? `${row.length.toFixed(2)} x ${row.width.toFixed(
                      2
                  )} x ${row.height.toFixed(2)}`
                : row.measurements,
    },
    {
        key: "discPerc",
        header: "Disc %",
        render: (row: Diamond) => (
            <span
                className={row.discPerc < 0 ? "text-green-600" : "text-red-600"}
            >
                {row.discPerc}%
            </span>
        ),
    },
    {
        key: "pricePerCts",
        header: "Price/ct",
        render: (row: Diamond) =>
            `$${row.pricePerCts ? row.pricePerCts.toLocaleString() : "N/A"}`,
    },
    {
        key: "totalPrice",
        header: "Total",
        render: (row: Diamond) => {
            const total = calculateTotalPrice(row.weight, row.pricePerCts);
            return (
                <span className=" text-gray-900">
                    ${total.toLocaleString()}
                </span>
            );
        },
    },
    {
        key: "availability",
        header: "Status",
        render: (row: Diamond) => {
            const statusText = getAvailabilityText(row.availability);
            const color =
                row.availability === "A"
                    ? "bg-primary-purple text-white"
                    : row.availability === "S"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700";
            return (
                <Badge className={`${color} text-xs rounded-[2] px-2 py-1`}>
                    {statusText ? statusText : "UNKNOWN"}
                </Badge>
            );
        },
    },
    {
        key: "actions",
        header: "View",
        render: (row: Diamond) => (
            <ActionButtonWithTooltip
                icon={<Eye className="w-4 h-4" />}
                tooltip="View Details"
                onClick={() => onViewDetails(row)}
                colorClass="text-primary-purple2 hover:text-primary-purple2"
            />
        ),
    },
];
