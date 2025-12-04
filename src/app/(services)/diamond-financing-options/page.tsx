import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/the-best-price-for-your-diamonds/banner1.png";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FinancingImg from "@/assets/home/diamonds_guide.jpg"; // Update path as needed
import Image from "next/image";
import SubFooter from "@/components/shared/SubFooter";

const page = () => {
    return (
        <div className="min-h-screen mt-40">
            <BannerSection
                image={BannerImage}
                text="Diamond Financing Options"
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            {/* Article Section */}
            <section className="max-w-7xl mx-auto px-10 mt-20">
                <ArticleLayout
                    title="A Stress-Free Shopping Experience"
                    subtitle="Financing"
                    paragraphs={[
                        "We aim at maximising your purchasing power and providing you with a hassle-free shopping experience. At Uniglo, we offer flexible financing, with a buy now and pay later scheme. We offer you payment schemes, through which you can pay for your purchase, over a period of time. If none of our existing diamond financing options meet your specific requirements, then we’d be glad to customize one for you. This lets you pay in several budget-friendly instalments, ridding you of the burden of paying in a lump sum. Also, under certain diamond jewellery online schemes, we offer no-interest payback options.",
                    ]}
                    image={{
                        src: FinancingImg.src,
                        alt: "Diamond financing consultation",
                    }}
                    reverse={false}
                    floatImages={true}
                />
            </section>
            {/*  */}
            <section className="w-full bg-primary-purple-dark md:min-h-120 flex flex-col md:flex-row items-center justify-between my-16">
                <div className="md:w-1/2 w-full h-full flex flex-col justify-center z-10 px-8 py-10 md:py-0 md:pl-20 max-w-7xl mx-auto">
                    <h2 className="text-white text-3xl md:text-4xl font-cormorantGaramond font-semibold mb-6">
                        No-interest Diamond Financing
                    </h2>
                    <ul className="list-disc pl-5 text-white/90 font-lora text-lg mb-4 space-y-2">
                        <li>
                            For certified goods, you can pay 60 days after
                            purchase date, under an interest-free financing
                            scheme.
                        </li>
                        <li>
                            If you are purchasing polished diamonds from Uniglo,
                            you can pay 120 days after purchase date, under an
                            interest-free diamond financing scheme.
                        </li>
                    </ul>
                    <p className="text-white/90 font-lora text-lg max-w-2xl">
                        To know more, contact one of our customer care
                        representatives, or fill out the contact form, and
                        enable us to get in touch with you.
                    </p>
                </div>
                <div className="hidden md:w-1/2 w-full h-full md:flex justify-end relative mt-10 md:mt-0">
                    <Image
                        src={require("@/assets/services/diamond-financing-options/banner3.png")}
                        alt="No-interest Diamond Financing"
                        className="w-full md:h-120 h-full object-cover "
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-primary-purple-dark via-primary-purple-dark/80 to-transparent pointer-events-none" />
                </div>
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
