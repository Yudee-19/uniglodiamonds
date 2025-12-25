"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Removed useParams as we use props now
import { fetchDiamondById } from "@/services/diamondService";
import { Diamond, getShapeFullName } from "@/interface/diamondInterface";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Diamond as DiamondIcon,
    Scale,
    Palette,
    Eye,
    Star,
} from "lucide-react";

interface DiamondDetailViewProps {
    diamondId: string;
}

export default function DiamondDetailView({
    diamondId,
}: DiamondDetailViewProps) {
    // const params = useParams(); // Removed
    const router = useRouter();
    const [diamond, setDiamond] = useState<Diamond | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<
        "IMAGE" | "VIDEO" | "CERTIFICATE"
    >("IMAGE");

    useEffect(() => {
        const loadDiamond = async () => {
            // Changed params.diamondId to the prop diamondId
            if (diamondId) {
                try {
                    setLoading(true);
                    const id = decodeURIComponent(diamondId as string);
                    const data = await fetchDiamondById(id);
                    setDiamond(data);
                } catch (err) {
                    setError(
                        "Failed to load diamond details. Please try again."
                    );
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadDiamond();
    }, [diamondId]); // Dependency changed to the prop

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-pulse flex flex-col items-center">
                    <DiamondIcon className="h-12 w-12 text-[#49214c] animate-bounce" />
                    <p className="mt-4 text-gray-600">
                        Loading Diamond Details...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !diamond) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
                <p className="text-red-500 text-lg">
                    {error || "Diamond not found"}
                </p>
                <Button onClick={() => router.back()} variant="outline">
                    Go Back
                </Button>
            </div>
        );
    }

    const totalPrice = diamond.weight * diamond.pricePerCts;
    const shapeName = getShapeFullName(diamond.shape);

    // Helper for the 3-column tables
    const TableSection = ({
        title,
        rows,
    }: {
        title: string;
        rows: { label: string; value: string | number | undefined }[];
    }) => (
        <div className="border font-lato border-[#e7d7b4] rounded-sm overflow-hidden h-fit">
            <div className="bg-[#26062b] text-white px-4 py-2 font-medium text-sm uppercase tracking-wide">
                {title}
            </div>
            <div className="bg-white">
                {rows.map((row, idx) => (
                    <div
                        key={idx}
                        className="flex border-b border-[#e7d7b4] last:border-0 text-sm"
                    >
                        <div className="w-1/2 px-4 py-1 font-semibold text-gray-800 border-r border-[#e7d7b4] ">
                            {row.label}
                        </div>
                        <div className="w-1/2 px-4 py-1 text-gray-700">
                            {row.value || "-"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Helper for the full-width bottom rows
    const FullWidthRow = ({
        label,
        value,
    }: {
        label: string;
        value: string | undefined;
    }) => (
        <div className="flex border font-lato border-[#e7d7b4] border-t-0 first:border-t text-sm">
            <div className="w-[200px] min-w-[150px] px-4 py-1 font-semibold text-gray-800 border-r border-[#e7d7b4] ">
                {label}
            </div>
            <div className="flex-1 px-4 py-1 text-gray-700">{value || "-"}</div>
        </div>
    );

    // Helper for Info Cards
    const InfoCard = ({
        icon: Icon,
        title,
        subtitle,
        desc,
    }: {
        icon: any;
        title: string;
        subtitle: string;
        desc: string;
    }) => (
        <div className="border border-[#e7d7b4] rounded-lg p-4 flex flex-col gap-1 relative">
            <Icon className="w-5 h-5 text-gray-900 mb-1" />
            <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
            <p className="text-xs text-gray-400 mt-1">{desc}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans pb-20 pt-5 ">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Top Navigation & Tabs */}
                <div className="flex flex-col md:flex-row md:items-center justify-start mb-6 gap-4">
                    <Button
                        className="gold-reveal-btn  font-cormorantGaramond uppercase shadow-lg"
                        onClick={() => router.back()}
                    >
                        <span className="flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </span>
                    </Button>
                    <div className="flex gap-2">
                        {["IMAGE", "VIDEO", "CERTIFICATE"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={` px-6 py-2 text-sm font-medium border transition-colors uppercase shadow-lg ${
                                    activeTab === tab
                                        ? "bg-primary-yellow-2 border-0 text-gray-900 "
                                        : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="w-[100px] hidden md:block"></div>{" "}
                    {/* Spacer for alignment */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                    {/* Left Column: Media Viewer */}
                    <div className="lg:col-span-5">
                        <div className="aspect-square  rounded-lg relative flex items-center justify-center border border-gray-100 group">
                            <button className="absolute left-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 z-10 border border-gray-100">
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>

                            {activeTab === "IMAGE" &&
                                (diamond.webLink ? (
                                    <img
                                        src={diamond.webLink}
                                        alt="Diamond"
                                        className="max-w-full max-h-full object-cover mix-blend-multiply "
                                    />
                                ) : (
                                    <DiamondIcon className="w-48 h-48 text-gray-200" />
                                ))}
                            {activeTab === "VIDEO" &&
                                (diamond.videoLink ? (
                                    <iframe
                                        src={diamond.videoLink}
                                        className="w-full h-full"
                                        title="Diamond Video"
                                    />
                                ) : (
                                    <div className="text-gray-400">
                                        No Video Available
                                    </div>
                                ))}
                            {activeTab === "CERTIFICATE" && (
                                <div className="text-gray-400">
                                    Certificate View
                                </div>
                            )}

                            <button className="absolute right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 z-10 border border-gray-100">
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Basic Info */}
                    <div className="lg:col-span-7 space-y-8 ">
                        <div className="border-b border-primary-yellow-2 pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">
                                        Diamond Details
                                    </p>
                                    <h1 className="text-4xl font-serif font-medium text-gray-900 mb-2">
                                        {shapeName}{" "}
                                        {diamond.shape !== "RD"
                                            ? "Modified"
                                            : ""}
                                    </h1>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm font-medium text-gray-600">
                                        5.0 (258 Reviews)
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mt-2">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${diamond.priceListUSD.toLocaleString()} USD
                                </span>
                                {/* <span className="text-lg text-gray-400 line-through">
                                    ${(totalPrice * 1.1).toLocaleString()} USD
                                </span> */}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 text-lg">
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <InfoCard
                                    icon={DiamondIcon}
                                    title={`${shapeName} Shape`}
                                    subtitle="Classic cut known for maximum sparkle."
                                    desc=""
                                />
                                <InfoCard
                                    icon={Scale}
                                    title={`${diamond.weight} Carat`}
                                    subtitle="Measures a diamond's size and weight."
                                    desc=""
                                />
                                <InfoCard
                                    icon={Palette}
                                    title={`Color ${diamond.color}`}
                                    subtitle="Grades diamond's whiteness and purity."
                                    desc=""
                                />
                                <InfoCard
                                    icon={Eye}
                                    title={`Clarity ${diamond.clarity}`}
                                    subtitle="Reveals internal and external flaws."
                                    desc=""
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                variant="outline"
                                className="flex-1 h-12 border-gray-300 text-gray-700 font-semibold uppercase tracking-wide hover:bg-gray-50 rounded-sm"
                            >
                                Old Stone
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 h-12 border-gray-300 text-gray-700 font-semibold uppercase tracking-wide hover:bg-gray-50 rounded-sm"
                            >
                                Enquiry
                            </Button>
                            <Button className="flex-1 h-12  text-white font-semibold uppercase  border-none gold-reveal-btn  font-cormorantGaramond ">
                                <span>Add to Cart</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Detailed Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3 ">
                    <TableSection
                        title="Details"
                        rows={[
                            { label: "Packet No", value: diamond.stockRef },
                            { label: "Report No", value: diamond.certiNo },
                            { label: "Lab", value: diamond.lab },
                            {
                                label: "Rap.($)",
                                value: diamond.priceListUSD?.toLocaleString(),
                            },
                            { label: "Shape", value: diamond.shape },
                            { label: "Carat", value: diamond.weight },
                            { label: "Color", value: diamond.color },
                            { label: "Clarity", value: diamond.clarity },
                            { label: "Shade", value: diamond.shade },
                            { label: "Cut", value: diamond.cutGrade },
                            { label: "Polish", value: diamond.polish },
                            { label: "Symmetry", value: diamond.symmetry },
                            {
                                label: "Fluorescence",
                                value: diamond.fluorescenceIntensity,
                            },
                        ]}
                    />
                    <TableSection
                        title="Measurements"
                        rows={[
                            {
                                label: "Table%",
                                value: diamond.tablePerc?.toFixed(2),
                            },
                            {
                                label: "Depth%",
                                value: diamond.depthPerc?.toFixed(2),
                            },
                            { label: "Length", value: diamond.length },
                            { label: "Width", value: diamond.width },
                            { label: "Depth", value: diamond.height },
                            {
                                label: "Ratio",
                                value: (diamond.length / diamond.width).toFixed(
                                    2
                                ),
                            },
                            {
                                label: "Crown Angle",
                                value: diamond.crownAngle?.toFixed(2),
                            },
                            {
                                label: "Crown Height",
                                value: diamond.crownHeight?.toFixed(2),
                            },
                            {
                                label: "Pav Angle",
                                value: diamond.pavalionAngle?.toFixed(2),
                            },
                            {
                                label: "Pav Height",
                                value: diamond.pavalionDepth?.toFixed(2),
                            },
                            { label: "Girdle", value: diamond.girdle },
                            { label: "Culet", value: diamond.culetSize },
                            {
                                label: "Laser Ins.",
                                value: diamond.laserInscription,
                            },
                        ]}
                    />
                    <TableSection
                        title="Inclusion Details"
                        rows={[
                            { label: "Eye Clean", value: diamond.eyeClean },
                            { label: "Heart & Arrow", value: diamond.handA },
                            { label: "Brilliancy", value: "-" }, // Not in interface
                            { label: "Milky", value: diamond.milky },
                            {
                                label: "Black Inclusion",
                                value: diamond.blackinclusion,
                            },
                            { label: "Origin", value: diamond.origin },
                            { label: "City", value: diamond.city },
                            { label: "Country", value: diamond.country },
                            {
                                label: "Key to Symbols",
                                value: diamond.keyToSymbols?.length
                                    ? "Yes"
                                    : "No",
                            },
                        ]}
                    />
                </div>

                {/* Full Width Rows */}
                <div className="border border-[#e7d7b4] rounded-sm overflow-hidden mb-12">
                    <FullWidthRow
                        label="Key to Symbols"
                        value={diamond.keyToSymbols?.join(", ")}
                    />
                    <FullWidthRow
                        label="Report Comments"
                        value={diamond.certComment}
                    />
                    <FullWidthRow
                        label="HRC Comments"
                        value={diamond.memberComment}
                    />
                </div>
            </div>
        </div>
    );
}
