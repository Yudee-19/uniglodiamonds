import React from "react";
// Assuming your Button component is located here, adjust path if needed
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ArticleLayoutProps {
    title: string;
    subtitle: string;
    paragraphs: string[];
    bulletPoints?: string[];
    image: {
        src: string;
        alt?: string; // Optional, can fallback to title
    };
    reverse?: boolean; // If true, image floats right (or sits on right in flex)
    buttonText?: string;
    onButtonClick?: () => void; // Optional handler for the button
    /* --- NEW PROP --- */
    floatImages?: boolean; // Default: true. If false, uses Flexbox split layout.
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({
    title,
    subtitle,
    paragraphs,
    bulletPoints,
    image,
    reverse = false,
    buttonText,
    onButtonClick,
    floatImages = true, // Default to your original float behavior
}) => {
    return (
        <div
            className={`mb-20 last:mb-0 group ${
                floatImages
                    ? "block after:clear-both after:block" // Float Container Styles
                    : `flex flex-col gap-10 md:items-center ${
                          reverse ? "md:flex-row-reverse" : "md:flex-row"
                      }` // Flex Container Styles
            }`}
        >
            {/* 1. IMAGE SECTION */}
            <div
                className={`relative h-auto ${
                    floatImages
                        ? `w-full md:w-[45%] mb-8 md:mb-4 ${
                              reverse
                                  ? "md:float-right md:ml-12"
                                  : "md:float-left md:mr-12"
                          }`
                        : "w-full md:w-1/2" // Flex width
                }`}
            >
                <Image
                    src={image.src}
                    alt={image.alt || title}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover shadow-sm transition-transform duration-700 group-hover:scale-[1.02]"
                />
            </div>

            {/* 2. TEXT CONTENT */}
            <div
                className={`text-content ${
                    floatImages ? "" : "w-full md:w-1/2" // In flex mode, take up remaining half
                }`}
            >
                {/* Subtitle with separator line */}
                <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                        {subtitle}
                    </h4>
                    <span className="w-12 h-px bg-primary"></span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                    {title}
                </h2>

                {/* Paragraphs */}
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                    {paragraphs.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>

                {/* Bullet Points */}
                {bulletPoints && bulletPoints.length > 0 && (
                    <ul className="mt-6 space-y-3 font-lora text-lg text-slate-600">
                        {bulletPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-3">
                                {/* Custom Gold Square Marker */}
                                <span className="mt-2.5 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Optional Button */}
                {buttonText && (
                    <div className="mt-8">
                        <Button
                            onClick={onButtonClick}
                            className="px-8 py-6 purple-reveal-btn uppercase text-xs tracking-widest rounded-none"
                        >
                            <span>{buttonText}</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticleLayout;
