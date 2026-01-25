"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
    List,
    LayoutGrid,
    Filter,
    X,
    Search, // New
    RotateCcw, // New (for Reset)
    ShoppingCart, // New (for Cart)
    Hand, // New (for Inquiry/Hand icon)
    Scale,
} from "lucide-react";
import DataTable from "@/components/ui/table";
import DiamondGrid from "@/components/ui/diamondGrid";
import TablePagination from "@/components/ui/tablePagination";
import { DiamondFilters } from "@/components/inventory/diamonFilter";
import {
    getDiamondColumns,
    getPublicDiamondColumns,
} from "@/components/columns/DiamondColumns";
import {
    fetchDiamonds,
    searchDiamonds,
    fetchPublicDiamonds,
} from "@/services/diamondService";
import {
    Diamond,
    DiamondShape,
    DiamondColor,
    DiamondClarity,
    DiamondCut,
    DiamondColorType,
    PublicDiamond,
} from "@/interface/diamondInterface";
import { Card, CardContent } from "@/components/ui/card";
import ShimmerTable from "@/components/ui/shimmerTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import DiamondDetailView from "@/components/inventory/DiamondDetailView";
import { toast } from "sonner";
import { addToCart } from "@/services/cartService";
import { useAuth } from "@/context/AuthContext";

function InventoryContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { isAuthenticated, loading: authLoading } = useAuth();

    // 2. Extract the View ID
    const viewId = searchParams.get("view");

    const [data, setData] = useState<(Diamond | PublicDiamond)[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [view, setView] = useState<"list" | "grid">("list");
    // Pagination & Sort State
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // State for selected diamonds
    const [selectedDiamonds, setSelectedDiamonds] = useState<
        (Diamond | PublicDiamond)[]
    >([]);
    const [addingToCart, setAddingToCart] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter State
    const [filterState, setFilterState] = useState({
        shape: [] as DiamondShape[],
        caratRange: [0, 10.99] as [number, number],
        color: [] as DiamondColor[],
        clarities: [] as DiamondClarity[],
        cutGrade: [] as DiamondCut[],
        polish: [] as DiamondCut[],
        symmetry: [] as DiamondCut[],
        fluorescence: [] as string[],
        lab: [] as string[],
        priceRange: [0, 1000000] as [number, number],
        pricePerCaratRange: [0, 1000000] as [number, number],
        discountRange: [-100, 100] as [number, number],
        lengthRange: [0, 20] as [number, number],
        widthRange: [0, 20] as [number, number],
        heightRange: [0, 20] as [number, number],
        depthRange: [0, 100] as [number, number],
        depthPercentRange: [40, 90] as [number, number],
        tablePercentRange: [40, 90] as [number, number],
        isNatural: undefined as boolean | undefined,
        colorType: undefined as DiamondColorType | undefined,
        searchTerm: undefined as string | undefined,
    });

    // Check if any filters are applied
    const hasActiveFilters = useCallback(() => {
        return (
            filterState.shape.length > 0 ||
            filterState.color.length > 0 ||
            filterState.clarities.length > 0 ||
            filterState.cutGrade.length > 0 ||
            filterState.polish.length > 0 ||
            filterState.symmetry.length > 0 ||
            filterState.fluorescence.length > 0 ||
            filterState.lab.length > 0 ||
            filterState.caratRange[0] > 0 ||
            filterState.caratRange[1] < 10.99 ||
            filterState.priceRange[0] > 0 ||
            filterState.priceRange[1] < 1000000 ||
            filterState.lengthRange[0] > 0 ||
            filterState.lengthRange[1] < 20 ||
            filterState.widthRange[0] > 0 ||
            filterState.widthRange[1] < 20 ||
            filterState.depthRange[0] > 0 ||
            filterState.depthRange[1] < 100 ||
            filterState.depthPercentRange[0] > 40 ||
            filterState.depthPercentRange[1] < 90 ||
            filterState.tablePercentRange[0] > 40 ||
            filterState.tablePercentRange[1] < 90 ||
            filterState.isNatural !== undefined ||
            filterState.colorType !== undefined ||
            filterState.searchTerm !== undefined
        );
    }, [filterState]);

    const loadData = useCallback(async () => {
        if (viewId) return;

        setLoading(true);
        try {
            const params = {
                page,
                limit: rowsPerPage,
                shape:
                    filterState.shape.length > 0
                        ? filterState.shape
                        : undefined,
                color:
                    filterState.color.length > 0
                        ? filterState.color
                        : undefined,
                clarities:
                    filterState.clarities.length > 0
                        ? filterState.clarities
                        : undefined,
                cutGrade:
                    filterState.cutGrade.length > 0
                        ? filterState.cutGrade
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
                lab: filterState.lab.length > 0 ? filterState.lab : undefined,
                minPrice:
                    filterState.priceRange[0] > 0
                        ? filterState.priceRange[0]
                        : undefined,
                maxPrice:
                    filterState.priceRange[1] < 1000000
                        ? filterState.priceRange[1]
                        : undefined,
                minPricePerCarat:
                    filterState.pricePerCaratRange[0] > 0
                        ? filterState.pricePerCaratRange[0]
                        : undefined,
                maxPricePerCarat:
                    filterState.pricePerCaratRange[1] < 1000000
                        ? filterState.pricePerCaratRange[1]
                        : undefined,
                minDiscount:
                    filterState.discountRange[0] > -100
                        ? filterState.discountRange[0]
                        : undefined,
                maxDiscount:
                    filterState.discountRange[1] < 100
                        ? filterState.discountRange[1]
                        : undefined,
                minCarat:
                    filterState.caratRange[0] > 0
                        ? filterState.caratRange[0]
                        : undefined,
                maxCarat:
                    filterState.caratRange[1] < 10.99
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
                minHeight:
                    filterState.heightRange[0] > 0
                        ? filterState.heightRange[0]
                        : undefined,
                maxHeight:
                    filterState.heightRange[1] < 20
                        ? filterState.heightRange[1]
                        : undefined,
                minDepth:
                    filterState.depthRange[0] > 0
                        ? filterState.depthRange[0]
                        : undefined,
                maxDepth:
                    filterState.depthRange[1] < 100
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
                isNatural: filterState.isNatural, // Add these new params
                colorType: filterState.colorType, // Add these new params
                searchTerm: filterState.searchTerm, // Add search term
            };

            let result;

            if (isAuthenticated) {
                // Logged in user - fetch private data
                result = await searchDiamonds(params);
                // : await fetchDiamonds(params);
            } else {
                // Public user - fetch public data
                result = await fetchPublicDiamonds(params);
            }

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
    }, [
        page,
        rowsPerPage,
        sortBy,
        sortOrder,
        filterState,
        isAuthenticated,
        viewId,
    ]);

    // Wait for auth to load before fetching data
    useEffect(() => {
        if (authLoading) return;

        const timeoutId = setTimeout(() => {
            loadData();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [loadData, hasActiveFilters, authLoading]);

    const handleReset = () => {
        setFilterState({
            shape: [],
            caratRange: [0, 10.99],
            color: [],
            clarities: [],
            cutGrade: [],
            polish: [],
            symmetry: [],
            fluorescence: [],
            lab: [],
            priceRange: [0, 1000000],
            pricePerCaratRange: [0, 1000000],
            discountRange: [-100, 100],
            lengthRange: [0, 20],
            widthRange: [0, 20],
            heightRange: [0, 20],
            depthRange: [0, 100],
            depthPercentRange: [40, 90],
            tablePercentRange: [40, 90],
            isNatural: undefined,
            colorType: undefined,
            searchTerm: undefined,
        });
        setPage(1);
        setSelectedDiamonds([]); // Clear selection on reset
    };

    const handleCompare = () => {
        if (selectedDiamonds.length < 2) {
            toast.warning("Please select at least 2 diamonds to compare");
            return;
        }
        const queryString = selectedDiamonds.map((d) => d.stockRef).join(",");
        router.push(`/compare?ids=${queryString}`);
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to add items to cart");
            router.push("/login");
            return;
        }

        if (selectedDiamonds.length === 0) {
            toast.warning("Please select diamonds to add to cart");
            return;
        }

        setAddingToCart(true);
        try {
            const diamondIds = selectedDiamonds
                .filter((d): d is Diamond => "_id" in d)
                .map((diamond) => diamond._id);

            await addToCart(diamondIds);
            toast.success("Selected diamonds added to cart successfully!");
            setSelectedDiamonds([]);
        } catch (error) {
            toast.error(error as string);
        } finally {
            setAddingToCart(false);
        }
    };

    const handleViewDetails = (diamond: Diamond | PublicDiamond) => {
        if (diamond.stockRef) {
            router.push(`${pathname}?view=${diamond.stockRef}`);
        } else {
            console.error("Diamond missing stock reference");
        }
    };

    // 4. CONDITIONAL RENDER: If viewId exists, show Detail View
    if (viewId) {
        return (
            <DiamondDetailView diamondId={viewId} isPublic={!isAuthenticated} />
        );
    }

    // Otherwise, show the Inventory List
    return (
        <div className="p-4 space-y-2 bg-brand-gradient min-h-screen ">
            {/* 1. FILTER DASHBOARD */}
            <div className="flex flex-col rounded-lg w-full overflow-hidden border-primary border-2 mb-4">
                <div className="bg-primary-purple2 flex justify-start items-center gap-2">
                    <Button
                        variant={"ghost"}
                        onClick={() =>
                            setFilterState((prev) => ({
                                ...prev,
                                isNatural: true,
                            }))
                        }
                        className={`text-white my-1 rounded-md ml-1 hover:text-white transition-all ${
                            filterState.isNatural === true
                                ? "border-2 border-primary-yellow-1  font-semibold"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Natural Diamonds
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={() =>
                            setFilterState((prev) => ({
                                ...prev,
                                isNatural: false,
                            }))
                        }
                        className={`text-white my-1 rounded-md hover:text-white transition-all ${
                            filterState.isNatural === false
                                ? "border-2 border-primary-yellow-1 font-semibold"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Lab Diamonds
                    </Button>
                </div>
                <div className="bg-white flex justify-start items-center gap-2">
                    <Button
                        variant={"ghost"}
                        onClick={() =>
                            setFilterState((prev) => ({
                                ...prev,
                                colorType: "white",
                            }))
                        }
                        className={`text-black my-1 rounded-md ml-1 transition-all ${
                            filterState.colorType === "white"
                                ? "border-2 border-primary-yellow-1 font-semibold"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        White Diamonds
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={() =>
                            setFilterState((prev) => ({
                                ...prev,
                                colorType: "fancy",
                            }))
                        }
                        className={`text-black my-1 rounded-md transition-all ${
                            filterState.colorType === "fancy"
                                ? "border-2 border-primary-yellow-1 font-semibold"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        Fancy Color
                    </Button>
                </div>
            </div>
            <div className="hidden lg:block">
                <DiamondFilters
                    filters={filterState}
                    setFilters={setFilterState}
                    onReset={handleReset}
                />
            </div>
            {/* mobile actions row */}
            <div className="flex lg:hidden items-center justify-between gap-2 bg-white p-2 rounded-lg mb-4 shadow-sm">
                {/* 1. View Toggle (List/Grid) */}
                <button
                    onClick={() => setView(view === "list" ? "grid" : "list")}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                    {view === "list" ? (
                        <LayoutGrid size={20} />
                    ) : (
                        <List size={20} />
                    )}
                </button>

                {/* 2. Search Bar */}
                <div className="flex-1 relative min-w-20">
                    <Input
                        type="text"
                        placeholder="Diamond ID"
                        value={filterState.searchTerm || ""}
                        className="h-10 w-full rounded-full bg-gray-50 border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-1 focus-visible:ring-primary-purple2"
                        onChange={(e) => {
                            setFilterState((prev) => ({
                                ...prev,
                                searchTerm: e.target.value || undefined,
                            }));
                        }}
                    />
                    <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        <Search size={14} />
                    </button>
                </div>

                {/* 3. Action Icons Group */}
                <div className="flex items-center gap-1.5">
                    {/* Reset */}
                    <button
                        onClick={handleReset}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full border border-gray-100 bg-white"
                        title="Reset Filters"
                        disabled={!hasActiveFilters()}
                    >
                        <RotateCcw size={18} />
                    </button>

                    {/* Cart - Only show for authenticated users */}
                    {isAuthenticated && (
                        <button
                            onClick={handleAddToCart}
                            className={`p-2 rounded-full border border-gray-100 bg-gray-100 ${
                                selectedDiamonds.length > 0
                                    ? "text-primary-purple2 bg-purple-50"
                                    : "text-gray-500"
                            }`}
                        >
                            <ShoppingCart size={18} />
                        </button>
                    )}

                    {/* Compare - Only show for authenticated users */}
                    {isAuthenticated && (
                        <button
                            onClick={handleCompare}
                            className="p-2 text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-full"
                            title="Compare"
                        >
                            <Scale size={18} />
                        </button>
                    )}

                    {/* Filter (Solid Black) */}
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`p-2 rounded-full text-white transition-colors ${
                            hasActiveFilters()
                                ? "bg-primary-purple2"
                                : "bg-black hover:bg-gray-800"
                        }`}
                    >
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Laptop Actions Row */}
            <div className="w-full hidden lg:block bg-white rounded-lg px-2 py-1">
                <div className="flex items-center justify-between gap-4">
                    {/* Left side - Action buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            className="lg:hidden p-1.5 rounded-sm border border-gray-200  "
                            onClick={() => setIsFilterOpen((prev) => !prev)}
                        >
                            <Filter size={15} />
                        </button>
                        {/* List/Grid toggle buttons */}
                        <div className="flex items-center gap-0 rounded-md border border-gray-200 bg-white  w-fit">
                            {/* List View Button */}
                            <button
                                onClick={() => setView("list")}
                                className={`p-2 rounded-sm transition-all duration-200 ${
                                    view === "list"
                                        ? "bg-primary-purple2 text-white shadow-sm"
                                        : "text-gray-500 hover:bg-gray-100"
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

                        <Button
                            variant="outline"
                            className="text-sm"
                            onClick={handleReset}
                            disabled={!hasActiveFilters()}
                        >
                            Reset Filters
                        </Button>
                        <Button variant="outline" className="text-sm">
                            <Filter /> Advanced Filters
                        </Button>

                        {/* Cart - Only show for authenticated users */}
                        {isAuthenticated && (
                            <Button
                                variant="outline"
                                className="text-sm"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart /> Cart{" "}
                                {selectedDiamonds.length > 0 &&
                                    `(${selectedDiamonds.length})`}
                            </Button>
                        )}

                        {/* Compare - Only show for authenticated users */}
                        {isAuthenticated && (
                            <Button
                                variant="outline"
                                className="text-sm"
                                onClick={handleCompare}
                            >
                                <Scale /> Compare{" "}
                                {selectedDiamonds.length > 0 &&
                                    `(${selectedDiamonds.length})`}
                            </Button>
                        )}
                    </div>

                    {/* Right side - Search */}
                    <div className="relative w-full max-w-sm">
                        <Input
                            type="text"
                            placeholder="Lot/Certificate"
                            value={filterState.searchTerm || ""}
                            className="h-10 w-full rounded-4xl border border-gray-300 pl-5 pr-28 focus-visible:ring-2 focus-visible:ring-primary-purple2"
                            onChange={(e) => {
                                setFilterState((prev) => ({
                                    ...prev,
                                    searchTerm: e.target.value || undefined,
                                }));
                            }}
                        />
                        <Button className="absolute right-0 top-0 h-full  rounded-4xl bg-gray-800 px-8 text-white hover:bg-gray-700">
                            Search
                        </Button>
                    </div>
                </div>
                {/* Applied filters with cross icon to remove them */}
                <div></div>
            </div>

            {/* 2. TABLE CARD */}
            <Card className="shadow-md rounded-lg overflow-hidden bg-white p-0 border-none">
                <CardContent className="p-0">
                    <div className="w-full max-h-100vh overflow-x-auto flex overflow-y-scroll ">
                        {/* Move sidebar outside the loading condition */}
                        {isFilterOpen && (
                            <div className="-50 flex lg:hidden">
                                <div
                                    className=" bg-black/50 backdrop-blur-sm transition-opacity"
                                    onClick={() => setIsFilterOpen(false)}
                                />
                                <div className="relative w-[300px] max-w-[40vw] rounded-lg h-full  shadow-xl flex flex-col animate-in slide-in-from-left slide-out-to-right duration-200">
                                    <div className="px-4 py-2 border-b flex items-center justify-between bg-primary-purple2 text-white rounded-t-md">
                                        <span className="font-semibold">
                                            Filters
                                        </span>
                                        <button
                                            onClick={() =>
                                                setIsFilterOpen(false)
                                            }
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="flex-1 overflow-y-auto">
                                        <DiamondFilters
                                            filters={filterState}
                                            setFilters={setFilterState}
                                            onReset={handleReset}
                                            variant="sidebar"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading state only affects table/grid content */}
                        {loading ? (
                            <div className="w-full p-4">
                                <ShimmerTable
                                    rowCount={rowsPerPage}
                                    columnCount={12}
                                />
                            </div>
                        ) : data.length > 0 ? (
                            view === "grid" ? (
                                <DiamondGrid
                                    data={data}
                                    onViewDetails={handleViewDetails}
                                />
                            ) : (
                                <DataTable
                                    data={data}
                                    columns={
                                        isAuthenticated
                                            ? getDiamondColumns(
                                                  handleViewDetails,
                                              )
                                            : getPublicDiamondColumns(
                                                  handleViewDetails,
                                              )
                                    }
                                    columnStyles={{
                                        weight: "font-bold",
                                    }}
                                    enableSelection={isAuthenticated}
                                    selectedDiamonds={selectedDiamonds}
                                    onSelectionChange={setSelectedDiamonds}
                                />
                            )
                        ) : (
                            <div className="text-center py-12 text-gray-500 w-full">
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

export default function InventoryPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                        <p className="text-gray-500">Loading Inventory...</p>
                    </div>
                </div>
            }
        >
            <InventoryContent />
        </Suspense>
    );
}
