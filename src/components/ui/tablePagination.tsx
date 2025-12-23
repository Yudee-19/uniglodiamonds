import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Define interface directly in this file
interface TablePaginationProps {
    total: number;
    page: number;
    rowsPerPage: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
    total,
    page,
    rowsPerPage,
    totalPages,
    hasNextPage = false,
    hasPrevPage = false,
    onPageChange,
    onRowsPerPageChange,
}) => {
    // Add safety checks and defaults
    const safeTotal = Math.max(0, total || 0);
    const safePage = Math.max(1, page || 1);
    const safeRowsPerPage = Math.max(1, rowsPerPage || 10);
    const safeTotalPages =
        totalPages || Math.ceil(safeTotal / safeRowsPerPage) || 1;

    const start = safeTotal === 0 ? 0 : (safePage - 1) * safeRowsPerPage + 1;
    const end = Math.min(start + safeRowsPerPage - 1, safeTotal);

    const [inputPage, setInputPage] = useState<string>("");

    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (safeTotalPages <= 7) {
            for (let i = 1; i <= safeTotalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (safePage > 3) pages.push("...");

            const startPage = Math.max(2, safePage - 2);
            const endPage = Math.min(safeTotalPages - 1, safePage + 2);

            for (let i = startPage; i <= endPage; i++) pages.push(i);

            if (safePage < safeTotalPages - 2) pages.push("...");
            pages.push(safeTotalPages);
        }
        return pages;
    };

    const num = Number(inputPage);
    const isValid = !isNaN(num) && num >= 1 && num <= safeTotalPages;

    const handlePageJump = () => {
        if (isValid) {
            onPageChange(num);
            setInputPage("");
        }
    };

    // Don't render if no data
    if (safeTotal === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mt-3 text-xs text-gray-600">
            {/* Rows per page */}
            <div className="flex gap-5 items-center">
                <div className="flex items-center gap-1">
                    <span className="hidden sm:inline">Rows:</span>
                    <Select
                        value={String(safeRowsPerPage)}
                        onValueChange={(val) =>
                            onRowsPerPageChange(Number(val))
                        }
                    >
                        <SelectTrigger className="w-14 h-7 text-xs px-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Range */}
                <span className="text-center">
                    {safeTotal === 0
                        ? "0–0 of 0"
                        : `${start}–${end} of ${safeTotal}`}
                </span>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap items-center justify-center gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2"
                    disabled={!hasPrevPage || safePage === 1}
                    onClick={() => onPageChange(safePage - 1)}
                >
                    Prev
                </Button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                    {getPageNumbers().map((p, i) =>
                        p === "..." ? (
                            <span key={i} className="px-1">
                                ...
                            </span>
                        ) : (
                            <Button
                                key={i}
                                variant={p === safePage ? "default" : "outline"}
                                size="sm"
                                className="h-7 w-7 p-0 text-xs"
                                onClick={() => onPageChange(Number(p))}
                            >
                                {p}
                            </Button>
                        )
                    )}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3"
                    disabled={!hasNextPage || safePage === safeTotalPages}
                    onClick={() => onPageChange(safePage + 1)}
                >
                    Next
                </Button>

                {/* Jump to page */}
                <div className="flex items-center gap-1">
                    <input
                        type="number"
                        value={inputPage}
                        onChange={(e) =>
                            setInputPage(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Go"
                        className={`w-12 h-7 border rounded px-1 text-xs text-center ${
                            inputPage && !isValid
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        min={1}
                        max={safeTotalPages}
                    />
                    <Button
                        size="sm"
                        className="h-7 px-2 text-xs"
                        variant="outline"
                        onClick={handlePageJump}
                        disabled={!isValid}
                    >
                        Go
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
