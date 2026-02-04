import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/partner/bannerPartners.jpeg";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FedexImage from "@/assets/services/partner/image1.jpg";
import SubFooter from "@/components/shared/SubFooter";

const article = {
    title: "Uniglo is looking for partners",
    subtitle: "Welcome",
    paragraphs: [
        "Uniglo Diamonds is interested in hearing from qualified companies able to partner with us to further develop sales and purchases of diamonds internationally, on a mutually beneficial basis. The primary objective is to help us meet the demand of our ever-increasing worldwide customer base.We have already developed very successful relationships with several partners across the globe, including India, China and Hong Kong.As a partner of Uniglo Diamonds, you can count on having a genuine competitive edge in this billion dollar industry.So contact us, today, if you think you have what it takes to partner with Uniglo Diamonds, and let us grow together",
    ],
    image: {
        src: FedexImage.src,
        alt: "FedEx shipping diamond",
    },
    reverse: false,
    floatImages: true,
};

const page = () => {
    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text="Partners"
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            <section className="max-w-7xl mx-auto px-10 mt-20">
                <ArticleLayout {...article} />
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
