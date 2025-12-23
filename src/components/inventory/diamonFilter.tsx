// components/inventory/DiamondFilters.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
    DiamondShape,
    DiamondColor,
    DiamondClarity,
    DiamondCut,
} from "@/interface/diamondInterface";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- Types & Interfaces ---

export interface FilterState {
    shapes: DiamondShape[];
    caratRange: [number, number];
    colors: DiamondColor[];
    clarities: DiamondClarity[];
    cuts: DiamondCut[];
    polish: DiamondCut[];
    symmetry: DiamondCut[];
    fluorescence: string[];
    lab: string[];
    priceRange: [number, number];
    lengthRange: [number, number];
    widthRange: [number, number];
    depthRange: [number, number];
    depthPercentRange: [number, number];
    tablePercentRange: [number, number];
}

interface DiamondFiltersProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    onReset: () => void;
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
            "px-3 py-1.5 text-xs rounded transition-all border",
            active
                ? "bg-primary-yellow-2 text-black  font-medium"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
            className
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
}: {
    label: string;
    value: [number, number];
    onChange: (val: [number, number]) => void;
    minLimit: number;
    maxLimit: number;
    step?: number;
    unit?: string;
}) => {
    return (
        <Card className="p-0  border-none shadow-sm h-full flex flex-col justify-start gap-0">
            <h4 className="text-sm  font-semibold text-white  bg-primary-purple2  p-2 rounded-t-md">
                {label}
            </h4>
            <div className="px-2 border border-primary-yellow-2 rounded-b-lg w-full h-full flex flex-col gap-3 py-3">
                <div className="">
                    <Slider
                        defaultValue={[minLimit, maxLimit]}
                        value={[value[0], value[1]]}
                        min={minLimit}
                        max={maxLimit}
                        step={step}
                        onValueChange={(vals) => onChange([vals[0], vals[1]])}
                        className=""
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
                    />
                </div>
            </div>
        </Card>
    );
};

