import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types & Interfaces ---
export interface AdvancedFilterState {
    fancyColors: string[];
    fancyIntensities: string[];
    fancyOvertones: string[];
    fluorescenceColors: string[];
    girdles: string[];
    girdleConditions: string[];
    girdleThin: string[];
    culetSizes: string[];
    culetConditions: string[];
    laserInscription: string[];
    countries: string[];
    treatments: string[];
    keyToSymbols: string[];
    availabilities: string[];
    crownAngleRange: [number, number];
    crownHeightRange: [number, number];
    pavilionAngleRange: [number, number];
    pavilionDepthRange: [number, number];
    girdlePercRange: [number, number];
}

interface AdvancedFiltersProps {
    filters: AdvancedFilterState;
    setFilters: React.Dispatch<React.SetStateAction<AdvancedFilterState>>;
    onReset: () => void;
}

// --- Constants ---
const FANCY_COLORS = ["Blue", "Brown", "Green", "Pink", "Yellow"];
const FANCY_INTENSITIES = [
    "Fancy",
    "Fancy Deep",
    "Fancy Intense",
    "Fancy Light",
    "Fancy Vivid",
    "Light",
    "Very Light",
];
const FANCY_OVERTONES = ["Brownish", "Brownish-Orangy", "Yellow"];
const FLUORESCENCE_COLORS = ["Blue", "Yellow"];
const GIRDLES = [
    "ETK",
    "ETN",
    "ETN to MED",
    "ETN to STK",
    "ETN to THK",
    "MED",
    "MED to ETK",
    "MED to STK",
    "MED to THK",
    "MED to VTK",
    "STK",
    "STK to THK",
    "THK",
    "THN",
    "THN to ETK",
    "THN to MED",
    "THN to STK",
    "THN to THK",
    "THN to VTK",
    "VTK",
    "VTN",
    "VTN to ETK",
    "VTN to MED",
    "VTN to STK",
    "VTN to THK",
    "VTN to VTK",
];
const GIRDLE_CONDITIONS = ["2.5 faceted", "Faceted", "Polished", "normal"];
const GIRDLE_THINS = [
    "Extremely Thin",
    "MED",
    "Medium",
    "STK",
    "THK",
    "THN",
    "Thin",
    "VTN",
    "Very Thin",
];
const CULET_SIZES = [
    "NON",
    "POINTED",
    "VSM",
    "SML",
    "MED",
    "SLG",
    "LGE",
    "VLG",
];
const CULET_CONDITIONS = [
    "None",
    "Pointed",
    "Very Small",
    "Small",
    "Medium",
    "Slightly Large",
    "Large",
    "Very Large",
];
const LASER_INSCRIPTION = ["Y", "N"];
const COUNTRIES = [
    "Belgium",
    "India",
    "Italy",
    "Spain",
    "United Kingdom",
    "France",
    "Germany",
];
const TREATMENTS = ["HPHT"];
const KEY_TO_SYMBOLS = [
    "Cloud",
    "Crystal",
    "Feather",
    "Needle",
    "Pinpoint",
    "Cavity",
    "Chip",
    "Natural",
    "Bruise",
    "Knot",
    "Twinning Wisp",
];
const AVAILABILITIES = ["A", "H", "M"];

