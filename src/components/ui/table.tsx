import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Diamond } from "@/interface/diamondInterface";
import { Column } from "@/components/columns/DiamondColumns";

interface DataTableProps<T extends { _id: string }> {
    data: Diamond[];
    columns: Column<T>[];
    onRowClick?: (row: Diamond) => void;
    enableSelection?: boolean;
    columnStyles?: Record<string, string>;
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
}

function DataTable<T extends { _id: string }>({
    data,
    columns,
    onRowClick,
    enableSelection = false,
    columnStyles = {},
    selectedIds,
    onSelectionChange,
}: DataTableProps<T>) {
    const [internalSelected, setInternalSelected] = useState<string[]>([]);

    // Determine if we are using controlled (props) or uncontrolled (internal state) mode
    const selected = selectedIds !== undefined ? selectedIds : internalSelected;

    const updateSelection = (newSelection: string[]) => {
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
        else updateSelection(data.map((r) => r.certiNo));
    };

    const toggleRow = (id: string) => {
        const newSelection = selected.includes(id)
            ? selected.filter((x) => x !== id)
            : [...selected, id];
        updateSelection(newSelection);
    };

    return (
        <div
            className="w-full h-full overflow-auto  rounded bg-red-400"
            data-slot="table-container"
        >
            <table
                data-slot="table"
                className="min-w-[70vh] w-full text-xs text-left"
            >
                <thead className="sticky top-0 z-10 bg-gray-200 border-b border-gray-200">
                    <tr className=" hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ">
                        {enableSelection && (
                            <th className="p-2 pl-5  h-10 text-left table-10px align-middle whitespace-nowrap font-semibold text-gray-900">
                                <Checkbox
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
                                className={`p-2 pl-5 h-10 text-left table-10px align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5  text-xs", ${
                                    col.key === "id" || col.key === "userId"
                                        ? "font-bold text-gray-900"
                                        : "font-semibold text-gray-900"
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
                                className="text-center p-4 text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr
                                key={row._id}
                                className="hover:bg-gray-50 cursor-pointer bg-white"
                                onClick={() => onRowClick?.(row)}
                            >
                                {enableSelection && (
                                    <td className="p-2 pl-5 border-b">
                                        <Checkbox
                                            checked={selected.includes(
                                                row.certiNo
                                            )}
                                            onCheckedChange={() =>
                                                toggleRow(row.certiNo)
                                            }
                                        />
                                    </td>
                                )}
                                {columns.map((col) => (
                                    <td
                                        key={col.key.toString()}
                                        className={`p-2 pl-5 whitespace-nowrap border-b t hover:bg-gray-50 font-lato ${
                                            col.cellClassName
                                                ? col.cellClassName(row)
                                                : ""
                                        } ${
                                            columnStyles?.[
                                                col.key.toString()
                                            ] || "text-gray-800"
                                        }`}
                                        data-slot="table-cell"
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : (row[
                                                  col.key as keyof Diamond
                                              ] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
