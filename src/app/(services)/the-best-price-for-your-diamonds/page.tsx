"use client";

import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/the-best-price-for-your-diamonds/bannerNew.jpeg";
import React from "react";
import ArticleLayout from "@/components/shared/ArticleLayout";
import DiamondsBanner from "@/assets/services/the-best-price-for-your-diamonds/banner2.png";
import FedexImage from "@/assets/services/the-best-price-for-your-diamonds/fedex.jpg";
import SubFooter from "@/components/shared/SubFooter";
import SellDiamondForm from "@/components/shared/SellDiamondForm";

const page = () => {
    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text="The best price for your diamond"
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-120 object-cover"
            />
            {/* Article Section */}
            <section className=" max-w-7xl mx-auto px-10 mt-20">
                <ArticleLayout
                    title="Free Diamond Valuation and FedEx Shipping"
                    subtitle="Welcome"
                    paragraphs={[
                        "Uniglo Diamonds' provides you with a step by step shipping process, which is secure and safe. We understand what it takes to securely transport diamonds, and therefore take the necessary measures. All our transactions are fully insured by Malca-Amit.",
                    ]}
                    bulletPoints={[
                        "Begin by filling out the form.",
                        "Once you do that, we give you a free estimation for your diamond(s) and arrange a free pickup from your desired location.",
                        "After having received your diamonds, we will examine them to determine a more accurate and final buying offer.",
                        "If you accept it, we will transfer the amount into your bank account, else we return your diamonds. You need not worry about the return shipping either, because we bear the expense for that also.",
                    ]}
                    image={{
                        src: FedexImage.src,
                        alt: "FedEx shipping diamond",
                    }}
                    reverse={false}
                    floatImages={true}
                />
                <div className="mt-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                    At Uniglo Diamonds, you can stay rest assured of receiving
                    the best value for your diamonds thanks to our experience of
                    over ten years in valuing and buying diamonds. We have
                    gained the expertise and knowledge needed to offer you the
                    highest prices for your diamonds. You can book an
                    appointment, free of change and without obligation, and
                    benefit from our trustworthy experts on your every
                    transaction.
                </div>
            </section>
            {/* Banner Section */}
            <section className="mt-16 max-w-7xl mx-auto px-4">
                <div className="relative w-full h-56 md:h-64">
                    <img
                        src={DiamondsBanner.src}
                        alt="Diamonds banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xl md:text-2xl font-lora text-center px-4 drop-shadow-lg">
                            To proceed with a free FedEx pick up and a free
                            appraisal, fill in our FedEx pick up request form.
                            Upon receiving it, we will respond with a
                            confirmation, along with further instructions.
                        </span>
                    </div>
                </div>
            </section>
            {/* Pickup Form */}
            <SellDiamondForm />
            <SubFooter />
        </div>
    );
};

export default page;