// --- Helper Components ---
interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    children,
    className,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border rounded-md border-primary-yellow-3 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors"
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
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
                )}
            >
                <div className={cn("p-4 bg-white", className)}>{children}</div>
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
                ? "bg-primary-yellow-2 text-black font-medium"
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
    step = 0.1,
}: {
    label: string;
    value: [number, number];
    onChange: (val: [number, number]) => void;
    minLimit: number;
    maxLimit: number;
    step?: number;
}) => {
    return (
        <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">{label}</h4>
            <Slider
                value={[value[0], value[1]]}
                min={minLimit}
                max={maxLimit}
                step={step}
                onValueChange={(vals) => onChange([vals[0], vals[1]])}
            />
            <div className="flex justify-between text-[10px] text-gray-800">
                <span>{minLimit}</span>
                <span>{maxLimit}</span>
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
    );
};

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
    filters,
    setFilters,
    onReset,
}) => {
    const toggleFilter = <T extends string>(
        currentList: T[],
        item: T,
        key: keyof AdvancedFilterState,
    ) => {
        const newList = currentList.includes(item)
            ? currentList.filter((i) => i !== item)
            : [...currentList, item];
        setFilters((prev) => ({ ...prev, [key]: newList }));
    };

    return (
        <div className="w-full bg-white p-4 rounded-lg font-lato">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Fancy Colors */}
                <FilterSection title="Fancy Colors">
                    <div className="flex flex-wrap gap-1">
                        {FANCY_COLORS.map((color) => (
                            <ToggleButton
                                key={color}
                                label={color}
                                active={filters.fancyColors.includes(color)}
                                onClick={() =>
                                    toggleFilter(
                                        filters.fancyColors,
                                        color,
                                        "fancyColors",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Fancy Intensities */}
                <FilterSection title="Fancy Intensities">
                    <div className="flex flex-wrap gap-1">
                        {FANCY_INTENSITIES.map((intensity) => (
                            <ToggleButton
                                key={intensity}
                                label={intensity}
                                active={filters.fancyIntensities.includes(
                                    intensity,
                                )}
                                onClick={() =>
                                    toggleFilter(
                                        filters.fancyIntensities,
                                        intensity,
                                        "fancyIntensities",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Fancy Overtones */}
                <FilterSection title="Fancy Overtones">
                    <div className="flex flex-wrap gap-1">
                        {FANCY_OVERTONES.map((overtone) => (
                            <ToggleButton
                                key={overtone}
                                label={overtone}
                                active={filters.fancyOvertones.includes(
                                    overtone,
                                )}
                                onClick={() =>
                                    toggleFilter(
                                        filters.fancyOvertones,
                                        overtone,
                                        "fancyOvertones",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Fluorescence Colors */}
                <FilterSection title="Fluorescence Colors">
                    <div className="flex flex-wrap gap-1">
                        {FLUORESCENCE_COLORS.map((color) => (
                            <ToggleButton
                                key={color}
                                label={color}
                                active={filters.fluorescenceColors.includes(
                                    color,
                                )}
                                onClick={() =>
                                    toggleFilter(
                                        filters.fluorescenceColors,
                                        color,
                                        "fluorescenceColors",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Girdles */}
                <FilterSection title="Girdles">
                    <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                        {GIRDLES.map((girdle) => (
                            <ToggleButton
                                key={girdle}
                                label={girdle}
                                active={filters.girdles.includes(girdle)}
                                onClick={() =>
                                    toggleFilter(
                                        filters.girdles,
                                        girdle,
                                        "girdles",
                                    )
                                }
                                className="border border-primary-yellow-2 text-[10px]"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Girdle Conditions */}
                <FilterSection title="Girdle Conditions">
                    <div className="flex flex-wrap gap-1">
                        {GIRDLE_CONDITIONS.map((condition) => (
                            <ToggleButton
                                key={condition}
                                label={condition}
                                active={filters.girdleConditions.includes(
                                    condition,
                                )}
                                onClick={() =>
                                    toggleFilter(
                                        filters.girdleConditions,
                                        condition,
                                        "girdleConditions",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Culet Sizes */}
                <FilterSection title="Culet Sizes">
                    <div className="flex flex-wrap gap-1">
                        {CULET_SIZES.map((size) => (
                            <ToggleButton
                                key={size}
                                label={size}
                                active={filters.culetSizes.includes(size)}
                                onClick={() =>
                                    toggleFilter(
                                        filters.culetSizes,
                                        size,
                                        "culetSizes",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Culet Conditions */}
                <FilterSection title="Culet Conditions">
                    <div className="flex flex-wrap gap-1">
                        {CULET_CONDITIONS.map((condition) => (
                            <ToggleButton
                                key={condition}
                                label={condition}
                                active={filters.culetConditions.includes(
                                    condition,
                                )}
                                onClick={() =>
                                    toggleFilter(
                                        filters.culetConditions,
                                        condition,
                                        "culetConditions",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Laser Inscription */}
                <FilterSection title="Laser Inscription">
                    <div className="flex flex-wrap gap-1">
                        {LASER_INSCRIPTION.map((option) => (
                            <ToggleButton
                                key={option}
                                label={option === "Y" ? "Yes" : "No"}
                                active={filters.laserInscription.includes(
                                    option,
                                )}
                                onClick={() =>
                                    toggleFilter(
                                        filters.laserInscription,
                                        option,
                                        "laserInscription",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Countries */}
                <FilterSection title="Countries">
                    <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                        {COUNTRIES.map((country) => (
                            <ToggleButton
                                key={country}
                                label={country}
                                active={filters.countries.includes(country)}
                                onClick={() =>
                                    toggleFilter(
                                        filters.countries,
                                        country,
                                        "countries",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Treatments */}
                <FilterSection title="Treatments">
                    <div className="flex flex-wrap gap-1">
                        {TREATMENTS.map((treatment) => (
                            <ToggleButton
                                key={treatment}
                                label={treatment}
                                active={filters.treatments.includes(treatment)}
                                onClick={() =>
                                    toggleFilter(
                                        filters.treatments,
                                        treatment,
                                        "treatments",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Key To Symbols */}
                <FilterSection title="Key To Symbols">
                    <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                        {KEY_TO_SYMBOLS.map((symbol) => (
                            <ToggleButton
                                key={symbol}
                                label={symbol}
                                active={filters.keyToSymbols.includes(symbol)}
                                onClick={() =>
                                    toggleFilter(
                                        filters.keyToSymbols,
                                        symbol,
                                        "keyToSymbols",
                                    )
                                }
                                className="border border-primary-yellow-2 text-[10px]"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Availabilities */}
                <FilterSection title="Availabilities">
                    <div className="flex flex-wrap gap-1">
                        {AVAILABILITIES.map((avail) => (
                            <ToggleButton
                                key={avail}
                                label={avail}
                                active={filters.availabilities.includes(avail)}
                                onClick={() =>
                                    toggleFilter(
                                        filters.availabilities,
                                        avail,
                                        "availabilities",
                                    )
                                }
                                className="border border-primary-yellow-2"
                            />
                        ))}
                    </div>
                </FilterSection>

                {/* Range Sliders */}
                <FilterSection title="Crown Angle">
                    <RangeSliderWithInputs
                        label="Crown Angle"
                        value={filters.crownAngleRange}
                        onChange={(val) =>
                            setFilters((prev) => ({
                                ...prev,
                                crownAngleRange: val,
                            }))
                        }
                        minLimit={0}
                        maxLimit={56}
                    />
                </FilterSection>

                <FilterSection title="Crown Height">
                    <RangeSliderWithInputs
                        label="Crown Height"
                        value={filters.crownHeightRange}
                        onChange={(val) =>
                            setFilters((prev) => ({
                                ...prev,
                                crownHeightRange: val,
                            }))
                        }
                        minLimit={0}
                        maxLimit={55}
                    />
                </FilterSection>

                <FilterSection title="Pavilion Angle">
                    <RangeSliderWithInputs
                        label="Pavilion Angle"
                        value={filters.pavilionAngleRange}
                        onChange={(val) =>
                            setFilters((prev) => ({
                                ...prev,
                                pavilionAngleRange: val,
                            }))
                        }
                        minLimit={0}
                        maxLimit={80}
                    />
                </FilterSection>

                <FilterSection title="Pavilion Depth">
                    <RangeSliderWithInputs
                        label="Pavilion Depth"
                        value={filters.pavilionDepthRange}
                        onChange={(val) =>
                            setFilters((prev) => ({
                                ...prev,
                                pavilionDepthRange: val,
                            }))
                        }
                        minLimit={0}
                        maxLimit={73.5}
                    />
                </FilterSection>

                <FilterSection title="Girdle %">
                    <RangeSliderWithInputs
                        label="Girdle %"
                        value={filters.girdlePercRange}
                        onChange={(val) =>
                            setFilters((prev) => ({
                                ...prev,
                                girdlePercRange: val,
                            }))
                        }
                        minLimit={0}
                        maxLimit={10.5}
                    />
                </FilterSection>
            </div>
        </div>
    );
};
