"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
        )}
        {...props}
    >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#67516B]">
            <SliderPrimitive.Range className="absolute h-full bg-[#D1B06B]" />
        </SliderPrimitive.Track>
        {/* Try to render as many thumbs as there are values, default to 1 if not specified but usually handled by Radix */}
        {(props.value || props.defaultValue || [0]).map((_, i) => (
            <SliderPrimitive.Thumb
                key={i}
                className="block h-4 w-4 rounded-full border-4 bg-[#D1B06B] border-primary-purple-dark ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            />
        ))}
    </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
