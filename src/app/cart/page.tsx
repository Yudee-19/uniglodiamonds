"use client";

import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "@/services/cartService";
import { CartItem } from "@/interface/diamondInterface";
import {
    Trash2,
    Download,
    GitCompare,
    Mail,
    Loader2,
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Helper to calculate total price
const calculateTotal = (weight: number, pricePerCts: number) => {
    if (!weight || !pricePerCts) return "-";
    return (weight * pricePerCts).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

// Helper for currency formatting
const formatCurrency = (value: number) => {
    if (!value) return "-";
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [removing, setRemoving] = useState(false);
    const [showClearDialog, setShowClearDialog] = useState(false);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await getCart();
            if (response.success) {
                setCartItems(response.data.cart?.items || []);
            }
        } catch (err: any) {
            setError(err.message || "Failed to load cart");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(cartItems.map((item) => item.diamond._id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleRemoveSelected = async () => {
        if (selectedIds.length === 0) return;

        try {
            setRemoving(true);

            // Remove all selected items
            await Promise.all(selectedIds.map((id) => removeFromCart(id)));

            toast.success(`${selectedIds.length} item(s) removed from cart`);
            setSelectedIds([]);
            await fetchCart();
        } catch (err: any) {
            toast.error(err || "Failed to remove items from cart");
        } finally {
            setRemoving(false);
        }
    };

    const handleClearCartConfirm = async () => {
        try {
            setRemoving(true);
            await clearCart();
            toast.success("Cart cleared successfully");
            setSelectedIds([]);
            await fetchCart();
            setShowClearDialog(false);
        } catch (err: any) {
            toast.error(err || "Failed to clear cart");
        } finally {
            setRemoving(false);
        }
    };

    const handleCompare = () => {
        if (selectedIds.length < 2) {
            toast.warning("Please select at least 2 diamonds to compare");
            return;
        }

        // Get selected diamonds and create query string
        const selectedDiamonds = cartItems.filter((item) =>
            selectedIds.includes(item.diamond._id),
        );
        const queryString = selectedDiamonds
            .map((item) => item.diamond.certiNo)
            .join(",");

        router.push(`/compare?ids=${queryString}`);
    };

    const isAllSelected =
        cartItems.length > 0 && selectedIds.length === cartItems.length;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-[#bb923a]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4 font-lato">
                <p className="text-red-500">{error}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-4 md:p-8 font-lato">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-cormorantGaramond font-bold text-[#26062b]">
                    My Cart
                </h1>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-500 font-medium">
                <button
                    className="flex items-center gap-2 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedIds.length === 0 || removing}
                    onClick={handleRemoveSelected}
                >
                    {removing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Trash2 className="w-4 h-4" />
                    )}
                    <span>Remove from cart</span>
                </button>
                <button
                    className="flex items-center gap-2 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedIds.length < 2}
                    onClick={handleCompare}
                >
                    <GitCompare className="w-4 h-4" />
                    <span>
                        Compare stone{" "}
                        {selectedIds.length > 0 && `(${selectedIds.length})`}
                    </span>
                </button>

                <AlertDialog
                    open={showClearDialog}
                    onOpenChange={setShowClearDialog}
                >
                    <AlertDialogTrigger asChild>
                        <button
                            className="flex items-center gap-1 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cartItems.length === 0 || removing}
                        >
                            {removing ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-1" />
                            ) : (
                                <Trash2 className="w-4 h-4 mr-1" />
                            )}
                            Clear Cart
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogMedia>
                                <AlertTriangle className="text-amber-600" />
                            </AlertDialogMedia>
                            <AlertDialogTitle>
                                Clear entire cart?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will remove all items from your
                                cart. This cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                variant="destructive"
                                onClick={handleClearCartConfirm}
                                disabled={removing}
                                className="rounded-sm "
                            >
                                {removing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Clearing...
                                    </>
                                ) : (
                                    "Clear Cart"
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {/* Table Container */}
            <div className="border border-[#e7d7b4] rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1400px]">
                        {/* Table Header */}
                        <thead className="bg-[#26062b] font-cormorantGaramond text-white text-sm uppercase tracking-wider font-medium">
                            <tr>
                                <th className="p-4 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-[#bb923a] cursor-pointer"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        disabled={cartItems.length === 0}
                                    />
                                </th>
                                <th className="p-4 text-left">Image</th>
                                <th className="p-4 text-left">Pct No</th>
                                <th className="p-4 text-left">Location</th>
                                <th className="p-4 text-left">Report No</th>
                                <th className="p-4 text-left">Lab</th>
                                <th className="p-4 text-left">Shape</th>
                                <th className="p-4 text-left">Carat</th>
                                <th className="p-4 text-left">Color</th>
                                <th className="p-4 text-left">Purity</th>
                                <th className="p-4 text-left">Cut</th>
                                <th className="p-4 text-left">Pol</th>
                                <th className="p-4 text-right">Rap.($)</th>
                                <th className="p-4 text-left">Length</th>
                                <th className="p-4 text-left">Width</th>
                                <th className="p-4 text-left">Depth</th>
                                <th className="p-4 text-right">$/Total</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-sm text-gray-700">
                            {cartItems.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={17}
                                        className="p-12 text-center text-gray-500"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <p>Your cart is empty.</p>
                                            <Link
                                                href="/inventory"
                                                className="text-[#bb923a] underline hover:text-[#26062b]"
                                            >
                                                Browse Inventory
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                cartItems.map((item, index) => {
                                    const d = item.diamond;
                                    const isEven = index % 2 === 0;
                                    return (
                                        <tr
                                            key={item.diamondId}
                                            className={`border-b font-lato border-[#e7d7b4] hover:bg-[#fffbf2] transition-colors ${
                                                !isEven
                                                    ? "bg-[#fffbf2]/30"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <td className="p-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 accent-[#bb923a] cursor-pointer"
                                                    checked={selectedIds.includes(
                                                        d._id,
                                                    )}
                                                    onChange={() =>
                                                        handleSelectOne(d._id)
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <div className="w-12 h-12 relative bg-gray-100 rounded flex items-center justify-center overflow-hidden border border-gray-200">
                                                    {d.webLink ? (
                                                        <img
                                                            src={d.webLink}
                                                            alt={d.stockRef}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                (
                                                                    e.target as HTMLImageElement
                                                                ).style.display =
                                                                    "none";
                                                                (
                                                                    e.target as HTMLImageElement
                                                                ).nextElementSibling?.classList.remove(
                                                                    "hidden",
                                                                );
                                                            }}
                                                        />
                                                    ) : null}
                                                    <span
                                                        className={`text-[10px] text-gray-400 ${
                                                            d.webLink
                                                                ? "hidden"
                                                                : ""
                                                        }`}
                                                    >
                                                        No img
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Link
                                                    href={`/inventory?view=${d.certiNo}`}
                                                    className="font-semibold text-[#26062b] hover:text-[#bb923a] underline transition-colors"
                                                >
                                                    {d.stockRef}
                                                </Link>
                                            </td>
                                            <td className="p-4">
                                                {d.city || d.country || "MU"}
                                            </td>
                                            <td className="p-4">{d.certiNo}</td>
                                            <td className="p-4">{d.lab}</td>
                                            <td className="p-4">{d.shape}</td>
                                            <td className="p-4">
                                                {d.weight?.toFixed(2)}
                                            </td>
                                            <td className="p-4">{d.color}</td>
                                            <td className="p-4 text-[#3b82f6]">
                                                {d.clarity}
                                            </td>
                                            <td className="p-4">
                                                {d.cutGrade}
                                            </td>
                                            <td className="p-4">{d.polish}</td>
                                            <td className="p-4 text-right">
                                                {formatCurrency(d.priceListUSD)}
                                            </td>
                                            <td className="p-4">
                                                {d.measurements}
                                            </td>
                                            <td className="p-4">N/A</td>
                                            <td className="p-4">
                                                {d.depthPerc?.toFixed(2)}
                                            </td>
                                            <td className="p-4 text-right font-bold text-[#bb923a]">
                                                {calculateTotal(
                                                    d.weight,
                                                    d.pricePerCts,
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
