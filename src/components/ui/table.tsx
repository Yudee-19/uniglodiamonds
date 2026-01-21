import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Diamond } from "@/interface/diamondInterface";
import { Column } from "@/components/columns/DiamondColumns";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableProps<T extends { _id: string }> {
    data: Diamond[];
    columns: Column<T>[];
    onRowClick?: (row: Diamond) => void;
    enableSelection?: boolean;
    columnStyles?: Record<string, string>;
    selectedDiamonds?: Diamond[];
    onSelectionChange?: (diamonds: Diamond[]) => void;
}

function DataTable<T extends { _id: string }>({
    data,
    columns,
    onRowClick,
    enableSelection = false,
    columnStyles = {},
    selectedDiamonds,
    onSelectionChange,
}: DataTableProps<T>) {
    const [internalSelected, setInternalSelected] = useState<Diamond[]>([]);

    // Determine if we are using controlled (props) or uncontrolled (internal state) mode
    const selected =
        selectedDiamonds !== undefined ? selectedDiamonds : internalSelected;

    const updateSelection = (newSelection: Diamond[]) => {
        if (onSelectionChange) {
            onSelectionChange(newSelection);
        } else {
            setInternalSelected(newSelection);
        }
    };

    const allSelected = data.length > 0 && selected.length === data.length;
    const someSelected = selected.length > 0 && selected.length < data.length;

    const toggleSelectAll = () => {
        if (allSelected) updateSelection([]);
        else updateSelection(data.map((r) => r));
    };

    const toggleRow = (diamond: Diamond) => {
        const newSelection = selected.includes(diamond)
            ? selected.filter((x) => x !== diamond)
            : [...selected, diamond];
        updateSelection(newSelection);
    };

    const getCellContent = (col: Column<T>, row: Diamond) => {
        if (col.render) {
            return col.render(row);
        }
        const value = row[col.key as keyof Diamond];

        // Handle empty/null/undefined values
        if (value === null || value === undefined || value === "") {
            return <span className="text-gray-800">N/A</span>;
        }

        return value as React.ReactNode;
    };

    const getTextContent = (content: React.ReactNode): string => {
        if (typeof content === "string") return content;
        if (typeof content === "number") return content.toString();
        if (React.isValidElement(content)) {
            // Cast to an element that specifically has children in its props
            const element = content as React.ReactElement<{
                children?: React.ReactNode;
            }>;

            // Use optional chaining just in case children don't exist
            return getTextContent(element.props.children);
        }

        if (Array.isArray(content)) {
            return content.map(getTextContent).join("");
        }
        return "";
    };

    return (
        <div
            className="w-full h-full overflow-auto  rounded "
            data-slot="table-container"
        >
            <table data-slot="table" className="min-w-[70vh] w-full  text-left">
                <thead className="sticky top-0 z-10 bg-primary-purple-dark border-b border-gray-200">
                    <tr className="  data-[state=selected]:bg-muted border-b transition-colors ">
                        {enableSelection && (
                            <th className="p-2 pl-5  h-10 text-left table-10px align-middle whitespace-nowrap font-semibold text-white">
                                <Checkbox
                                    className="border-white"
                                    checked={
                                        allSelected
                                            ? true
                                            : someSelected
                                              ? "indeterminate"
                                              : false
                                    }
                                    onCheckedChange={toggleSelectAll}
                                />
                            </th>
                        )}
                        {columns.map((col) => (
                            <th
                                key={col.key.toString()}
                                className={`p-2 pl-5 h-10 text-left table-10px align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5  text-sm", ${
                                    col.key === "id" || col.key === "userId"
                                        ? "font-bold text-white"
                                        : "font-semibold text-white"
                                }  cursor-pointer`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={
                                    columns.length + (enableSelection ? 1 : 0)
                                }
                                className="text-center  p-4 text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr
                                key={row._id}
                                className=" cursor-pointer bg-white even:bg-primary-yellow-1/10 transition-colors"
                                onClick={() => onRowClick?.(row)}
                            >
                                {enableSelection && (
                                    <td className="p-2 pl-5 border-b">
                                        <Checkbox
                                            checked={selected.includes(row)}
                                            onCheckedChange={() =>
                                                toggleRow(row)
                                            }
                                        />
                                    </td>
                                )}
                                {columns.map((col) => {
                                    const cellContent = getCellContent(
                                        col,
                                        row,
                                    );
                                    const textContent =
                                        getTextContent(cellContent);
                                    const shouldShowTooltip =
                                        textContent.length > 30;

                                    return (
                                        <td
                                            key={col.key.toString()}
                                            className={`p-2 pl-5 whitespace-nowrap border-b t hover:bg-gray-50/60 font-lato ${
                                                col.cellClassName
                                                    ? col.cellClassName(row)
                                                    : ""
                                            } ${
                                                columnStyles?.[
                                                    col.key.toString()
                                                ] || "text-gray-800 text-sm"
                                            }`}
                                            data-slot="table-cell"
                                        >
                                            {shouldShowTooltip ? (
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="truncate max-w-[200px]">
                                                            {cellContent}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        {textContent}
                                                    </TooltipContent>
                                                </Tooltip>
                                            ) : (
                                                cellContent
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
