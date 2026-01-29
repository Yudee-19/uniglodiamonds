"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchDiamondById } from "@/services/diamondService";
import {
    Diamond,
    PublicDiamond,
    getShapeFullName,
} from "@/interface/diamondInterface";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Diamond as DiamondIcon,
    Scale,
    Palette,
    Eye,
    Loader2,
    Clock,
    MessageSquare,
    GemIcon,
} from "lucide-react";
import { addToCart, holdDiamond } from "@/services/cartService";
import { createDiamondInquiry } from "@/services/inquiryService";
import { toast } from "sonner";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { DiamondImage } from "@/app/compare/page";
import SimilarDiamonds from "./SimilarDiamonds";

interface DiamondDetailViewProps {
    diamondId: string;
    isPublic?: boolean;
}

export default function DiamondDetailView({
    diamondId,
    isPublic = false,
}: DiamondDetailViewProps) {
    const router = useRouter();
    const [diamond, setDiamond] = useState<Diamond | PublicDiamond | null>(
        null,
    );
    const [similarDiamondIds, setSimilarDiamondIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<
        "IMAGE" | "VIDEO" | "CERTIFICATE"
    >("IMAGE");
    const [holdLoading, setHoldLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);
    const [showHoldDialog, setShowHoldDialog] = useState(false);

    // Inquiry states
    const [showInquiryDialog, setShowInquiryDialog] = useState(false);
    const [inquiryText, setInquiryText] = useState("");
    const [inquiryLoading, setInquiryLoading] = useState(false);

    // Type guard to check if diamond is Diamond (not PublicDiamond)
    const isDiamond = (d: Diamond | PublicDiamond): d is Diamond => {
        return "_id" in d;
    };

    useEffect(() => {
        const loadDiamond = async () => {
            if (diamondId) {
                try {
                    setLoading(true);
                    const id = decodeURIComponent(diamondId as string);
                    const response = await fetchDiamondById(id, isPublic);
                    setDiamond(response.diamond);
                    setSimilarDiamondIds(response.similarDiamonds || []);
                } catch (err) {
                    setError(
                        "Failed to load diamond details. Please try again.",
                    );
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadDiamond();
    }, [diamondId, isPublic]);

    const handleHoldDiamondConfirm = async () => {
        if (!diamond?.stockRef) {
            toast.error("Stock reference not available");
            return;
        }

        try {
            setHoldLoading(true);
            const response = await holdDiamond(diamond.stockRef);
            toast.success(response.message || "Diamond held successfully");
            setShowHoldDialog(false);
        } catch (error: any) {
            toast.error(error || "Failed to hold diamond");
        } finally {
            setHoldLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isDiamond(diamond!)) {
            toast.error("Please login to add items to cart");
            router.push("/login");
            return;
        }

        if (!diamond._id) {
            toast.error("Diamond ID not available");
            return;
        }

        try {
            setCartLoading(true);
            const response = await addToCart([diamond._id]);
            toast.success(response.message);
        } catch (error: any) {
            toast.error(error || "Failed to add diamond to cart");
        } finally {
            setCartLoading(false);
        }
    };

    const handleSubmitInquiry = async () => {
        if (!diamond?.stockRef) {
            toast.error("Stock reference not available");
            return;
        }

        if (!inquiryText.trim()) {
            toast.error("Please enter your inquiry");
            return;
        }

        try {
            setInquiryLoading(true);
            const response = await createDiamondInquiry({
                stockRef: diamond.stockRef,
                query: inquiryText,
            });
            toast.success(response.message || "Inquiry submitted successfully");
            setShowInquiryDialog(false);
            setInquiryText("");
        } catch (error: any) {
            toast.error(error || "Failed to submit inquiry");
        } finally {
            setInquiryLoading(false);
        }
    };

    const getCertificateLink = (lab: string, certNo: string | undefined) => {
        if (!certNo) return null;

        const labUpper = lab.toUpperCase();

        switch (labUpper) {
            case "GIA":
                return `https://www.gia.edu/report-check?reportno=${certNo}`;
            case "IGI":
                return `https://www.igi.org/verify-your-report/?r=${certNo}`;
            case "HRD":
                return `https://my.hrdantwerp.com/Download/GetGradingReportPdf/?reportNumber=${certNo}`;
            default:
                return null;
        }
    };

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
                        <div className="w-1/2 px-4 py-1 font-semibold text-gray-800 border-r border-[#e7d7b4]">
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
            <div className="w-[200px] min-w-[150px] px-4 py-1 font-semibold text-gray-800 border-r border-[#e7d7b4]">
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
        <div className="min-h-screen bg-white text-gray-800 font-sans pb-20 pt-5">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Top Navigation & Tabs */}
                <div className="flex flex-col md:flex-row md:items-center justify-start mb-6 gap-4">
                    <Button
                        className="gold-reveal-btn font-cormorantGaramond uppercase shadow-lg"
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
                                className={`px-6 py-2 text-sm font-medium border transition-colors uppercase shadow-lg ${
                                    activeTab === tab
                                        ? "bg-primary-yellow-2 border-0 text-gray-900"
                                        : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                    {/* Left Column: Media Viewer */}
                    <div className="lg:col-span-5">
                        <div className="aspect-square rounded-lg relative flex items-center justify-center border border-gray-100 group">
                            {activeTab === "IMAGE" &&
                                (diamond.webLink ? (
                                    <DiamondImage src={diamond.webLink} />
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
                        </div>
                    </div>

                    {/* Right Column: Basic Info */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="border-b border-primary-yellow-2 pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-900 font-lato text-2xl mb-1">
                                        {shapeName} {diamond.weight}ct{" "}
                                        {diamond.color} {diamond.clarity}{" "}
                                        {isDiamond(diamond)
                                            ? diamond.cutGrade
                                            : ""}{" "}
                                        {isDiamond(diamond)
                                            ? diamond.polish
                                            : ""}
                                    </p>
                                    <h1 className="text-md font-cormorantGaramond font-medium text-gray-900 mb-2 flex items-center gap-2">
                                        Stock ID:{" "}
                                        <span className="font-bold">
                                            {diamond.stockRef}
                                        </span>
                                    </h1>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        {isDiamond(diamond) ? (
                                            <>
                                                <span>Report #:</span>
                                                {getCertificateLink(
                                                    diamond.lab,
                                                    diamond.certiNo,
                                                ) ? (
                                                    <a
                                                        href={
                                                            getCertificateLink(
                                                                diamond.lab,
                                                                diamond.certiNo,
                                                            )!
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:text-primary-yellow-3 underline font-semibold transition-colors"
                                                    >
                                                        {diamond.certiNo}
                                                    </a>
                                                ) : (
                                                    <span className="font-semibold">
                                                        {diamond.certiNo}
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <span>Report #: -</span>
                                        )}
                                        <span>•</span>
                                        <span>Lab: {diamond.lab}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Login Required Banner for Public Users */}
                            {isPublic && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                                    <p className="text-sm text-yellow-800">
                                        <span className="font-semibold">
                                            Login required:
                                        </span>{" "}
                                        Please{" "}
                                        <Link
                                            href="/login"
                                            className="underline hover:text-yellow-900"
                                        >
                                            login
                                        </Link>{" "}
                                        to view pricing information.
                                    </p>
                                </div>
                            )}

                            {/* Show price only for authenticated users */}
                            {isDiamond(diamond) && (
                                <div className="flex items-baseline gap-3 mt-4">
                                    <span className="text-3xl font-bold text-gray-900">
                                        $
                                        {diamond.priceListUSD?.toLocaleString()}{" "}
                                        USD
                                    </span>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 text-lg">
                                Diamond Specifications
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <InfoCard
                                    icon={GemIcon}
                                    title="Shape"
                                    subtitle={shapeName}
                                    desc=""
                                />
                                <InfoCard
                                    icon={Scale}
                                    title="Carat"
                                    subtitle={`${diamond.weight} ct`}
                                    desc=""
                                />
                                <InfoCard
                                    icon={Palette}
                                    title="Color"
                                    subtitle={diamond.color}
                                    desc=""
                                />
                                <InfoCard
                                    icon={Eye}
                                    title="Clarity"
                                    subtitle={diamond.clarity}
                                    desc=""
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {/* Inquiry Dialog - Available for everyone */}
                            {!isPublic && isDiamond(diamond) && (
                                <Dialog
                                    open={showInquiryDialog}
                                    onOpenChange={setShowInquiryDialog}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond disabled:opacity-50">
                                            <span className="flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4" />
                                                Enquiry
                                            </span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Diamond Inquiry
                                            </DialogTitle>
                                            <DialogDescription>
                                                Submit your inquiry about this
                                                diamond. Stock Ref:{" "}
                                                {diamond.stockRef}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <Textarea
                                                placeholder="Type your inquiry here... (e.g., Is this diamond available for immediate purchase?)"
                                                value={inquiryText}
                                                onChange={(e) =>
                                                    setInquiryText(
                                                        e.target.value,
                                                    )
                                                }
                                                rows={6}
                                                className="resize-none"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setShowInquiryDialog(false);
                                                    setInquiryText("");
                                                }}
                                                disabled={inquiryLoading}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleSubmitInquiry}
                                                disabled={
                                                    inquiryLoading ||
                                                    !inquiryText.trim()
                                                }
                                                className="rounded-sm"
                                            >
                                                {inquiryLoading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    "Send Enquiry"
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                            {/* Hold Diamond - Only for authenticated users */}
                            {!isPublic && isDiamond(diamond) && (
                                <AlertDialog
                                    open={showHoldDialog}
                                    onOpenChange={setShowHoldDialog}
                                >
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond disabled:opacity-50"
                                            disabled={holdLoading}
                                        >
                                            <span className="flex items-center gap-2">
                                                {holdLoading ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    "Hold Diamond"
                                                )}
                                            </span>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogMedia>
                                                <Clock className="text-primary-purple" />
                                            </AlertDialogMedia>
                                            <AlertDialogTitle>
                                                Hold this diamond?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will reserve the diamond
                                                for you temporarily. You can
                                                view all your held diamonds in
                                                the enquiry section.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                disabled={holdLoading}
                                            >
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={
                                                    handleHoldDiamondConfirm
                                                }
                                                disabled={holdLoading}
                                                className="rounded-sm"
                                            >
                                                {holdLoading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                        Holding...
                                                    </>
                                                ) : (
                                                    "Hold Diamond"
                                                )}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}

                            {/* Add to Cart - Only for authenticated users */}
                            {!isPublic && isDiamond(diamond) && (
                                <Button
                                    className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond disabled:opacity-50"
                                    onClick={handleAddToCart}
                                    disabled={cartLoading}
                                >
                                    <span className="flex items-center gap-2">
                                        {cartLoading && (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        )}
                                        Add to Cart
                                    </span>
                                </Button>
                            )}

                            {/* Login prompt for public users */}
                            {isPublic && (
                                <Button
                                    className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond"
                                    onClick={() => router.push("/login")}
                                >
                                    <span>Login to Purchase</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Detailed Tables - Show limited info for public */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
                    <TableSection
                        title="Details"
                        rows={[
                            { label: "Stock Ref", value: diamond.stockRef },
                            { label: "Lab", value: diamond.lab },
                            { label: "Shape", value: shapeName },
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
                            {
                                label: "Fluor Color",
                                value: diamond.fluorescenceColor,
                            },
                        ]}
                    />
                    <TableSection
                        title="Measurements"
                        rows={[
                            {
                                label: "Measurement",
                                value: diamond.measurements,
                            },
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
                            { label: "Height", value: diamond.height },
                            {
                                label: "Ratio",
                                value:
                                    diamond.length && diamond.width
                                        ? (
                                              diamond.length / diamond.width
                                          ).toFixed(2)
                                        : "-",
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
                        ]}
                    />
                    <TableSection
                        title="Additional Info"
                        rows={[
                            {
                                label: "Laser Ins.",
                                value: diamond.laserInscription,
                            },
                            {
                                label: "Cert Issue Date",
                                value: diamond.certIssueDate
                                    ? new Date(
                                          diamond.certIssueDate,
                                      ).toLocaleDateString()
                                    : "-",
                            },
                            { label: "Origin", value: diamond.origin },
                            { label: "Country", value: diamond.country },
                            { label: "Milky", value: diamond.milky },
                            {
                                label: "Black Inclusion",
                                value: diamond.blackinclusion,
                            },
                            { label: "Eye Clean", value: diamond.eyeClean },
                            {
                                label: "Key to Symbols",
                                value: diamond.keyToSymbols?.length
                                    ? "Yes"
                                    : "No",
                            },
                        ]}
                    />
                </div>

                {/* Full Width Rows - Only show for authenticated users */}
                {isDiamond(diamond) && (
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
                )}

                {/* Similar Diamonds Section */}
                {similarDiamondIds.length > 0 && (
                    <SimilarDiamonds
                        similarDiamondIds={similarDiamondIds}
                        isPublic={isPublic}
                    />
                )}
            </div>
        </div>
    );
}
