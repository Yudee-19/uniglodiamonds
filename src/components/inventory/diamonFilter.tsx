// components/inventory/DiamondFilters.tsx
import React, { useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, Filter } from "lucide-react";
import {
    DiamondShape,
    DiamondColor,
    DiamondClarity,
    DiamondCut,
    DiamondColorType,
} from "@/interface/diamondInterface";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";

// --- Types & Interfaces ---

export interface FilterState {
    shape: DiamondShape[];
    caratRange: [number, number];
    color: DiamondColor[];
    clarity: DiamondClarity[];
    cutGrade: DiamondCut[];
    polish: DiamondCut[];
    symmetry: DiamondCut[];
    fluorescence: string[];
    lab: string[];
    priceRange: [number, number];
    discountRange: [number, number];
    pricePerCaratRange: [number, number];
    lengthRange: [number, number];
    widthRange: [number, number];
    heightRange: [number, number];
    depthRange: [number, number];
    depthPercentRange: [number, number];
    tablePercentRange: [number, number];
    isNatural: boolean | undefined;
    colorType: DiamondColorType | undefined;
    searchTerm: string | undefined;
}

interface DiamondFiltersProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    onReset: () => void;
    variant?: "default" | "sidebar";
}

// --- Constants ---

const SHAPES: { value: DiamondShape; label: string; icon: string }[] = [
    { value: "RD", label: "Round", icon: "/shapes/round-diamond.png" },
    { value: "PR", label: "Princess", icon: "/shapes/princess-diamond.png" },
    { value: "PS", label: "Pear", icon: "/shapes/pear-diamond.png" },
    { value: "OV", label: "Oval", icon: "/shapes/Oval-Diamond.png" },
    { value: "EM", label: "Emerald", icon: "/shapes/emerald-diamond.png" },
    { value: "MQ", label: "Marquise", icon: "/shapes/marquise-diamond.png" },
    { value: "HT", label: "Heart", icon: "/shapes/heart.png" },
    { value: "RA", label: "Radiant", icon: "/shapes/radiant-diamond.png" },
    { value: "AS", label: "Asscher", icon: "/shapes/asscher-diamond.png" },
    { value: "CU", label: "Cushion", icon: "/shapes/cushion-diamond.png" },
];

const CARAT_RANGES = [
    { label: "0.18 - 0.22", min: 0.18, max: 0.22 },
    { label: "0.23 - 0.29", min: 0.23, max: 0.29 },
    { label: "0.30 - 0.39", min: 0.3, max: 0.39 },
    { label: "0.40 - 0.49", min: 0.4, max: 0.49 },
    { label: "0.50 - 0.59", min: 0.5, max: 0.59 },
    { label: "0.60 - 0.69", min: 0.6, max: 0.69 },
    { label: "0.70 - 0.79", min: 0.7, max: 0.79 },
    { label: "0.80 - 0.89", min: 0.8, max: 0.89 },
    { label: "0.90 - 0.99", min: 0.9, max: 0.99 },
    { label: "1.00 - 1.49", min: 1.0, max: 1.49 },
    { label: "1.50 - 1.99", min: 1.5, max: 1.99 },
    { label: "2.00 - 2.99", min: 2.0, max: 2.99 },
    { label: "10.00 - 10.99", min: 10.0, max: 10.99 },
];

