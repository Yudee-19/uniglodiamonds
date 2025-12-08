import React from "react";

interface ShimmerTableProps {
    columnCount?: number; // how many columns
    rowCount?: number; // how many shimmer rows
    enableSelection?: boolean;
}

const ShimmerTable: React.FC<ShimmerTableProps> = ({
    columnCount = 5,
    rowCount = 5,
    enableSelection = false,
}) => {
    return (
        <div className="w-full max-w-full overflow-x-auto border rounded-sm">
            <table className="min-w-[800px] w-full text-xs text-left">
                <thead className="bg-gray-50">
                    <tr className="border-b">
                        {enableSelection && <th className="p-2 w-6"></th>}
                        {Array.from({ length: columnCount }).map((_, i) => (
                            <th
                                key={i}
                                className="p-2 text-gray-900 font-medium"
                            >
                                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="border-t">
                            {enableSelection && (
                                <td className="p-2">
                                    <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
                                </td>
                            )}
                            {Array.from({ length: columnCount }).map(
                                (_, colIndex) => (
                                    <td key={colIndex} className="p-2">
                                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShimmerTable;
