"use client";

import React, { useEffect, useState } from "react";
import { fetchDiamondById } from "@/services/diamondService";
import { Diamond, getShapeFullName } from "@/interface/diamondInterface";
import { DiamondImage } from "@/app/compare/page";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SimilarDiamondsProps {
    similarDiamondIds: string[];
    isPublic?: boolean;
}

export default function SimilarDiamonds({
    similarDiamondIds,
    isPublic = false,
}: SimilarDiamondsProps) {
    const router = useRouter();
    const [diamonds, setDiamonds] = useState<Diamond[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Number of diamonds to show at once
    const visibleCount = 6;

    useEffect(() => {
        const fetchSimilarDiamonds = async () => {
            if (!similarDiamondIds || similarDiamondIds.length === 0) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const promises = similarDiamondIds.map(async (id) => {
                    try {
                        const response = await fetchDiamondById(id, isPublic);
                        return response.diamond;
                    } catch (error) {
                        console.error(`Failed to fetch diamond ${id}:`, error);
                        return null;
                    }
                });

                const results = await Promise.all(promises);
                setDiamonds(
                    results.filter(
                        (d: Diamond | null): d is Diamond => d !== null,
                    ),
                );
            } catch (error) {
                console.error("Error fetching similar diamonds:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSimilarDiamonds();
    }, [similarDiamondIds, isPublic]);

    const handleNext = () => {
        if (currentIndex + visibleCount < diamonds.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleDiamondClick = (stockRef: string) => {
        router.push(`/inventory?view=${encodeURIComponent(stockRef)}`);
    };

    if (loading) {
        return (
            <div className="py-8">
                <h2 className="text-2xl font-cormorantGaramond font-semibold text-gray-900 mb-6">
                    Similar Diamonds
                </h2>
                <div className="flex items-center justify-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-yellow-1" />
                </div>
            </div>
        );
    }

    if (diamonds.length === 0) {
        return null;
    }

    const visibleDiamonds = diamonds.slice(
        currentIndex,
        currentIndex + visibleCount,
    );
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex + visibleCount < diamonds.length;

    return (
        <div className="py-8 font-lato">
            <h2 className="text-2xl font-cormorantGaramond font-semibold text-gray-900 mb-6">
                Similar Diamonds
            </h2>

            <div className="relative">
                {/* Navigation Buttons */}
                {canGoPrev && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Previous diamonds"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                )}

                {canGoNext && (
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Next diamonds"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                )}

                {/* Diamond Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {visibleDiamonds.map((diamond) => (
                        <div
                            key={diamond.stockRef}
                            onClick={() => handleDiamondClick(diamond.stockRef)}
                            className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white"
                        >
                            {/* Diamond Image */}
                            <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                                <DiamondImage
                                    src={diamond.webLink}
                                    showdefault={false}
                                />
                            </div>

                            {/* Diamond Details */}
                            <div className="p-3 space-y-1 text-center border-t border-gray-100">
                                <div className="text-xs font-semibold text-gray-900">
                                    {getShapeFullName(
                                        diamond.shape,
                                    ).toUpperCase()}{" "}
                                    {diamond.weight}
                                </div>
                                <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                                    <span>{diamond.color}</span>
                                    <span>{diamond.clarity}</span>
                                </div>
                                {diamond.cutGrade && (
                                    <div className="text-xs text-gray-500">
                                        -{diamond.cutGrade} {diamond.polish}
                                    </div>
                                )}
                                <div className="text-xs text-gray-500 flex items-center justify-center gap-1 flex-wrap">
                                    <span>
                                        {diamond.fluorescenceIntensity || "NON"}
                                    </span>
                                    <span>{diamond.lab || "GIA"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
