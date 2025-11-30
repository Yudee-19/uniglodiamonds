import BannerSection from "@/components/shared/BannerSection";
import React from "react";
import bannerImage from "@/assets/banner_2.jpg";

const page = () => {
    return (
        <div className="min-h-screen mt-30">
            <BannerSection image={bannerImage} text="Sell Your Diamonds" />
        </div>
    );
};

export default page;
