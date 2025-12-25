"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchDiamondById } from "@/services/diamondService";
import { Diamond } from "@/interface/diamondInterface";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, Diamond as DiamondIcon } from "lucide-react";
import Image from "next/image";

// Define the row configuration to ensure alignment
type RowConfig = {
    label: string;
    key?: keyof Diamond;
    getValue?: (d: Diamond) => string | number | React.ReactNode;
};

export default function ComparePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [diamonds, setDiamonds] = useState<Diamond[]>([]);
    const [loading, setLoading] = useState(true);

    const idsParam = searchParams.get("ids");

    useEffect(() => {
        const fetchComparisonData = async () => {
            if (!idsParam) {
                setLoading(false);
                return;
            }

            const idArray = idsParam.split(",");

            try {
                setLoading(true);
                const promises = idArray.map((id) => fetchDiamondById(id));
                const results = await Promise.all(promises);
                setDiamonds(results.filter((d): d is Diamond => d !== null));
            } catch (error) {
                console.error("Error fetching comparison data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComparisonData();
    }, [idsParam]);

    const removeDiamond = (idToRemove: string) => {
        const currentIds = idsParam?.split(",") || [];
        const newIds = currentIds.filter((id) => id !== idToRemove);

        if (newIds.length === 0) {
            router.push("/inventory");
        } else {
            router.push(`/compare?ids=${newIds.join(",")}`);
        }
    };

    // Helper to calculate discount
    const calculateDiscount = (d: Diamond) => {
        if (d.priceListUSD && d.pricePerCts) {
            const disc =
                ((d.pricePerCts - d.priceListUSD) / d.priceListUSD) * 100;
            return disc.toFixed(2);
        }
        return "-";
    };

    // Define rows based on the image and available data
    const rows: RowConfig[] = [
        { label: "Packet No", key: "stockRef" },
        { label: "Location", getValue: (d) => d.city || "-" },
        { label: "Certificate No", key: "certiNo" },
        { label: "Lab", key: "lab" },
        { label: "Shape", key: "shape" },
        { label: "Wgt", key: "weight" },
        { label: "Col", key: "color" },
        { label: "Clarity", key: "clarity" },
        { label: "Cut", key: "cutGrade" },
        { label: "Pol", key: "polish" },
        { label: "Sym", key: "symmetry" },
        { label: "Fls", key: "fluorescenceIntensity" },
        {
            label: "Rap.($)",
            getValue: (d) => d.priceListUSD?.toLocaleString(),
        },
        { label: "Length", key: "length" },
        { label: "Width", key: "width" },
        { label: "Depth", key: "height" },
        { label: "Depth %", getValue: (d) => d.depthPerc?.toFixed(2) },
        { label: "Table %", getValue: (d) => d.tablePerc?.toFixed(2) },
        { label: "Disc %", getValue: (d) => calculateDiscount(d) },
        {
            label: "Net Rate",
            getValue: (d) => d.pricePerCts?.toLocaleString(),
        },
        {
            label: "Net Value",
            getValue: (d) => (d.weight * d.pricePerCts)?.toLocaleString(),
        },
        { label: "C/A", getValue: (d) => d.crownAngle?.toFixed(2) || "-" },
        { label: "C/H", getValue: (d) => d.crownHeight?.toFixed(2) || "-" },
        { label: "P/A", getValue: (d) => d.pavalionAngle?.toFixed(2) || "-" },
        { label: "P/H", getValue: (d) => d.pavalionDepth?.toFixed(2) || "-" },
        {
            label: "Ratio",
            getValue: (d) =>
                d.length && d.width ? (d.length / d.width).toFixed(2) : "-",
        },
        { label: "Girdle", key: "girdle" },
        { label: "Girdle %", getValue: () => "-" },
        { label: "Star", getValue: () => "-" },
        {
            label: "Key To Symbols",
            getValue: (d) => d.keyToSymbols?.join(", ") || "-",
        },
        { label: "Report Comments", key: "certComment" },
        { label: "Comments 1", key: "memberComment" },
        { label: "Brl.", getValue: () => "-" },
        { label: "Heart & Arrow", key: "handA" },
        { label: "Inscription", key: "laserInscription" },
        { label: "Black Size 1", key: "blackinclusion" },
        { label: "Black Size 2", getValue: () => "-" },
        { label: "Feather Size 1", getValue: () => "-" },
        { label: "Feather Size 2", getValue: () => "-" },
        { label: "Open Pos 4", getValue: () => "-" },
        { label: "EC", key: "eyeClean" },
        { label: "Shade", key: "shade" },
        { label: "Type2 Cert", getValue: () => "-" },
        { label: "Block Type Seq", getValue: () => "-" },
    ];

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-pulse flex flex-col items-center">
                    <Image
                        src={"/logo/logo.png"}
                        alt="Uniglow Logo"
                        width={50}
                        height={40}
                        className="mb-2 animate-pulse"
                    />
                    <p className="mt-4 text-gray-600">Loading Comparison...</p>
                </div>
            </div>
        );

    if (diamonds.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 font-lato">
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src={"/logo/logo.png"}
                        alt="Uniglow Logo"
                        width={50}
                        height={40}
                        className="mb-2"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        No Diamonds Selected
                    </h2>
                    <p className="text-gray-500">
                        Please select diamonds from the inventory to compare
                        them.
                    </p>
                </div>
                <Button
                    onClick={() => router.push("/inventory")}
                    className="gold-reveal-btn font-cormorantGaramond uppercase shadow-lg"
                >
                    <span>Go to Inventory</span>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-6  font-lato mt-40">
            <Button
                className="gold-reveal-btn font-cormorantGaramond uppercase shadow-lg mb-6"
                onClick={() => router.back()}
            >
                <span className="flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                </span>
            </Button>

            <div className="flex overflow-x-auto pb-8 gap-2">
                {/* Labels Column */}
                <div className="min-w-[200px] flex flex-col shrink-0">
                    {/* Spacer for Image area */}
                    <div className="h-[250px] mb-2 flex items-center justify-center">
                        {/* Placeholder for logo if needed */}
                        {/* Header Row */}
                        <Image
                            src={"/logo/logo.png"}
                            alt="Uniglow Logo"
                            width={150}
                            height={40}
                            className="mb-2"
                        />
                    </div>

                    {/* Header Row */}
                    <div className="h-10 bg-[#26062b] text-white flex items-center justify-center font-medium text-sm uppercase tracking-wide border border-[#e7d7b4] rounded-t-sm">
                        Stage
                    </div>

                    {/* Data Labels */}
                    {rows.map((row, idx) => (
                        <div
                            key={idx}
                            className={`h-8 flex w-[250px]  items-center justify-center text-sm font-semibold text-gray-800 border-x border-b border-[#e7d7b4] bg-[#fffbf2] ${
                                idx === rows.length - 1 ? "rounded-b-sm" : ""
                            }`}
                        >
                            {row.label}
                        </div>
                    ))}
                </div>

                {/* Diamond Columns */}
                {diamonds.map((diamond, index) => (
                    <div
                        key={diamond._id}
                        className="w-[250px] flex flex-col shrink-0"
                    >
                        {/* Image Area */}
                        <div className="h-[250px] mb-2 relative border border-gray-100 rounded-lg bg-gray-50 flex items-center justify-center group">
                            <button
                                onClick={() => removeDiamond(diamond.certiNo)}
                                className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white rounded-full z-10 shadow-sm border border-gray-200"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                            {diamond.webLink ? (
                                <img
                                    src={diamond.webLink}
                                    alt="diamond"
                                    className="max-h-full max-w-full object-contain mix-blend-multiply p-4"
                                />
                            ) : (
                                <DiamondIcon className="w-24 h-24 text-gray-200" />
                            )}
                        </div>

                        {/* Header Row (A, B, C...) */}
                        <div className="h-10 bg-[#26062b] text-white flex items-center justify-center font-medium text-sm uppercase tracking-wide border border-[#e7d7b4] rounded-t-sm">
                            {String.fromCharCode(65 + index)}
                        </div>

                        {/* Data Rows */}
                        {rows.map((row, idx) => {
                            let value: React.ReactNode = "-";
                            if (row.getValue) {
                                value = row.getValue(diamond);
                            } else if (row.key) {
                                value = diamond[row.key] as React.ReactNode;
                            }

                            return (
                                <div
                                    key={idx}
                                    className={`h-8 flex items-center justify-center text-sm text-gray-700 border-x border-b border-[#e7d7b4] bg-white ${
                                        idx === rows.length - 1
                                            ? "rounded-b-sm"
                                            : ""
                                    }`}
                                >
                                    <span
                                        className="truncate px-2 max-w-full text-center"
                                        title={String(value)}
                                    >
                                        {value}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