export const DiamondFilters: React.FC<DiamondFiltersProps> = ({
    filters,
    setFilters,
    onReset,
}) => {
    // Generic toggle helper
    const toggleFilter = <T extends string>(
        currentList: T[],
        item: T,
        key: keyof FilterState
    ) => {
        const newList = currentList.includes(item)
            ? currentList.filter((i) => i !== item)
            : [...currentList, item];
        setFilters((prev) => ({ ...prev, [key]: newList }));
    };

    return (
        <div className="w-full bg-white p-2 rounded-lg font-lato">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-1 gap-2">
                {/* --- Left Column (Shapes, Carat, Color) --- */}
                <div className="lg:col-span-4  flex flex-col gap-2 ">
                    {/* Shapes */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm gap-0">
                        <div className="bg-primary-purple2 text-white p-2 font-semibold text-sm">
                            Shapes
                        </div>
                        <div className="p-3 grid grid-cols-5 gap-2 bg-white border-primary-yellow-2 border rounded-b-lg">
                            {SHAPES.map((shape) => (
                                <button
                                    key={shape.value}
                                    onClick={() =>
                                        toggleFilter(
                                            filters.shapes,
                                            shape.value,
                                            "shapes"
                                        )
                                    }
                                    className={cn(
                                        "flex flex-col items-center justify-center p-2 rounded border transition-colors aspect-square",
                                        filters.shapes.includes(shape.value)
                                            ? "bg-[#d4b98c] text-black border-[#d4b98c] font-medium"
                                            : " border-primary-yellow-2 border"
                                    )}
                                >
                                    <Image
                                        src={shape.icon}
                                        width={54}
                                        height={54}
                                        alt={shape.label}
                                        className=" aspect-square object-contain "
                                    />
                                    {/* <span className="text-[9px] uppercase">
                                        {shape.label}
                                    </span> */}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Carat */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple2 text-white p-2 font-semibold text-sm">
                            Carat
                        </div>
                        <div className="p-2 py-3 bg-white border-primary-yellow-2 border rounded-b-lg">
                            <Slider
                                value={[
                                    filters.caratRange[0],
                                    filters.caratRange[1],
                                ]}
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
                                <span className="self-center text-sm text-gray-400">
                                    To
                                </span>
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
                                {CARAT_RANGES.map((range, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                caratRange: [
                                                    range.min,
                                                    range.max,
                                                ],
                                            }))
                                        }
                                        className="px-1 py-0 text-[12px] bg-transparent hover:bg-primary-yellow-2/50  text-gray-700 border-primary-yellow-2/50 border rounded-sm"
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Color */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple2 text-white p-2 font-semibold text-sm ">
                            Color
                        </div>
                        <div className="p-3 bg-white flex flex-wrap gap-1 border-primary-yellow-2 border rounded-b-lg">
                            {COLORS.map((color) => (
                                <ToggleButton
                                    key={color}
                                    label={color}
                                    active={filters.colors.includes(color)}
                                    onClick={() =>
                                        toggleFilter(
                                            filters.colors,
                                            color,
                                            "colors"
                                        )
                                    }
                                    className="w-6 h-5 flex items-center justify-center p-0 border border-primary-yellow-2 "
                                />
                            ))}
                        </div>
                    </Card>
                </div>

                {/* --- Middle Column (Clarity, Finish, Fluorescence, Lab) --- */}
                <div className="lg:col-span-4  flex flex-col gap-2">
                    {/* Clarity */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple2 text-white p-2 font-semibold text-sm">
                            Clarity
                        </div>
                        <div className="p-3 bg-white flex flex-wrap gap-1 border border-primary-yellow-2 rounded-b-lg">
                            {CLARITIES.map((clarity) => (
                                <ToggleButton
                                    key={clarity}
                                    label={clarity}
                                    active={filters.clarities.includes(clarity)}
                                    onClick={() =>
                                        toggleFilter(
                                            filters.clarities,
                                            clarity,
                                            "clarities"
                                        )
                                    }
                                    className="min-w-[10] text-center border border-primary-yellow-2 px-2 py-1 "
                                />
                            ))}
                        </div>
                    </Card>

                    {/* Finish */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple2 text-white p-2 font-semibold text-sm">
                            Finish
                        </div>
                        <div className="px-3 py-3 bg-white space-y-3 border border-primary-yellow-2 rounded-b-lg">
                            <div className="flex justify-center gap-2">
                                <ToggleButton
                                    label="EX+"
                                    active={false}
                                    onClick={() => {
                                        // Handle EX+ click
                                        setFilters((prev) => ({
                                            ...prev,
                                            cuts: ["EX"],
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
                                        // Handle EX- click
                                        setFilters((prev) => ({
                                            ...prev,
                                            cuts: ["EX", "VG"],
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
                                        // Handle VG+ click
                                        setFilters((prev) => ({
                                            ...prev,
                                            cuts: ["VG"],
                                            symmetry: ["VG"],
                                            polish: ["VG"],
                                        }));
                                    }}
                                    className="px-4 py-2 bg-primary-purple2 text-white border-primary-purple2 hover:bg-primary-purple2/90"
                                />
                                <ToggleButton
                                    label="VG-"
                                    active={false}
                                    onClick={() => {
                                        // Handle VG- click
                                        setFilters((prev) => ({
                                            ...prev,
                                            cuts: ["VG", "G"],
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
                                            active={filters.cuts.includes(opt)}
                                            onClick={() =>
                                                toggleFilter(
                                                    filters.cuts,
                                                    opt,
                                                    "cuts"
                                                )
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
                                            active={filters.symmetry.includes(
                                                opt
                                            )}
                                            onClick={() =>
                                                toggleFilter(
                                                    filters.symmetry,
                                                    opt,
                                                    "symmetry"
                                                )
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
                                            active={filters.polish.includes(
                                                opt
                                            )}
                                            onClick={() =>
                                                toggleFilter(
                                                    filters.polish,
                                                    opt,
                                                    "polish"
                                                )
                                            }
                                            className="flex-1 border border-primary-yellow-2"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Fluorescence */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple2 text-white p-2 font-semibold text-sm">
                            Fluorescence
                        </div>
                        <div className="p-3 bg-white flex flex-wrap gap-1 border border-primary-yellow-2 rounded-b-lg">
                            {FLUORESCENCE_OPTIONS.map((fluor) => (
                                <ToggleButton
                                    key={fluor}
                                    label={fluor}
                                    active={filters.fluorescence.includes(
                                        fluor
                                    )}
                                    onClick={() =>
                                        toggleFilter(
                                            filters.fluorescence,
                                            fluor,
                                            "fluorescence"
                                        )
                                    }
                                    className="border border-primary-yellow-2"
                                />
                            ))}
                        </div>
                    </Card>

                    {/* Lab */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple2 text-white p-2 font-semibold text-sm">
                            Lab
                        </div>
                        <div className="p-3 bg-white flex flex-wrap gap-1 border border-primary-yellow-2 rounded-b-lg">
                            {LAB_OPTIONS.map((lab) => (
                                <ToggleButton
                                    key={lab}
                                    label={lab}
                                    active={filters.lab.includes(lab)}
                                    onClick={() =>
                                        toggleFilter(filters.lab, lab, "lab")
                                    }
                                    className="min-w-[12] border border-primary-yellow-2 rounded-sm"
                                />
                            ))}
                        </div>
                    </Card>
                </div>

                {/* --- Right Column (Price & Measurements) --- */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                    <RangeSliderWithInputs
                        label="Price"
                        value={filters.priceRange}
                        onChange={(val) =>
                            setFilters((prev) => ({ ...prev, priceRange: val }))
                        }
                        minLimit={0}
                        maxLimit={1000000}
                        step={100}
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
                    />

                    <RangeSliderWithInputs
                        label="Width"
                        value={filters.widthRange}
                        onChange={(val) =>
                            setFilters((prev) => ({ ...prev, widthRange: val }))
                        }
                        minLimit={0}
                        maxLimit={20}
                    />

                    <RangeSliderWithInputs
                        label="Depth"
                        value={filters.depthRange}
                        onChange={(val) =>
                            setFilters((prev) => ({ ...prev, depthRange: val }))
                        }
                        minLimit={0}
                        maxLimit={20}
                    />

                    <RangeSliderWithInputs
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
                    />

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
                    />
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
