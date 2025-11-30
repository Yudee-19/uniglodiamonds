import Image from "next/image";
import React from "react";
import bannerImage from "@/assets/banner_2.jpg";

interface BannerSectionProps {
    image?: any;
    text: string;
}

const BannerSection: React.FC<BannerSectionProps> = ({ image, text }) => (
    <section>
        <div className="relative">
            <Image
                src={image || bannerImage}
                alt="Banner"
                width={1200}
                height={100}
                className="w-full"
            />
            <h1 className="absolute top-2/3 right-20 uppercase transform -translate-y-3/4 text-white text-5xl font-bold font-cormorantGaramond">
                {text}
            </h1>
        </div>
    </section>
);

export default BannerSection;