const COLORS: DiamondColor[] = [
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

const FANCY_COLORS = [
    "E-F",
    "FANCY VIVID BLUE",
    "FBOY",
    "FIP",
    "FIY",
    "FLB",
    "FLBY",
    "FVY",
    "FY",
    "Fancy Deep Brownish Orangy Yellow*",
    "Fancy Orange-Brown",
    "Light Yellow-Green*",
    "N-O",
    "OP",
    "QR",
    "ST",
    "UV",
    "WX",
    "YZ",
    "f*",
];

const CLARITIES: DiamondClarity[] = [
    "FL",
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
    "I1",
    "I2",
];

const CUT_OPTIONS: DiamondCut[] = ["EX", "VG", "G", "F", "I"];
const FLUORESCENCE_OPTIONS = ["NON", "FNT", "MED", "STG", "VSL"];
const LAB_OPTIONS = ["GIA", "HRD", "IGI", "OTHERS"];

// --- Helper Components ---

interface DiamondFilterSectionProps {
    title: string;
    children: React.ReactNode;
    variant?: "default" | "sidebar";
    className?: string; // Content class
    wrapperClassName?: string;
}

const DiamondFilterSection: React.FC<DiamondFilterSectionProps> = ({
    title,
    children,
    variant = "default",
    className,
    wrapperClassName,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    if (variant === "default") {
        return (
            <Card
                className={cn(
                    "p-0 overflow-hidden border-none shadow-sm gap-0",
                    wrapperClassName,
                )}
            >
                <div className="bg-primary-purple2 text-white p-2 font-semibold text-sm">
                    {title}
                </div>
                <div
                    className={cn(
                        "p-3 bg-white border-primary-yellow-2 border rounded-b-lg",
                        className,
                    )}
                >
                    {children}
                </div>
            </Card>
        );
    }

    return (
        <div
            className={cn(
                "border rounded-md border-primary-yellow-3 mx-2 my-1 overflow-hidden  ",
                wrapperClassName,
            )}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none rounded-t-md "
            >
                {title}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 text-gray-500 transition-transform duration-200",
                        isOpen && "rotate-180",
                    )}
                />
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out rounded-md",
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
                )}
            >
                <div className={cn("p-4 bg-white pt-2", className)}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const ToggleButton = ({
    active,
    onClick,
    label,
    className,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    className?: string;
}) => (
    <button
        onClick={onClick}
        className={cn(
            "px-3 py-1.5 cursor-pointer text-xs rounded transition-all border",
            active
                ? "bg-primary-yellow-2 text-black  font-medium"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
            className,
        )}
    >
        {label}
    </button>
);

const RangeSliderWithInputs = ({
    label,
    value,
    onChange,
    minLimit,
    maxLimit,
    step = 0.01,
    unit = "",
    variant = "default",
    disabled = false,
}: {
    label: string;
    value: [number, number];
    onChange: (val: [number, number]) => void;
    minLimit: number;
    maxLimit: number;
    step?: number;
    unit?: string;
    variant?: "default" | "sidebar";
    disabled?: boolean;
}) => {
    return (
        <DiamondFilterSection
            title={label}
            variant={variant}
            className="flex flex-col gap-3 py-3"
            wrapperClassName={
                variant === "default"
                    ? "h-full flex flex-col justify-start"
                    : ""
            }
        >
            <div className={cn(disabled && "opacity-50 pointer-events-none")}>
                <Slider
                    defaultValue={[minLimit, maxLimit]}
                    value={[value[0], value[1]]}
                    min={minLimit}
                    max={maxLimit}
                    step={step}
                    onValueChange={(vals) => onChange([vals[0], vals[1]])}
                    className=""
                    disabled={disabled}
                />
                <div className="flex justify-between text-[10px] text-gray-800 mt-1">
                    <span>{minLimit}</span>
                    <span>{maxLimit}</span>
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <Input
                    type="number"
                    className="h-8 text-xs border-primary-yellow-2 border rounded-lg"
                    value={value[0]}
                    onChange={(e) =>
                        onChange([Number(e.target.value), value[1]])
                    }
                    step={step}
                    disabled={disabled}
                />
                <span className="text-gray-800 text-xs">To</span>
                <Input
                    type="number"
                    className="h-8 text-xs border-primary-yellow-2 border rounded-lg"
                    value={value[1]}
                    onChange={(e) =>
                        onChange([value[0], Number(e.target.value)])
                    }
                    step={step}
                    disabled={disabled}
                />
            </div>
            {disabled && (
                <p className="text-xs text-red-500 text-center">
                    Please login to view prices
                </p>
            )}
        </DiamondFilterSection>
    );
};

