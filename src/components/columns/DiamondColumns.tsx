// components/columns/DiamondColumns.tsx
import { Diamond } from "@/interface/diamondInterface";
import { Badge } from "@/components/ui/badge";
import { Eye, Circle } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export const getDiamondColumns = (
    onViewDetails: (diamond: Diamond) => void
) => [
    {
        key: "imageUrl",
        header: "Image",
        render: (row: Diamond) => (
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border">
                {/* Placeholder for actual image */}
                <span className="text-[10px] text-gray-500">
                    {row.shape.substring(0, 2)}
                </span>
            </div>
        ),
    },
    { key: "location", header: "Loc." },
    { key: "carat", header: "Carat", cellClassName: () => "font-bold" },
    { key: "color", header: "Color" },
    { key: "clarity", header: "Clarity" },
    { key: "cut", header: "Cut" },
    { key: "fluorescence", header: "Fluor" },
    { key: "lab", header: "Lab" },
    { key: "measurements", header: "Measurement" },
    {
        key: "rapPercent",
        header: "Rap %",
        render: (row: Diamond) => (
            <span
                className={
                    row.rapPercent < 0 ? "text-green-600" : "text-red-600"
                }
            >
                {row.rapPercent}%
            </span>
        ),
    },
    {
        key: "pricePerCarat",
        header: "Price/ct",
        render: (row: Diamond) => `$${row.pricePerCarat.toLocaleString()}`,
    },
    {
        key: "totalPrice",
        header: "Total",
        render: (row: Diamond) => (
            <span className="font-bold text-gray-900">
                ${row.totalPrice.toLocaleString()}
            </span>
        ),
    },
    {
        key: "status",
        header: "Status",
        render: (row: Diamond) => {
            const color =
                row.status === "AVAILABLE"
                    ? "bg-purple-100 text-purple-700"
                    : row.status === "SOLD"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700";
            return (
                <Badge className={`${color} text-[10px]`}>{row.status}</Badge>
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
                colorClass="text-blue-600 hover:text-blue-700"
            />
        ),
    },
];
