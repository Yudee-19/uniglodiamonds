"use client";

import React, { useEffect, useState } from "react";
import { getCart } from "@/services/cartService";
import { CartItem } from "@/interface/diamondInterface";
import {
    Trash2,
    Download,
    GitCompare,
    Mail,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                const response = await getCart();
                if (response.success) {
                    setCartItems(response.data.cart.items);
                }
            } catch (err: any) {
                setError(err.message || "Failed to load cart");
            } finally {
                setLoading(false);
            }
        };

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
            <h1 className="text-4xl font-cormorantGaramond font-bold text-[#26062b] mb-8">
                My Cart
            </h1>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-500 font-medium">
                <button
                    className="flex items-center gap-2 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedIds.length === 0}
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove from cart</span>
                </button>
                <button className="flex items-center gap-2 hover:text-[#bb923a] transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export to excel</span>
                </button>
                <button
                    className="flex items-center gap-2 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedIds.length < 2}
                >
                    <GitCompare className="w-4 h-4" />
                    <span>Compare stone</span>
                </button>
                <button className="flex items-center gap-2 hover:text-[#bb923a] transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>Enquire</span>
                </button>
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
                                                        d._id
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
                                                                    "hidden"
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
                                            <td className="p-4 font-semibold text-[#26062b]">
                                                {d.stockRef}
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
                                                    d.pricePerCts
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {/* {cartItems.length > 0 && (
                    <div className="p-4 border-t border-[#e7d7b4] flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-[#26062b] text-white text-sm font-medium">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-sm font-medium">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-sm font-medium">
                            3
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-sm font-medium">
                            4
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-sm font-medium">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )} */}
            </div>
        </div>
    );
}
