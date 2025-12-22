"use client";
import React, { useState, useEffect, useCallback } from "react";
import { List, LayoutGrid } from "lucide-react";
import DataTable from "@/components/ui/table";
import TablePagination from "@/components/ui/tablePagination";
import { DiamondFilters } from "@/components/inventory/diamonFilter";
import { getDiamondColumns } from "@/components/columns/DiamondColumns";
import { fetchDiamonds, searchDiamonds } from "@/services/diamondService";
import {
    Diamond,
    DiamondShape,
    DiamondColor,
    DiamondClarity,
    DiamondCut,
} from "@/interface/diamondInterface";
import { Card, CardContent } from "@/components/ui/card";
import ShimmerTable from "@/components/ui/shimmerTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InventoryPage() {
    const [data, setData] = useState<Diamond[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [view, setView] = useState("list");
    // Pagination & Sort State
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [sortBy, setSortBy] = useState("weight");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // Filter State
    const [filterState, setFilterState] = useState({
        shapes: [] as DiamondShape[],
        caratRange: [0, 10.99] as [number, number],
        colors: [] as DiamondColor[],
        clarities: [] as DiamondClarity[],
        cuts: [] as DiamondCut[],
        polish: [] as DiamondCut[],
        symmetry: [] as DiamondCut[],
        fluorescence: [] as string[],
        lab: [] as string[],
        priceRange: [0, 1000000] as [number, number],
        lengthRange: [0, 20] as [number, number],
        widthRange: [0, 20] as [number, number],
        depthRange: [0, 20] as [number, number],
        depthPercentRange: [40, 90] as [number, number],
        tablePercentRange: [40, 90] as [number, number],
    });

    // Check if any filters are applied
    const hasActiveFilters = useCallback(() => {
        return (
            filterState.shapes.length > 0 ||
            filterState.colors.length > 0 ||
            filterState.clarities.length > 0 ||
            filterState.cuts.length > 0 ||
            filterState.polish.length > 0 ||
            filterState.symmetry.length > 0 ||
            filterState.fluorescence.length > 0 ||
            filterState.lab.length > 0 ||
            filterState.caratRange[0] > 0 ||
            filterState.caratRange[1] < 30 ||
            filterState.priceRange[0] > 0 ||
            filterState.priceRange[1] < 1000000 ||
            filterState.lengthRange[0] > 0 ||
            filterState.lengthRange[1] < 20 ||
            filterState.widthRange[0] > 0 ||
            filterState.widthRange[1] < 20 ||
            filterState.depthRange[0] > 0 ||
            filterState.depthRange[1] < 20 ||
            filterState.depthPercentRange[0] > 40 ||
            filterState.depthPercentRange[1] < 90 ||
            filterState.tablePercentRange[0] > 40 ||
            filterState.tablePercentRange[1] < 90
        );
    }, [filterState]);

    const loadData = useCallback(
        async (useSearchApi: boolean = false) => {
            setLoading(true);
            try {
                const params = {
                    page,
                    limit: rowsPerPage,
                    shapes:
                        filterState.shapes.length > 0
                            ? filterState.shapes
                            : undefined,
                    colors:
                        filterState.colors.length > 0
                            ? filterState.colors
                            : undefined,
                    clarities:
                        filterState.clarities.length > 0
                            ? filterState.clarities
                            : undefined,
                    cuts:
                        filterState.cuts.length > 0
                            ? filterState.cuts
                            : undefined,
                    polish:
                        filterState.polish.length > 0
                            ? filterState.polish
                            : undefined,
                    symmetry:
                        filterState.symmetry.length > 0
                            ? filterState.symmetry
                            : undefined,
                    fluorescence:
                        filterState.fluorescence.length > 0
                            ? filterState.fluorescence
                            : undefined,
                    lab:
                        filterState.lab.length > 0
                            ? filterState.lab
                            : undefined,
                    minPrice:
                        filterState.priceRange[0] > 0
                            ? filterState.priceRange[0]
                            : undefined,
                    maxPrice:
                        filterState.priceRange[1] < 1000000
                            ? filterState.priceRange[1]
                            : undefined,
                    minCarat:
                        filterState.caratRange[0] > 0
                            ? filterState.caratRange[0]
                            : undefined,
                    maxCarat:
                        filterState.caratRange[1] < 30
                            ? filterState.caratRange[1]
                            : undefined,
                    minLength:
                        filterState.lengthRange[0] > 0
                            ? filterState.lengthRange[0]
                            : undefined,
                    maxLength:
                        filterState.lengthRange[1] < 20
                            ? filterState.lengthRange[1]
                            : undefined,
                    minWidth:
                        filterState.widthRange[0] > 0
                            ? filterState.widthRange[0]
                            : undefined,
                    maxWidth:
                        filterState.widthRange[1] < 20
                            ? filterState.widthRange[1]
                            : undefined,
                    minDepth:
                        filterState.depthRange[0] > 0
                            ? filterState.depthRange[0]
                            : undefined,
                    maxDepth:
                        filterState.depthRange[1] < 20
                            ? filterState.depthRange[1]
                            : undefined,
                    minTable:
                        filterState.tablePercentRange[0] > 40
                            ? filterState.tablePercentRange[0]
                            : undefined,
                    maxTable:
                        filterState.tablePercentRange[1] < 90
                            ? filterState.tablePercentRange[1]
                            : undefined,
                    minDepthPercent:
                        filterState.depthPercentRange[0] > 40
                            ? filterState.depthPercentRange[0]
                            : undefined,
                    maxDepthPercent:
                        filterState.depthPercentRange[1] < 90
                            ? filterState.depthPercentRange[1]
                            : undefined,
                    sortBy,
                    sortOrder,
                };

                // Use search API if filters are applied, otherwise use regular fetch
                const result = useSearchApi
                    ? await searchDiamonds(params)
                    : await fetchDiamonds(params);

                setData(result.data);
                setTotalCount(result.totalCount);
                setTotalPages(result.totalPages);
                setHasNextPage(result.hasNextPage);
                setHasPrevPage(result.hasPrevPage);
            } catch (error) {
                console.error("Failed to fetch diamonds", error);
            } finally {
                setLoading(false);
            }
        },
        [page, rowsPerPage, sortBy, sortOrder, filterState]
    );

    // Auto-load data whenever filters, pagination, or sorting changes
    useEffect(() => {
        // Add a small debounce to prevent too many API calls
        const timeoutId = setTimeout(() => {
            loadData(hasActiveFilters());
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [loadData, hasActiveFilters]);

    const handleReset = () => {
        setFilterState({
            shapes: [],
            caratRange: [0, 30],
            colors: [],
            clarities: [],
            cuts: [],
            polish: [],
            symmetry: [],
            fluorescence: [],
            lab: [],
            priceRange: [0, 1000000],
            lengthRange: [0, 20],
            widthRange: [0, 20],
            depthRange: [0, 20],
            depthPercentRange: [40, 90],
            tablePercentRange: [40, 90],
        });
        setPage(1);
    };

    const handleViewDetails = (diamond: Diamond) => {
        console.log("View diamond details:", diamond);
        // Implement your view details logic here (e.g., open a modal/drawer)
    };

    return (
        <div className="p-4 space-y-4 bg-primary-purple-dark min-h-screen mt-40">
            {/* 1. FILTER DASHBOARD */}
            <div className="flex flex-col rounded-lg w-full overflow-hidden border-primary border-2 mb-4">
                <div className="bg-primary-purple2 flex justify-start items-center gap-2">
                    <Button
                        variant={"ghost"}
                        className="text-white hover:text-white"
                    >
                        Natural Diamonds
                    </Button>
                    <Button
                        variant={"ghost"}
                        className="text-white hover:text-white"
                    >
                        Lab Diamonds
                    </Button>
                </div>
                <div className="bg-white flex justify-start items-center gap-2">
                    <Button variant={"ghost"} className="text-black">
                        White Diamonds
                    </Button>
                    <Button variant={"ghost"} className="text-black">
                        Fancy Color
                    </Button>
                    <Button variant={"ghost"} className="text-black">
                        Melee Diamonds
                    </Button>
                </div>
            </div>
            <DiamondFilters
                filters={filterState}
                setFilters={setFilterState}
                onReset={handleReset}
            />
            <div className="w-full bg-white rounded-lg px-2 py-1">
                <div className="flex items-center justify-between gap-4">
                    {/* Left side - Action buttons */}
                    <div className="flex items-center gap-1">
                        {/* List/Grid toggle buttons */}
                        <div className="flex items-center gap-0 rounded-md border border-gray-200 bg-white  w-fit">
                            {/* List View Button */}
                            <button
                                onClick={() => setView("list")}
                                className={`p-2 rounded-sm transition-all duration-200 ${
                                    view === "list"
                                        ? "bg-primary-purple2 text-white shadow-sm" // Active State (Deep Purple)
                                        : "text-gray-500 hover:bg-gray-100" // Inactive State
                                }`}
                            >
                                <List className="h-5 w-5" />
                            </button>

                            {/* Grid View Button */}
                            <button
                                onClick={() => setView("grid")}
                                className={`p-2 rounded-sm transition-all duration-200 ${
                                    view === "grid"
                                        ? "bg-primary-purple2 text-white shadow-sm"
                                        : "text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                <LayoutGrid className="h-5 w-5" />
                            </button>
                        </div>

                        <Button variant="outline" className="text-sm">
                            Reset Filters
                        </Button>
                        <Button variant="outline" className="text-sm">
                            Advanced Filters
                        </Button>
                        <Button variant="outline" className="text-sm">
                            Inquiry
                        </Button>
                        <Button variant="outline" className="text-sm">
                            Compare
                        </Button>
                    </div>

                    {/* Right side - Search */}
                    <div className="relative w-full max-w-sm">
                        <Input
                            type="text"
                            placeholder="Lot/Certificate"
                            className="h-10 w-full rounded-4xl border border-gray-300 pl-5 pr-28 focus-visible:ring-2 focus-visible:ring-primary-purple2"
                        />
                        <Button className="absolute right-0 top-0 h-full  rounded-4xl bg-gray-800 px-8 text-white hover:bg-gray-700">
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* 2. TABLE CARD */}
            <Card className="shadow-md rounded-lg overflow-hidden bg-white">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-4">
                            <ShimmerTable
                                rowCount={rowsPerPage}
                                columnCount={12}
                            />
                        </div>
                    ) : (
                        <div className="w-full overflow-x-auto">
                            {data.length > 0 ? (
                                <DataTable
                                    data={data}
                                    columns={getDiamondColumns(
                                        handleViewDetails
                                    )}
                                    columnStyles={{
                                        weight: "font-bold",
                                    }}
                                />
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <p className="text-lg font-medium">
                                        No diamonds found
                                    </p>
                                    <p className="text-sm mt-2">
                                        Try adjusting your filters or search
                                        criteria
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 3. PAGINATION */}
                    {!loading && data.length > 0 && (
                        <div className="border-t p-2">
                            <TablePagination
                                total={totalCount}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                totalPages={totalPages}
                                hasNextPage={hasNextPage}
                                hasPrevPage={hasPrevPage}
                                onPageChange={setPage}
                                onRowsPerPageChange={(newRowsPerPage) => {
                                    setRowsPerPage(newRowsPerPage);
                                    setPage(1);
                                }}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
