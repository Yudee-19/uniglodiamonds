import BannerSection from "@/components/shared/BannerSection";
import ArticleLayout from "@/components/shared/ArticleLayout";
import React from "react";
import BannerImage from "@/assets/ethical-diamonds/bannerNewEthical.jpeg";
import Image from "next/image";

// Replace with your actual image paths
import ConflictFreeDiamondsImg from "@/assets/ethical-diamonds/image1.jpeg";
import TrustBannerBg from "@/assets/services/diamond-financing-options/banner3.png";
import SubFooter from "@/components/shared/SubFooter";

const article = {
    title: "Conflict-free diamonds",
    subtitle: "Welcome",
    paragraphs: [
        "We respect and adhere to all the requirements of the Kimberley Process and World Diamond Council, in order to bring you diamonds you can trust. Therefore, you can be sure that although we provide you with high-grade diamonds at competitive prices, these are legitimate. While we operate in a decades in this business, we are well aware of which areas to avoid. As a matter of fact, Uniglo Diamonds also complies with other regulations, Foraneous Proceeds and anti-money laundering legislation set forth by the various nations.",
        "Also, we ensure that the same goes for all our partners and suppliers. We carefully screen them and comprehend their internal procedures. This confirms that the diamonds are ethically sourced. Also, we verify their financial integrity and market reputation. As a rule, we only include the most reliable ones in our business network. So with Uniglo Diamonds, you can be sure that you are cascading responsibility on able shoulders.",
    ],
    image: {
        src: ConflictFreeDiamondsImg.src,
        alt: "Conflict-free diamonds",
    },
    reverse: false,
    floatImages: true,
};

const commitments = [
    {
        title: "Conduct the Business Ethically and Responsibly",
    },
    {
        title: "Adhere to AMI & CFT Regulations",
    },
    {
        title: "Comply with KP and World Diamond Council System of Warranties",
    },
    {
        title: "No support to Child Labour / Forced Labour",
    },
    {
        title: "Provide equal opportunity for growth to all employees",
    },
    {
        title: "Provide a clean, safe and healthy work place",
    },
    {
        title: "Control use of Hazardous substances",
    },
    {
        title: "No Bribery & Facilitation Payments to gain any unfair business advantage",
    },
    {
        title: "Prevent use of Conflict Minerals",
    },
    {
        title: "Conduct Supply Chain due diligence as per OECD Guidelines",
    },
    {
        title: "No Discrimination amongst Employees",
    },
    {
        title: "Uphold Fundamental Human Rights and the Rights of Employees",
    },
    {
        title: "Reduce Environmental Impact of Operations",
    },
    {
        title: "Comply with all Applicable Statutory & Regulatory requirements",
    },
];

const page = () => {
    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text="Ethical Diamonds"
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />

            {/* Article Section */}
            <section className="max-w-7xl mx-auto px-10 mt-20 mb-16">
                <ArticleLayout {...article} />
                <p className="mt-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                    Natural diamonds are the finest symbols of pure love and
                    integrity, especially when underterred by blemishes and
                    inclusions. After meticulous inspection and several tests to
                    analyze the 4 Cs, we bring you the best conflict-free
                    diamonds. We also ensure that the diamonds are mined and
                    sourced in an ethical manner. So you can be sure that we
                    procure them from conflict-free zones. Therefore, every
                    diamond we sell comes with a Kimberley Process certificate.
                </p>
            </section>

            {/* We've Earned Trust Banner Section */}
            <section className="w-full max-w-7xl mx-auto relative py-20 px-10 mb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={TrustBannerBg}
                        alt="Trust Banner Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-white mb-8">
                        We've Earned Trust
                    </h2>
                    <div className="space-y-6 text-white/90 font-lora text-lg leading-relaxed">
                        <p>
                            We take every measure to bring you diamonds that we
                            would buy ourselves. Uniglo's trusted, we don't
                            present to you. After serving countless elite
                            customers, our representatives thoroughly understand
                            the need to cater to custom orders.
                        </p>
                        <p>
                            So, if you are looking for a variegate guest of the
                            rare diamonds, we would be glad to source them for
                            you. Our elite team of specialists is enroled to
                            serve you. For more information, you can contact one
                            of our representatives at Uniglo Diamonds.
                        </p>
                    </div>
                </div>
            </section>

            {/* Ethical Business Policy Section */}
            <section className="w-full bg-brand-gradient py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-white mb-2">
                            Ethical Business Policy -{" "}
                            <span className="text-white/70">
                                Ensuring a seamless and Memorable experience
                            </span>
                        </h2>
                        <h3 className="text-4xl font-cormorantGaramond font-semibold text-white mt-6">
                            Commitments
                        </h3>
                    </div>

                    {/* Commitments Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {commitments.map((commitment, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 text-white/90"
                            >
                                <span className="text-[#bb923a] text-2xl mt-1 shrink-0">
                                    ✓
                                </span>
                                <p className="font-lora text-lg leading-relaxed">
                                    {commitment.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
