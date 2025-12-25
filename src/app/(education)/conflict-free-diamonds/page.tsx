import BannerSection from "@/components/shared/BannerSection";
import ArticleLayout from "@/components/shared/ArticleLayout";
import React from "react";
import BannerImage from "@/assets/diamond-shape/banner.png";
import Image from "next/image";

// Replace with your actual image paths
import ConflictFreeDiamondsImg from "@/assets/services/diamond-manufacturing/manufacturing1.png";
import WhatAreConflictDiamondsImg from "@/assets/services/diamond-manufacturing/why-choose.png";
import HistoryBannerImg from "@/assets/services/diamond-financing-options/banner3.png";
import KimberleyProcessImg from "@/assets/sell-your-diamonds/reson.jpg";
import SubFooter from "@/components/shared/SubFooter";

const articles = [
    {
        title: "Conflict-free diamonds",
        subtitle: "Welcome",
        paragraphs: [
            "In 2002, the UN and its members, along with certain non-governmental organizations adopted a framework called 'The Kimberley Process'. This framework ensures that every diamond traded conforms to its guidelines. It confirms that the mining and shipping of every diamond took place in a humane, environmentally conscious, conflict-free and legitimate manner. Today, over 99 percent of the diamonds traded worldwide, are conflict-free. At Uniglo, we always source conflict-free diamonds. Therefore, we can provide you with the Kimberley Process certificate, for every diamond you purchase.",
            "At Uniglo, we make it a point to procure only conflict-free diamonds. Therefore, every diamond we sell is accompanied by a Kimberley Process certificate. This is far more important than the 4 Cs, in fact, it is the first 'C' that a seller must adhere to.",
        ],
        image: {
            src: ConflictFreeDiamondsImg.src,
            alt: "Conflict-free diamonds",
        },
        reverse: false,
        floatImages: true,
    },
    {
        title: "What Are Conflict Diamonds?",
        subtitle: "Welcome",
        paragraphs: [
            "Diamonds that don't adhere to 'The Kimberley Process' are called Conflict Diamonds. These include diamonds that are either mined inhumanely or are sold to fund criminal activities.",
            "Another name for conflict diamonds is 'blood diamond'. These diamonds mostly come from rogue operators, operating in African countries. However, since criminal operators are part of a worldwide supply chain, they can be found anywhere. Hence, 'The Kimberley Process' discourages its sale and restricts its circulation.",
            "By purchasing blood diamonds, you would, in turn, be fueling criminal activity in the world. On the other hand, Conflict-free diamonds are mined and sold ethically. Hence, these aren't associated with any labor abuse or crime.",
        ],
        image: {
            src: WhatAreConflictDiamondsImg.src,
            alt: "What are conflict diamonds",
        },
        reverse: true,
        floatImages: true,
    },
];

const page = () => {
    return (
        <div className="min-h-screen  mb-20">
            <BannerSection
                image={BannerImage}
                text="Conflict-free Diamonds"
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />

            {/* Articles Section */}
            <section className="max-w-7xl mx-auto px-10 mt-20 mb-20">
                {articles.map((article, idx) => (
                    <ArticleLayout key={idx} {...article} />
                ))}
            </section>

            {/* Conflict-Free Diamonds And Its History Banner Section */}
            <section className="w-full relative py-24 px-4 mb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={HistoryBannerImg}
                        alt="History Banner Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h3 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-white mb-8">
                                Conflict-Free Diamonds And Its History
                            </h3>
                            <div className="space-y-6 text-white/90 font-lora text-lg leading-relaxed">
                                <p>
                                    Blood diamonds came under the scanner during
                                    the 1900s, during the Sierra Leone civil
                                    war. However, they have been around for
                                    centuries.
                                </p>
                                <p>
                                    For years, certain rebel groups financed
                                    crime by smuggling and selling diamonds.
                                    However, it came to light with the Sierra
                                    Leone civil war. It was only after over
                                    25,000 deaths and 2 million people being
                                    displaced. This along with the Angola war,
                                    also financed by blood diamonds, called for
                                    a framework. One that diminished the
                                    atrocities linked to diamonds and that is
                                    when the Kimberley Process came to life.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Understanding The Kimberley Process Section */}
            <section className="max-w-7xl mx-auto px-10 mb-20">
                <ArticleLayout
                    title="Understanding The Kimberley Process"
                    subtitle="Welcome"
                    paragraphs={[
                        "Over 80 countries adhere to the Kimberley Process, a framework that helps improve the working conditions for miners and stalls outlaw forces. These countries have pledged to trade diamonds only with countries who subject themselves to this Framework.",
                        "In 2000, a larger part of the diamond industry partnered with the UN to create the Kimberley Process Certification. This framework requires the country to closely monitor and officially audit diamonds. The process begins with the mining and concludes with the sale of the diamond.",
                        "Only member countries that adhere to the Kimberley Process, can import and export rough diamonds. However, the shipment must accompany a Kimberley Process Certificate. This certificate should arrive in a sealed and tamper-free container. Else, it is refrained from entering or leaving the Member country.",
                        "During the Sierra Leone civil war, conflict diamonds accounted for about 4 percent of the total diamond production. Today, this number has drastically reduced to less than 1 percent. While choosing the right cut, color, carat, and clarity, it is also important that your diamond is conflict-free.",
                    ]}
                    image={{
                        src: KimberleyProcessImg.src,
                        alt: "Kimberley Process Diamond",
                    }}
                    reverse={true}
                    floatImages={true}
                />
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
