import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/the-best-price-for-your-diamonds/banner1.png";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FedexImage from "@/assets/home/blog_3.jpg";
import SubFooter from "@/components/shared/SubFooter";

const article = {
    title: "Tamper-Proof Sealing",
    subtitle: "Welcome",
    paragraphs: [
        "Upon request, your diamond is sealed in a secure and tamper-proof container. A summary of the IGI Diamond Report is enclosed within the seal, and is visible from the back of the seal. Once opened, the Seal will show a chemically generated pattern, evidencing that the seal has been broken.",
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
                text="Security Seals"
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            <section className="max-w-7xl mx-auto px-10 mt-20">
                <ArticleLayout {...article} />
                <div className="mt-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                    Sealing guarantees that a given grading report and the
                    corresponding diamond belong together, and it keeps the
                    diamond safe from oil and dirt.
                </div>
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