export const DiamondFilters: React.FC<DiamondFiltersProps> = ({
    filters,
    setFilters,
    onReset,
    variant = "default",
}) => {
    const { isAuthenticated } = useAuth();
    // Generic toggle helper
    const toggleFilter = <T extends string>(
        currentList: T[],
        item: T,
        key: keyof FilterState,
    ) => {
        const newList = currentList.includes(item)
            ? currentList.filter((i) => i !== item)
            : [...currentList, item];
        setFilters((prev) => ({ ...prev, [key]: newList }));
    };

    const ShapesContent = useCallback(
        ({ variant }: { variant: boolean }) => {
            return (
                <div
                    className={`grid ${variant ? "grid-cols-2  sm:grid-cols-4 " : "grid-cols-5"} gap-2`}
                >
                    {SHAPES.map((shape) => (
                        <button
                            key={shape.value}
                            onClick={() =>
                                toggleFilter(
                                    filters.shape,
                                    shape.value,
                                    "shape",
                                )
                            }
                            className={cn(
                                "flex cursor-pointer flex-col items-center justify-center p-2 rounded border transition-colors aspect-square",
                                filters.shape.includes(shape.value)
                                    ? "bg-[#d4b98c] text-black border-[#d4b98c] font-medium"
                                    : " border-primary-yellow-2 border",
                            )}
                        >
                            <Image
                                src={shape.icon}
                                width={54}
                                height={54}
                                alt={shape.label}
                                className=" aspect-square object-contain "
                            />
                        </button>
                    ))}
                </div>
            );
        },
        [filters.shape],
    );

    const caratContent = (
        <>
            <Slider
                value={[filters.caratRange[0], filters.caratRange[1]]}
                min={0}
                max={10.99}
                step={0.01}
                onValueChange={(vals) =>
                    setFilters((prev) => ({
                        ...prev,
                        caratRange: [vals[0], vals[1]],
                    }))
                }
                className="mb-2"
            />
            <div className="flex justify-between text-xs text-stone-800 mb-4">
                <span>0.00</span>
                <span>10.99</span>
            </div>

            <div className="flex gap-2 mb-4">
                <Input
                    type="number"
                    className="h-8 text-xs border-primary-yellow-2 border rounded-lg"
                    value={filters.caratRange[0]}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            caratRange: [
                                Number(e.target.value),
                                prev.caratRange[1],
                            ],
                        }))
                    }
                />
                <span className="self-center text-sm text-gray-400">To</span>
                <Input
                    type="number"
                    className="h-8 text-xs border-primary-yellow-2 border rounded-lg"
                    value={filters.caratRange[1]}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            caratRange: [
                                prev.caratRange[0],
                                Number(e.target.value),
                            ],
                        }))
                    }
                />
            </div>

            <div className="flex flex-wrap gap-1 mx-auto">
                {CARAT_RANGES.map((range, idx) => {
                    // Only show as selected if the range exactly matches the current filter
                    // AND the filter is not the full default range (0 to 10.99)
                    const isDefaultRange =
                        filters.caratRange[0] === 0 &&
                        filters.caratRange[1] === 10.99;

                    const isSelected =
                        !isDefaultRange &&
                        range.min >= filters.caratRange[0] &&
                        range.max <= filters.caratRange[1];

                    return (
                        <button
                            key={idx}
                            onClick={() => {
                                // Smart range selection logic
                                const currentMin = filters.caratRange[0];
                                const currentMax = filters.caratRange[1];

                                let newMin = currentMin;
                                let newMax = currentMax;

                                // If clicking on a range that's already selected, reset to that range only
                                if (
                                    isSelected &&
                                    currentMin !== range.min &&
                                    currentMax !== range.max
                                ) {
                                    newMin = range.min;
                                    newMax = range.max;
                                }
                                // If the new range is higher than current max, extend max
                                else if (range.min > currentMax) {
                                    newMax = range.max;
                                }
                                // If the new range is lower than current min, extend min
                                else if (range.max < currentMin) {
                                    newMin = range.min;
                                }
                                // If clicking within current range, reset to just this range
                                else if (
                                    range.min >= currentMin &&
                                    range.max <= currentMax
                                ) {
                                    newMin = range.min;
                                    newMax = range.max;
                                }
                                // Otherwise, extend to include this range
                                else {
                                    newMin = Math.min(currentMin, range.min);
                                    newMax = Math.max(currentMax, range.max);
                                }

                                setFilters((prev) => ({
                                    ...prev,
                                    caratRange: [newMin, newMax],
                                }));
                            }}
                            className={`px-1 cursor-pointer py-0 text-[12px] transition-all text-gray-700 border rounded-sm ${
                                isSelected
                                    ? "bg-primary-yellow-2 border-primary-yellow-2 font-semibold"
                                    : "bg-transparent hover:bg-primary-yellow-2/50 border-primary-yellow-2/50"
                            }`}
                        >
                            {range.label}
                        </button>
                    );
                })}
            </div>
        </>
    );

    const colorContent = (
        <TooltipProvider>
            <div className="flex flex-wrap gap-1">
                {(filters.colorType === "fancy" ? FANCY_COLORS : COLORS).map(
                    (color) => {
                        const isFancyColor = color.length > 1;
                        const displayLabel =
                            isFancyColor && color.length > 4
                                ? `${color.substring(0, 4)}...`
                                : color;

                        const isActive = filters.color.includes(
                            color as DiamondColor,
                        );

                        // Create button without wrapping in ToggleButton component
                        const button = (
                            <button
                                onClick={() =>
                                    toggleFilter(
                                        filters.color,
                                        color as DiamondColor,
                                        "color",
                                    )
                                }
                                className={cn(
                                    " cursor-pointer px-3 py-1.5 text-xs rounded transition-all border",
                                    isActive
                                        ? "bg-primary-yellow-2 text-black font-medium"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
                                    "border border-primary-yellow-2",
                                    isFancyColor
                                        ? "min-w-[60px] text-center px-2 py-1"
                                        : "w-6 h-5 flex items-center justify-center p-0",
                                )}
                            >
                                {displayLabel}
                            </button>
                        );

                        return isFancyColor && color.length > 4 ? (
                            <Tooltip key={color}>
                                <TooltipTrigger asChild>
                                    {button}
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">{color}</p>
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <React.Fragment key={color}>
                                {button}
                            </React.Fragment>
                        );
                    },
                )}
            </div>
        </TooltipProvider>
    );

    const clarityContent = (
        <div className="flex flex-wrap gap-1">
            {CLARITIES.map((clarity) => (
                <ToggleButton
                    key={clarity}
                    label={clarity}
                    active={filters.clarity.includes(clarity)}
                    onClick={() =>
                        toggleFilter(filters.clarity, clarity, "clarity")
                    }
                    className="min-w-[10] text-center border border-primary-yellow-2 px-2 py-1 "
                />
            ))}
        </div>
    );

    const finishContent = (
        <div className="space-y-3">
            <div className="flex justify-center gap-2">
                <ToggleButton
                    label="3EX"
                    active={false}
                    onClick={() => {
                        setFilters((prev) => ({
                            ...prev,
                            cutGrade: ["EX"],
                            symmetry: ["EX"],
                            polish: ["EX"],
                        }));
                    }}
                    className="px-4 py-2 bg-primary-purple2 text-white border-primary-purple2 hover:bg-primary-purple2/90"
                />
                <ToggleButton
                    label="EX-"
                    active={false}
                    onClick={() => {
                        setFilters((prev) => ({
                            ...prev,
                            cutGrade: ["EX"],
                            symmetry: ["EX", "VG"],
                            polish: ["EX", "VG"],
                        }));
                    }}
                    className="px-4 py-2 bg-primary-purple2 text-white border-primary-purple2 hover:bg-primary-purple2/90"
                />
                <ToggleButton
                    label="VG+"
                    active={false}
                    onClick={() => {
                        setFilters((prev) => ({
                            ...prev,
                            cutGrade: ["VG"],
                            symmetry: ["EX", "VG"],
                            polish: ["EX", "VG"],
                        }));
                    }}
                    className="px-4 py-2 bg-primary-purple2 text-white border-primary-purple2 hover:bg-primary-purple2/90"
                />
                <ToggleButton
                    label="VG-"
                    active={false}
                    onClick={() => {
                        setFilters((prev) => ({
                            ...prev,
                            cutGrade: ["VG"],
                            symmetry: ["VG", "G"],
                            polish: ["VG", "G"],
                        }));
                    }}
                    className="px-4 py-2 bg-primary-purple2 text-white border-primary-purple2 hover:bg-primary-purple2/90"
                />
            </div>
            {/* Cut */}
            <div className="flex items-center gap-2">
                <span className="w-16 text-sm font-semibold text-white bg-primary-purple2 py-1 px-2 rounded-sm text-center">
                    Cut
                </span>
                <div className="flex flex-1 gap-1">
                    {CUT_OPTIONS.map((opt) => (
                        <ToggleButton
                            key={`cut-${opt}`}
                            label={opt}
                            active={filters.cutGrade.includes(opt)}
                            onClick={() =>
                                toggleFilter(filters.cutGrade, opt, "cutGrade")
                            }
                            className="flex-1 border border-primary-yellow-2"
                        />
                    ))}
                </div>
            </div>

            {/* Symmetry */}
            <div className="flex items-center gap-2">
                <span className="w-16 text-sm font-semibold text-white bg-primary-purple2 py-1 px-2 rounded-sm text-center">
                    Symm.
                </span>
                <div className="flex flex-1 gap-1">
                    {CUT_OPTIONS.map((opt) => (
                        <ToggleButton
                            key={`symm-${opt}`}
                            label={opt}
                            active={filters.symmetry.includes(opt)}
                            onClick={() =>
                                toggleFilter(filters.symmetry, opt, "symmetry")
                            }
                            className="flex-1 border border-primary-yellow-2"
                        />
                    ))}
                </div>
            </div>

            {/* Polish */}
            <div className="flex items-center gap-2">
                <span className="w-16 text-sm font-semibold text-white bg-primary-purple2 py-1 px-2 rounded-sm text-center">
                    Polish
                </span>
                <div className="flex flex-1 gap-1">
                    {CUT_OPTIONS.map((opt) => (
                        <ToggleButton
                            key={`pol-${opt}`}
                            label={opt}
                            active={filters.polish.includes(opt)}
                            onClick={() =>
                                toggleFilter(filters.polish, opt, "polish")
                            }
                            className="flex-1 border border-primary-yellow-2"
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    const fluorescenceContent = (
        <div className="flex flex-wrap gap-1">
            {FLUORESCENCE_OPTIONS.map((fluor) => (
                <ToggleButton
                    key={fluor}
                    label={fluor}
                    active={filters.fluorescence.includes(fluor)}
                    onClick={() =>
                        toggleFilter(
                            filters.fluorescence,
                            fluor,
                            "fluorescence",
                        )
                    }
                    className="border border-primary-yellow-2"
                />
            ))}
        </div>
    );

    const labContent = (
        <div className="flex flex-wrap gap-1">
            {LAB_OPTIONS.map((lab) => (
                <ToggleButton
                    key={lab}
                    label={lab}
                    active={filters.lab.includes(lab)}
                    onClick={() => toggleFilter(filters.lab, lab, "lab")}
                    className="min-w-[12] border border-primary-yellow-2 rounded-sm"
                />
            ))}
        </div>
    );

    // Sliders
    const sliderGroup = (
        <>
            <RangeSliderWithInputs
                label="Price"
                value={filters.priceRange}
                onChange={(val) =>
                    setFilters((prev) => ({ ...prev, priceRange: val }))
                }
                minLimit={0}
                maxLimit={1000000}
                step={100}
                variant={variant}
                disabled={!isAuthenticated}
            />
            <RangeSliderWithInputs
                label="Price/ct"
                value={filters.pricePerCaratRange}
                onChange={(val) =>
                    setFilters((prev) => ({ ...prev, pricePerCaratRange: val }))
                }
                minLimit={0}
                maxLimit={1000000}
                step={100}
                variant={variant}
                disabled={!isAuthenticated}
            />
            <RangeSliderWithInputs
                label="Discount %"
                value={filters.discountRange}
                onChange={(val) =>
                    setFilters((prev) => ({ ...prev, discountRange: val }))
                }
                minLimit={-100}
                maxLimit={100}
                step={1}
                variant={variant}
            />

            <RangeSliderWithInputs
                label="Length"
                value={filters.lengthRange}
                onChange={(val) =>
                    setFilters((prev) => ({
                        ...prev,
                        lengthRange: val,
                    }))
                }
                minLimit={0}
                maxLimit={20}
                variant={variant}
            />

            <RangeSliderWithInputs
                label="Width"
                value={filters.widthRange}
                onChange={(val) =>
                    setFilters((prev) => ({ ...prev, widthRange: val }))
                }
                minLimit={0}
                maxLimit={20}
                variant={variant}
            />
            <RangeSliderWithInputs
                label="Height"
                value={filters.heightRange}
                onChange={(val) =>
                    setFilters((prev) => ({ ...prev, heightRange: val }))
                }
                minLimit={0}
                maxLimit={20}
                variant={variant}
            />

            <RangeSliderWithInputs
                label="Depth %"
                value={filters.depthRange}
                onChange={(val) =>
                    setFilters((prev) => ({ ...prev, depthRange: val }))
                }
                minLimit={0}
                maxLimit={100}
                variant={variant}
            />

            {/* <RangeSliderWithInputs
                label="Depth %"
                value={filters.depthPercentRange}
                onChange={(val) =>
                    setFilters((prev) => ({
                        ...prev,
                        depthPercentRange: val,
                    }))
                }
                minLimit={40}
                maxLimit={90}
                variant={variant}
            /> */}

            <RangeSliderWithInputs
                label="Table %"
                value={filters.tablePercentRange}
                onChange={(val) =>
                    setFilters((prev) => ({
                        ...prev,
                        tablePercentRange: val,
                    }))
                }
                minLimit={40}
                maxLimit={90}
                variant={variant}
            />
        </>
    );

    if (variant === "sidebar") {
        return (
            <div className="w-full bg-white font-lato flex flex-col">
                <DiamondFilterSection title="Shapes" variant="sidebar">
                    {<ShapesContent variant={true} />}
                </DiamondFilterSection>
                <DiamondFilterSection title="Carat" variant="sidebar">
                    {caratContent}
                </DiamondFilterSection>
                <DiamondFilterSection title="Color" variant="sidebar">
                    {colorContent}
                </DiamondFilterSection>
                <DiamondFilterSection title="Clarity" variant="sidebar">
                    {clarityContent}
                </DiamondFilterSection>
                {/* Finish (Cut, Polish, Symm) */}
                <DiamondFilterSection title="Finish" variant="sidebar">
                    {finishContent}
                </DiamondFilterSection>
                <DiamondFilterSection title="Fluorescence" variant="sidebar">
                    {fluorescenceContent}
                </DiamondFilterSection>
                <DiamondFilterSection title="Lab" variant="sidebar">
                    {labContent}
                </DiamondFilterSection>

                {/* Sliders - RangeSliderWithInputs already returns DiamondFilterSection! 
                     But in sidebar mode, it returns an accordion item. 
                     So we can just render them directly.
                 */}
                <div className="flex flex-col">{sliderGroup}</div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white p-2 rounded-lg font-lato">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-1 gap-2">
                {/* --- Left Column (Shapes, Carat, Color) --- */}
                <div className="lg:col-span-4  flex flex-col gap-2 ">
                    <DiamondFilterSection title="Shapes">
                        {<ShapesContent variant={false} />}
                    </DiamondFilterSection>

                    <DiamondFilterSection title="Carat">
                        {caratContent}
                    </DiamondFilterSection>

                    <DiamondFilterSection title="Color">
                        {colorContent}
                    </DiamondFilterSection>
                </div>

                {/* --- Middle Column (Clarity, Finish, Fluorescence, Lab) --- */}
                <div className="lg:col-span-4  flex flex-col gap-2">
                    <DiamondFilterSection title="Clarity">
                        {clarityContent}
                    </DiamondFilterSection>

                    <DiamondFilterSection title="Finish">
                        {finishContent}
                    </DiamondFilterSection>

                    <DiamondFilterSection title="Fluorescence">
                        {fluorescenceContent}
                    </DiamondFilterSection>

                    <DiamondFilterSection title="Lab">
                        {labContent}
                    </DiamondFilterSection>
                </div>

                {/* --- Right Column (Price & Measurements) --- */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                    {sliderGroup}
                </div>
            </div>

            {/* Actions */}
            {/* <div className="flex justify-end gap-3 mt-4">
                <Button variant="" onClick={onReset}>
                    Reset Filters
                </Button>
            </div> */}
        </div>
    );
};
