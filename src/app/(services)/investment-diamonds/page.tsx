import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/the-best-price-for-your-diamonds/banner1.png";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FedexImage from "@/assets/services/diamond-manufacturing/manufacturing1.png";
import LoupeImage from "@/assets/services/diamond-manufacturing/manufacturing2.png"; // Update path as needed
import SubFooter from "@/components/shared/SubFooter";

const articles = [
    {
        title: "Portfolio Building And Expert Advice",
        subtitle: "Welcome",
        paragraphs: [
            "Diamonds, as an investment are rapidly gaining popularity because it provides avid investors with a safe avenue. With the ability to appreciate better, it earns higher returns as compared to several other traditional forms of investments. You need to have it in your portfolio because it acts as a balanced and safe investment.",
            "So if you’ve decided to include it in your portfolio, but need Expert advice, get in touch. We can advise you on investment-grade diamonds, and make it convenient for you. Don’t hesitate to call upon our extensive experience for advice on investing in diamonds. Based on your investment goals, available funds, and risk-bearing ability, we will make the best recommendations for you.",
        ],
        image: {
            src: FedexImage.src,
            alt: "FedEx shipping diamond",
        },
        reverse: false,
        floatImages: true,
    },
    {
        title: "Increased Returns From Day One",
        subtitle: "Welcome",
        paragraphs: [
            "As Uniglo Diamonds does not use middlemen, we provide you with the best diamond for the price you pay. This price is devoid of any amounts charged for the recovery of additional costs paid to middlemen. Since you can buy our investment grade diamonds at a reasonable price, you begin to earn returns from day one.",
            "Furthermore, if you buy your investment grade diamonds through Uniglo Diamonds, we will repurchase them at a later date. Also, if required, we will arrange for a new buyer to repurchase them from you. That too, at the very best prices available, thus reducing your efforts, and making your diamond investment more liquid.",
            "Uniglo Diamonds can also assist you in the valuation of the diamonds that you may have inherited. As part of our overall diamond-as-an-investment advice, we make recommendations which increase the value of the gem. This can be by re-cutting stones, re-submitting for new certificates or even re-cutting old cuts into more modern ones.",
        ],
        image: {
            src: LoupeImage.src,
            alt: "Diamond inspection with loupe",
        },
        reverse: true,
        floatImages: false,
    },
];

const page = () => {
    return (
        <div className="min-h-screen mt-40">
            <BannerSection
                image={BannerImage}
                text="Investment Diamonds"
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            <section className="max-w-7xl mx-auto px-10 mt-20">
                {articles.map((article, idx) => (
                    <ArticleLayout key={idx} {...article} />
                ))}
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
