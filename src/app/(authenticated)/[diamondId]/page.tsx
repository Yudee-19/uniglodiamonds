"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchDiamondById } from "@/services/diamondService";
import {
    Diamond,
    getShapeFullName,
    getAvailabilityText,
} from "@/interface/diamondInterface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowLeft,
    Download,
    Share2,
    Heart,
    Diamond as DiamondIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DiamondDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [diamond, setDiamond] = useState<Diamond | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDiamond = async () => {
            if (params.diamondId) {
                try {
                    setLoading(true);
                    // Decode the param in case it has special characters, though usually cert numbers are alphanumeric
                    const id = decodeURIComponent(params.diamondId as string);
                    const data = await fetchDiamondById(id);
                    setDiamond(data);
                } catch (err) {
                    setError("Failed to load diamond details");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadDiamond();
    }, [params.diamondId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-gradient">
                <div className="animate-pulse flex flex-col items-center">
                    <DiamondIcon className="h-12 w-12 text-primary-purple2 animate-bounce" />
                    <p className="mt-4 text-gray-600">
                        Loading Diamond Details...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !diamond) {
        return (
            <div className="min-h-screen  flex flex-col items-center justify-center bg-brand-gradient gap-4">
                <p className="text-red-500 text-lg">
                    {error || "Diamond not found"}
                </p>
                <Button onClick={() => router.back()} variant="outline">
                    Go Back
                </Button>
            </div>
        );
    }

    const DetailRow = ({
        label,
        value,
    }: {
        label: string;
        value: string | number | undefined;
    }) => (
        <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="font-medium text-gray-900 text-sm">
                {value || "-"}
            </span>
        </div>
    );

    return (
        <div className="min-h-screen mt-40 bg-brand-gradient p-4 md:p-8 ">
            {/* Header Navigation */}
            <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="hover:bg-white/50 gap-2"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Inventory
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="bg-white">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-white">
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Media & Key Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-md overflow-hidden">
                        <CardContent className="p-6 bg-white flex flex-col items-center">
                            <div className="w-full aspect-square relative flex items-center justify-center bg-gray-50 rounded-lg mb-4">
                                {diamond.webLink ? (
                                    <img
                                        src={diamond.webLink}
                                        alt="Diamond"
                                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                                    />
                                ) : (
                                    <DiamondIcon className="h-32 w-32 text-gray-200" />
                                )}
                                <Badge className="absolute top-2 right-2 bg-primary-purple2">
                                    {getAvailabilityText(diamond.availability)}
                                </Badge>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-2 mb-4">
                                {diamond.videoLink && (
                                    <Button
                                        variant="outline"
                                        className="w-full text-xs"
                                        onClick={() =>
                                            window.open(
                                                diamond.videoLink,
                                                "_blank"
                                            )
                                        }
                                    >
                                        Watch Video
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    className="w-full text-xs"
                                >
                                    <Download className="h-3 w-3 mr-1" />{" "}
                                    Certificate
                                </Button>
                            </div>

                            <div className="text-center space-y-1">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {diamond.weight} Carat{" "}
                                    {getShapeFullName(diamond.shape)}
                                </h1>
                                <p className="text-lg text-primary-purple2 font-medium">
                                    {diamond.color} Color • {diamond.clarity}{" "}
                                    Clarity
                                </p>
                                <p className="text-sm text-gray-500">
                                    SKU: {diamond.stockRef}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md bg-primary-purple2 text-white">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-white/80 text-sm">
                                    Total Price
                                </span>
                                <span className="text-2xl font-bold">
                                    $
                                    {(
                                        diamond.weight * diamond.pricePerCts
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-white/80 mb-6">
                                <span>Price per Carat</span>
                                <span>
                                    ${diamond.pricePerCts.toLocaleString()}
                                </span>
                            </div>
                            <Button className="w-full bg-white text-primary-purple2 hover:bg-gray-100 font-bold">
                                INQUIRE NOW
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Detailed Specs */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Grading Report */}
                    <Card className="border-none shadow-md">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="font-bold text-lg text-gray-800">
                                Grading Report
                            </h2>
                        </div>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                            <DetailRow label="Lab" value={diamond.lab} />
                            <DetailRow
                                label="Certificate No"
                                value={diamond.certiNo}
                            />
                            <DetailRow
                                label="Shape"
                                value={getShapeFullName(diamond.shape)}
                            />
                            <DetailRow
                                label="Carat Weight"
                                value={`${diamond.weight} ct`}
                            />
                            <DetailRow
                                label="Color Grade"
                                value={diamond.color}
                            />
                            <DetailRow
                                label="Clarity Grade"
                                value={diamond.clarity}
                            />
                            <DetailRow
                                label="Cut Grade"
                                value={diamond.cutGrade}
                            />
                            <DetailRow label="Polish" value={diamond.polish} />
                            <DetailRow
                                label="Symmetry"
                                value={diamond.symmetry}
                            />
                            <DetailRow
                                label="Fluorescence"
                                value={diamond.fluorescenceIntensity}
                            />
                        </CardContent>
                    </Card>

                    {/* Measurements & Proportions */}
                    <Card className="border-none shadow-md">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="font-bold text-lg text-gray-800">
                                Measurements & Proportions
                            </h2>
                        </div>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                            <DetailRow
                                label="Measurements"
                                value={diamond.measurements}
                            />
                            <DetailRow
                                label="Depth %"
                                value={`${diamond.depthPerc}%`}
                            />
                            <DetailRow
                                label="Table %"
                                value={`${diamond.tablePerc}%`}
                            />
                            <DetailRow
                                label="Length"
                                value={`${diamond.length} mm`}
                            />
                            <DetailRow
                                label="Width"
                                value={`${diamond.width} mm`}
                            />
                            <DetailRow
                                label="Depth"
                                value={`${diamond.height} mm`}
                            />
                            <DetailRow label="Girdle" value={diamond.girdle} />
                            <DetailRow
                                label="Culet"
                                value={diamond.culetSize}
                            />
                        </CardContent>
                    </Card>

                    {/* Additional Information */}
                    <Card className="border-none shadow-md">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="font-bold text-lg text-gray-800">
                                Additional Information
                            </h2>
                        </div>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                            <DetailRow label="Origin" value={diamond.origin} />
                            <DetailRow
                                label="Location"
                                value={`${diamond.city}, ${diamond.country}`}
                            />
                            <DetailRow
                                label="Key to Symbols"
                                value={diamond.keyToSymbols?.join(", ")}
                            />
                            <DetailRow
                                label="Comments"
                                value={diamond.certComment}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
