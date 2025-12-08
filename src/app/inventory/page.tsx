"use client";
import React, { useState, useEffect, useCallback } from "react";
import DataTable from "@/components/ui/table"; // Your existing component
import TablePagination from "@/components/ui/tablePagination"; // Your existing component
import { DiamondFilters } from "@/components/inventory/diamonFilter";
import { getDiamondColumns } from "@/components/columns/DiamondColumns";
import { fetchDiamonds } from "@/services/diamondService";
import {
    Diamond,
    DiamondShape,
    DiamondColor,
    DiamondClarity,
    DiamondCut,
} from "@/interface/diamondInterface";
import { Card, CardContent } from "@/components/ui/card";
import ShimmerTable from "@/components/ui/shimmerTable"; // Assuming you have this

export default function InventoryPage() {
    const [data, setData] = useState<Diamond[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    // Pagination & Sort State
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortBy, setSortBy] = useState("totalPrice"); // Default sort
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // Filter State
    const [filterState, setFilterState] = useState({
        shapes: [] as DiamondShape[],
        caratRange: [0, 30] as [number, number],
        colors: [] as DiamondColor[],
        clarities: [] as DiamondClarity[],
        cuts: [] as any[], // Using any for simplicity or import specific type
        polish: [] as any[],
        symmetry: [] as any[],
        fluorescence: [] as string[],
        lab: [] as string[],
        priceRange: [0, 1000000] as [number, number],
        lengthRange: [0, 20] as [number, number],
        widthRange: [0, 20] as [number, number],
        depthRange: [0, 20] as [number, number],
        depthPercentRange: [40, 90] as [number, number],
        tablePercentRange: [40, 90] as [number, number],
    });

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await fetchDiamonds({
                page,
                limit: rowsPerPage,
                shapes: filterState.shapes.length ? filterState.shapes : undefined,
                colors: filterState.colors.length ? filterState.colors : undefined,
                clarities: filterState.clarities.length ? filterState.clarities : undefined,
                cuts: filterState.cuts.length ? filterState.cuts : undefined,
                polish: filterState.polish.length ? filterState.polish : undefined,
                symmetry: filterState.symmetry.length ? filterState.symmetry : undefined,
                fluorescence: filterState.fluorescence.length ? filterState.fluorescence : undefined,
                lab: filterState.lab.length ? filterState.lab : undefined,
                minPrice: filterState.priceRange[0] > 0 ? filterState.priceRange[0] : undefined,
                maxPrice: filterState.priceRange[1] < 1000000 ? filterState.priceRange[1] : undefined,
                minCarat: filterState.caratRange[0] > 0 ? filterState.caratRange[0] : undefined,
                maxCarat: filterState.caratRange[1] < 30 ? filterState.caratRange[1] : undefined,
                // Add other ranges as needed for the API
                sortBy,
                sortOrder,
            });
            setData(result.data);
            setTotalCount(result.totalCount);
        } catch (error) {
            console.error("Failed to fetch diamonds", error);
        } finally {
            setLoading(false);
        }
    }, [
        page,
        rowsPerPage,
        sortBy,
        sortOrder,
        filterState // Consolidated dependency
    ]);

    // Initial load
    useEffect(() => {
        loadData();
    }, [loadData]);

    // Handler for manual Search button click
    const handleSearch = () => {
        setPage(1);
        loadData();
    };

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
        // loadData(); // Optional: auto reload on reset or wait for search
    };

    return (
        <div className="p-4 space-y-4 bg-gray-50 min-h-screen mt-40">
            {/* 1. FILTER DASHBOARD */}
            <DiamondFilters
                filters={filterState}
                setFilters={setFilterState}
                onSearch={handleSearch}
                onReset={handleReset}
            />

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
                            <DataTable
                                data={data}
                                columns={getDiamondColumns((row) => {
                                    alert(
                                        `View details for Lot: ${row.lotNumber} \n(You can open a Drawer here like in BusinessContact)`
                                    );
                                })}
                                columnStyles={{
                                    lotNumber: "font-mono text-gray-500",
                                    totalPrice: "font-bold",
                                }}
                            />
                        </div>
                    )}

                    {/* 3. PAGINATION */}
                    <div className="border-t p-2">
                        <TablePagination
                            total={totalCount}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={setPage}
                            onRowsPerPageChange={setRowsPerPage}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
