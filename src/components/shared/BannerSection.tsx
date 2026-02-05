import Image from "next/image";
import React from "react";
import bannerImage from "@/assets/banner_2.jpg";
import { cn } from "@/lib/utils";

interface BannerSectionProps {
    image?: any;
    text: string;
    textClassName?: string;
    imageClassName?: string;
}

const BannerSection: React.FC<BannerSectionProps> = ({
    image,
    text,
    textClassName,
    imageClassName,
}) => (
    <section>
        <div className="relative max-h-[500px] overflow-hidden">
            <Image
                src={image || bannerImage}
                alt="Banner"
                width={1200}
                height={100}
                className={cn("w-full h-", imageClassName)}
            />
            <h1
                className={cn(
                    "absolute top-2/3 right-20 uppercase transform -translate-y-3/4 text-white text-5xl font-bold font-cormorantGaramond",
                    textClassName,
                )}
            >
                {text}
            </h1>
        </div>
    </section>
);

export default BannerSection;
