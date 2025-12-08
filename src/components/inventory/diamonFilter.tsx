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

// --- Types & Interfaces ---

export interface FilterState {
    shapes: DiamondShape[];
    caratRange: [number, number]; // [min, max]
    colors: DiamondColor[];
    clarities: DiamondClarity[];
    cuts: DiamondCut[];
    polish: DiamondCut[];
    symmetry: DiamondCut[];
    fluorescence: string[];
    lab: string[];
    priceRange: [number, number]; // [min, max]
    lengthRange: [number, number];
    widthRange: [number, number];
    depthRange: [number, number];
    depthPercentRange: [number, number];
    tablePercentRange: [number, number];
}

interface DiamondFiltersProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    onSearch: () => void;
    onReset: () => void;
}

// --- Constants ---

const SHAPES: { value: DiamondShape; label: string; icon?: string }[] = [
    { value: "Round", label: "Round", icon: "/shapes/round-diamond.png" }, // You might want to add icons later
    { value: "Princess", label: "Princess" },
    { value: "Pear", label: "Pear" },
    { value: "Oval", label: "Oval" },
    { value: "Emerald", label: "Emerald" },
    { value: "Marquise", label: "Marquise" },
    { value: "Heart", label: "Heart" },
    { value: "Radiant", label: "Radiant" },
    { value: "Asscher", label: "Asscher" },
    { value: "Cushion", label: "Cushion" },
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
    { label: "1.59 - 1.99", min: 1.59, max: 1.99 },
    { label: "1.59 - 1.99", min: 1.59, max: 1.99 }, // Duplicate in image, keeping for fidelity or fixing? Fixing creates better UX usually.
    { label: "10.00 - 10.99", min: 10.0, max: 10.99 },
];

const COLORS: DiamondColor[] = [
    "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O-Z"
];

// Grouping clarities visually as per image seems to be just a list
const CLARITIES: DiamondClarity[] = [
    "FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"
];

const CUT_OPTIONS: DiamondCut[] = ["EX", "VG", "G", "F", "I"]; // Assuming these match image: I, EX, VG, G, F
const FLUORESCENCE_OPTIONS = ["NON", "FNT", "MED", "STG", "VSL"];
const LAB_OPTIONS = ["GIA", "HRD", "IGI", "OTHERS"];

// --- Helper Components ---

const FilterSection = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
    <Card className={cn("p-4 border-none shadow-none bg-primary-purple-dark text-white rounded-md", className)}>
        <h3 className="text-sm font-semibold mb-3 text-white">{title}</h3>
        {children}
    </Card>
);

const ToggleButton = ({
    active,
    onClick,
    label,
    className
}: {
    active: boolean,
    onClick: () => void,
    label: string,
    className?: string
}) => (
    <button
        onClick={onClick}
        className={cn(
            "px-3 py-1.5 text-xs rounded transition-all border",
            active
                ? "bg-[#d4b98c] text-black border-[#d4b98c] font-medium"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
            className
        )}
    >
        {label}
    </button>
);

