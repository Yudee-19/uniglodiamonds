import React from "react";
import { Diamond, getShapeFullName } from "@/interface/diamondInterface";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface DiamondGridProps {
    data: Diamond[];
    onViewDetails: (diamond: Diamond) => void;
}

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
        <div className="bg-brand-gradient grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 font-lato pb-2 ">
            {data.map((item) => (
                <div
                    key={item._id}
                    className="bg-white rounded-md shadow-sm border border-gray-100 px-4 pb-3 flex flex-col relative hover:shadow-md transition-all duration-200 group"
                >
                    {/* Image Container */}
                    <div className="aspect-square w-full  flex items-center justify-center  rounded-lg overflow-hidden">
                        {/* Wishlist Icon */}
                        <button className="absolute top-5 right-9 text-gray-300 hover:text-primary-purple2 transition-colors z-10">
                            <Heart className="w-4 h-4" />
                        </button>
                        {item.webLink ? (
                            <img
                                src={item.webLink}
                                alt={`${item.shape} diamond`}
                                className="w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className="text-gray-300 text-4xl font-light">
                                💎
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-1 pl-4 mb-5 text-[13px] leading-tight">
                        <div className="flex items-baseline gap-1">
                            <span className="font-bold text-gray-900">
                                Shape:
                            </span>
                            <span className="text-gray-600 uppercase">
                                {getShapeFullName(item.shape)}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="font-bold text-gray-900">
                                Carat:
                            </span>
                            <span className="text-gray-600">
                                {item.weight.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="font-bold text-gray-900">
                                Color:
                            </span>
                            <span className="text-gray-600">{item.color}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="font-bold text-gray-900">
                                Clarity:
                            </span>
                            <span className="text-gray-600">
                                {item.clarity}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto flex justify-center">
                        <Button
                            onClick={() => onViewDetails(item)}
                            className="bg-primary-yellow-3 hover:bg-[#B5952F] text-white text-xs  px-6 h-8 rounded-[2] uppercase tracking-wider w-fit shadow-sm"
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
