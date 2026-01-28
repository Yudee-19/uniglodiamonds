import React from "react";
import {
    Diamond,
    getShapeFullName,
    PublicDiamond,
} from "@/interface/diamondInterface";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { DiamondImage } from "@/app/compare/page";

interface DiamondGridProps {
    data: Diamond[] | PublicDiamond[];
    onViewDetails: (diamond: Diamond | PublicDiamond) => void;
}

// Helper function to check if diamond has full data (authenticated)
const isDiamond = (item: Diamond | PublicDiamond): item is Diamond => {
    return "_id" in item;
};

export default function DiamondGrid({ data, onViewDetails }: DiamondGridProps) {
    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 w-full">
                <p className="text-lg font-medium">No diamonds found</p>
                <p className="text-sm mt-2">
                    Try adjusting your filters or search criteria
                </p>
            </div>
        );
    }

    return (
        <div className="bg-brand-gradient grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 font-lato pb-2 w-full px-1">
            {data.map((item) => (
                <div
                    key={item.stockRef}
                    className="bg-white rounded-md shadow-sm border border-gray-200 flex flex-col relative hover:shadow-lg transition-all duration-200 group overflow-hidden"
                >
                    {/* Image Container */}
                    <div className="aspect-square w-full flex items-center justify-center bg-gray-50 rounded-t-md overflow-hidden relative">
                        {/* Wishlist Icon */}
                        <button className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors z-10 bg-white/80 rounded-full p-1.5 shadow-sm">
                            <Heart className="w-4 h-4" />
                        </button>
                        <DiamondImage src={item.webLink} showdefault={false} />
                    </div>

                    {/* Diamond Title */}
                    <div className="px-3 pt-3 pb-2">
                        <h3 className="font-bold text-[11px] sm:text-xs text-gray-900 uppercase tracking-wide leading-tight">
                            {getShapeFullName(item.shape)}{" "}
                            {item.weight.toFixed(2)}ct {item.color}{" "}
                            {item.clarity}{" "}
                            {item.cutGrade ? `${item.cutGrade} ` : ""}
                            {item.polish && item.symmetry
                                ? `${item.polish} ${item.symmetry}`
                                : ""}
                        </h3>
                    </div>

                    {/* Stock Reference and Lab */}
                    <div className="px-3 pb-2">
                        <p className="text-[10px] text-gray-500">
                            {item.stockRef}
                            {item.lab && (
                                <>
                                    {" • "}
                                    <span className="uppercase">
                                        {item.lab}
                                    </span>
                                </>
                            )}
                        </p>
                    </div>

                    {/* Details Grid - Only show for authenticated users */}
                    {/* {isDiamond(item) && ( */}
                    <div className="px-3 pb-3 grid grid-cols-3 gap-x-3 gap-y-1 text-[10px] text-gray-600">
                        {/* Table % */}
                        {item.tablePerc !== undefined && (
                            <div className="flex items-center justify-start gap-2">
                                <span className="font-medium">T:</span>
                                <span>{item.tablePerc.toFixed(2)}%</span>
                            </div>
                        )}

                        {/* Depth % */}
                        {item.depthPerc !== undefined && (
                            <div className="flex items-center justify-start gap-2">
                                <span className="font-medium">D:</span>
                                <span>{item.depthPerc.toFixed(2)}%</span>
                            </div>
                        )}

                        {/* Ratio */}
                        {item.length && item.width && (
                            <div className="flex items-center justify-start gap-2 ">
                                <span className="font-medium">R:</span>
                                <span>
                                    {(item.length / item.width).toFixed(2)}
                                </span>
                            </div>
                        )}

                        {/* Measurements */}
                        {item.measurements && (
                            <div className="flex items-center justify-start gap-2 col-span-2">
                                <span className="font-medium">
                                    Measurements:
                                </span>
                                <span className="text-right">
                                    {item.measurements}
                                </span>
                            </div>
                        )}
                    </div>
                    {/* )} */}

                    {/* For public diamonds, show minimal info */}
                    {!isDiamond(item) && (
                        <div className="px-3 pb-3 text-[10px] text-gray-500">
                            <p>Login to view more details</p>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto px-3 pb-3">
                        <Button
                            onClick={() => onViewDetails(item)}
                            className="gold-reveal-btn text-white text-[10px] sm:text-xs px-4 h-9  uppercase tracking-wider w-full shadow-sm font-semibold"
                        >
                            <span>View Details</span>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