const RangeSliderWithInputs = ({
    label,
    value, // [min, max]
    onChange,
    minLimit,
    maxLimit,
    step = 0.01,
    unit = ""
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
        <Card className="p-3 bg-white border-none shadow-sm h-full flex flex-col justify-between">
            <h4 className="text-ws font-semibold text-primary-purple-dark mb-4 bg-primary-purple-dark text-white p-2 -mx-3 -mt-3 rounded-t-md">
                {label}
            </h4>
            <div className="px-2">
                <div className="mb-6 pt-4">
                    <Slider
                        defaultValue={[minLimit, maxLimit]}
                        value={[value[0], value[1]]}
                        min={minLimit}
                        max={maxLimit}
                        step={step}
                        onValueChange={(vals) => onChange([vals[0], vals[1]])}
                        className="my-4"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                        <span>{minLimit}</span>
                        <span>{maxLimit}</span>
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <Input
                        type="number"
                        className="h-8 text-xs w-full"
                        value={value[0]}
                        onChange={(e) => onChange([Number(e.target.value), value[1]])}
                        step={step}
                    />
                    <span className="text-gray-400 text-xs">To</span>
                    <Input
                        type="number"
                        className="h-8 text-xs w-full"
                        value={value[1]}
                        onChange={(e) => onChange([value[0], Number(e.target.value)])}
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
    onSearch,
    onReset,
}) => {

    // Generic toggle helper
    const toggleFilter = <T extends string>(
        currentList: T[],
        item: T,
        key: keyof FilterState
    ) => {
        const newList = currentList.includes(item)
            ? currentList.filter(i => i !== item)
            : [...currentList, item];
        setFilters(prev => ({ ...prev, [key]: newList }));
    };

    return (
        <div className="w-full bg-white p-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* --- Left Column (Shapes, Carat, Color) --- */}
                <div className="lg:col-span-4 flex flex-col gap-4">

                    {/* Shapes */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm gap-1">
                        <div className="bg-primary-purple-dark text-white p-2 font-semibold text-sm">Shapes</div>
                        <div className="p-3 grid grid-cols-5 gap-2 bg-white">
                            {SHAPES.map((shape) => (
                                <button
                                    key={shape.value}
                                    onClick={() => toggleFilter(filters.shapes, shape.value, "shapes")}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-2 rounded border transition-colors aspect-square",
                                        filters.shapes.includes(shape.value)
                                            ? "bg-[#d4b98c] text-black border-[#d4b98c] font-medium"
                                            : "border-gray-100 hover:border-gray-300"
                                    )}
                                >
                                    {/* Placeholder for Shape Image */}
                                    <div className="w-6 h-6 bg-gray-200 rounded-full mb-1" />
                                    <span className="text-[9px] uppercase">{shape.label}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Carat */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple-dark text-white p-2 font-semibold text-sm">Carat</div>
                        <div className="p-4 bg-white">
                            <Slider
                                value={[filters.caratRange[0], filters.caratRange[1]]}
                                min={0}
                                max={30} // Assuming max for slider
                                step={0.01}
                                onValueChange={(vals) => setFilters(prev => ({ ...prev, caratRange: [vals[0], vals[1]] }))}
                                className="mb-2"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mb-4">
                                <span>0.00</span>
                                <span>30.00</span>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <Input
                                    type="number"
                                    className="h-8 text-xs"
                                    value={filters.caratRange[0]}
                                    onChange={(e) => setFilters(prev => ({ ...prev, caratRange: [Number(e.target.value), prev.caratRange[1]] }))}
                                />
                                <span className="self-center text-sm text-gray-400">To</span>
                                <Input
                                    type="number"
                                    className="h-8 text-xs"
                                    value={filters.caratRange[1]}
                                    onChange={(e) => setFilters(prev => ({ ...prev, caratRange: [prev.caratRange[0], Number(e.target.value)] }))}
                                />
                            </div>

                            <div className="flex flex-wrap gap-1">
                                {CARAT_RANGES.map((range, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setFilters(prev => ({ ...prev, caratRange: [range.min, range.max] }))}
                                        className="px-2 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 rounded border border-gray-200 text-gray-700"
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Color */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple-dark text-white p-2 font-semibold text-sm">Color</div>
                        <div className="p-3 bg-white flex flex-wrap gap-1">
                            {COLORS.map((color) => (
                                <ToggleButton
                                    key={color}
                                    label={color}
                                    active={filters.colors.includes(color)}
                                    onClick={() => toggleFilter(filters.colors, color, "colors")}
                                    className="w-8 h-8 flex items-center justify-center p-0"
                                />
                            ))}
                        </div>
                    </Card>

                </div>

                {/* --- Middle Column (Clarity, Finish, Fluorescence, Lab) --- */}
                <div className="lg:col-span-4 flex flex-col gap-4">

                    {/* Clarity */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple-dark text-white p-2 font-semibold text-sm">Clarity</div>
                        <div className="p-3 bg-white flex flex-wrap gap-1">
                            {CLARITIES.map((clarity) => (
                                <ToggleButton
                                    key={clarity}
                                    label={clarity}
                                    active={filters.clarities.includes(clarity)}
                                    onClick={() => toggleFilter(filters.clarities, clarity, "clarities")}
                                    className="min-w-[3rem] text-center"
                                />
                            ))}
                        </div>
                    </Card>

                    {/* Finish */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple-dark text-white p-2 font-semibold text-sm">Finish</div>
                        <div className="p-3 bg-white space-y-3">

                            {/* Generic Headers for Cut Grid */}
                            <div className="flex justify-end gap-1 mb-2">
                                {/* Example "Shortcuts" or group toggles could go here if needed like EX+, EX- from image */}
                            </div>

                            {/* Cut */}
                            <div className="flex items-center gap-2">
                                <span className="w-16 text-xs font-bold text-primary-purple-dark bg-primary-purple-dark text-white py-1 px-2 rounded-sm text-center">Cut</span>
                                <div className="flex flex-1 gap-1">
                                    {CUT_OPTIONS.map(opt => (
                                        <ToggleButton
                                            key={`cut-${opt}`}
                                            label={opt}
                                            active={filters.cuts.includes(opt)}
                                            onClick={() => toggleFilter(filters.cuts, opt, "cuts")}
                                            className="flex-1"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Symmetry */}
                            <div className="flex items-center gap-2">
                                <span className="w-16 text-xs font-bold text-primary-purple-dark bg-primary-purple-dark text-white py-1 px-2 rounded-sm text-center">Symm.</span>
                                <div className="flex flex-1 gap-1">
                                    {CUT_OPTIONS.map(opt => (
                                        <ToggleButton
                                            key={`symm-${opt}`}
                                            label={opt}
                                            active={filters.symmetry.includes(opt)}
                                            onClick={() => toggleFilter(filters.symmetry, opt, "symmetry")}
                                            className="flex-1"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Polish */}
                            <div className="flex items-center gap-2">
                                <span className="w-16 text-xs font-bold text-primary-purple-dark bg-primary-purple-dark text-white py-1 px-2 rounded-sm text-center">Polish</span>
                                <div className="flex flex-1 gap-1">
                                    {CUT_OPTIONS.map(opt => (
                                        <ToggleButton
                                            key={`pol-${opt}`}
                                            label={opt}
                                            active={filters.polish.includes(opt)}
                                            onClick={() => toggleFilter(filters.polish, opt, "polish")}
                                            className="flex-1"
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </Card>

                    {/* Fluorescence */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple-dark text-white p-2 font-semibold text-sm">Fluorescence</div>
                        <div className="p-3 bg-white flex flex-wrap gap-1">
                            {FLUORESCENCE_OPTIONS.map((fluor) => (
                                <ToggleButton
                                    key={fluor}
                                    label={fluor}
                                    active={filters.fluorescence.includes(fluor)}
                                    onClick={() => toggleFilter(filters.fluorescence, fluor, "fluorescence")}
                                />
                            ))}
                        </div>
                    </Card>

                    {/* Lab */}
                    <Card className="p-0 overflow-hidden border-none shadow-sm">
                        <div className="bg-primary-purple-dark text-white p-2 font-semibold text-sm">Lab</div>
                        <div className="p-3 bg-white flex flex-wrap gap-1">
                            {LAB_OPTIONS.map((lab) => (
                                <ToggleButton
                                    key={lab}
                                    label={lab}
                                    active={filters.lab.includes(lab)}
                                    onClick={() => toggleFilter(filters.lab, lab, "lab")}
                                    className="min-w-[3rem]"
                                />
                            ))}
                        </div>
                    </Card>

                </div>

                {/* --- Right Column (Price & Measurements) --- */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-4">

                    <RangeSliderWithInputs
                        label="Price"
                        value={filters.priceRange}
                        onChange={(val) => setFilters(prev => ({ ...prev, priceRange: val }))}
                        minLimit={0}
                        maxLimit={1000000} // Example max
                        step={100}
                    />

                    <RangeSliderWithInputs
                        label="Length"
                        value={filters.lengthRange}
                        onChange={(val) => setFilters(prev => ({ ...prev, lengthRange: val }))}
                        minLimit={0}
                        maxLimit={20}
                    />

                    <RangeSliderWithInputs
                        label="Width"
                        value={filters.widthRange}
                        onChange={(val) => setFilters(prev => ({ ...prev, widthRange: val }))}
                        minLimit={0}
                        maxLimit={20}
                    />

                    <RangeSliderWithInputs
                        label="Depth"
                        value={filters.depthRange}
                        onChange={(val) => setFilters(prev => ({ ...prev, depthRange: val }))}
                        minLimit={0}
                        maxLimit={20}
                    />

                    <RangeSliderWithInputs
                        label="Depth %"
                        value={filters.depthPercentRange}
                        onChange={(val) => setFilters(prev => ({ ...prev, depthPercentRange: val }))}
                        minLimit={40}
                        maxLimit={90}
                    />

                    <RangeSliderWithInputs
                        label="Table %"
                        value={filters.tablePercentRange}
                        onChange={(val) => setFilters(prev => ({ ...prev, tablePercentRange: val }))}
                        minLimit={40}
                        maxLimit={90}
                    />

                </div>

            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={onReset}>
                    Reset Filters
                </Button>
                <Button onClick={onSearch} className="bg-primary-purple-dark hover:bg-[#2d1b4e]">
                    Search Inventory
                </Button>
            </div>
        </div>
    );
};
