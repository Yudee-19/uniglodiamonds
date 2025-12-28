import BannerSection from "@/components/shared/BannerSection";
import React from "react";
import BannerImage from "@/assets/fancy-colored-diamonds/banner.jpg";
import Image from "next/image";

// Replace with your actual image paths
import BlueDiamondChart from "@/assets/fancy-colored-diamonds/blue-diamonds.png";
import YellowDiamondChart from "@/assets/fancy-colored-diamonds/green-diamonds.png";
import GreenDiamondChart from "@/assets/fancy-colored-diamonds/green-diamond.png";
import ContactBannerImage from "@/assets/banner_2.jpg";
import SubFooter from "@/components/shared/SubFooter";
const coloredDiamonds = [
    {
        id: "blue",
        title: "Blue Diamonds",
        colorName: "Blue Diamonds",
        chartImage: BlueDiamondChart,
        chartTitle: "Color Chart For Blue Diamonds",
        description: [
            "They are also difficult to find, because they are available at a limited number of spots in the world. Many years ago, India was where plenty of these blue diamonds were found, but even now, they have become rarer or obtain in both Africa.",
            "The very fact that these blue diamonds are extremely rare, coupled with their soaring prices serves to increase their popularity. And this is especially true if you happen to be a diamond investor or even a collector. It lets you make the most of its ever-increasing value with time that you can then spin into a handsome profit. It is a rarer that you get physically witness and grasp.",
            "The colour of your blue (or any other) diamond is ultimately determined by qualified gemological institutes. The Gemological Institute of America's (GIA), of course, leads the charge. They conduct thorough tests by employing cutting-edge tools to study the colour of the diamond. When it comes to those blue diamonds, studies have proved that they are 'superb' diamonds, meaning that they become crystallized at much deeper levels than most of the other diamonds. Their boron content is also said to come from the deep, vast oceans. Interesting, right?",
            "Blue diamonds obtain their dazzling colour because of the presence of boron. The higher the boron content, the deeper the hue. They are actually completely made of carbon in a pure form and are highly durable. Such blue diamonds also have a subtle hints of grey in them, which in turn makes them very rare. The hope diamond is one of the most popular blue diamonds in pop culture.",
        ],
    },
    {
        id: "yellow",
        title: "Yellow Diamonds",
        colorName: "Yellow Diamonds",
        chartImage: YellowDiamondChart,
        chartTitle: "Color Chart For Yellow Diamonds",
        description: [
            "If you're considering investing in a yellow diamond, always think about the colour of the metal that is being used in the setting. You must never fail to consider the colour chart to the harmony of colours present, strive you view the diamond in the setting. The shade of the metal could truly contrast with the diamond, making it truly pop. Alternatively, the colours of the metal and the diamond could be in sync with each other.",
            "In terms of investing in these diamonds, you must know that fancy yellow coloured diamonds are relatively (as compared to other coloured diamonds) more affordable. This is also because they are relatively common. However, you should note that pricing or evaluating the price of such yellow diamonds is a detailed process.",
            "This is because the tiniest hints of boron can tinting down the value of a yellow diamond. But if there are green or orange tints present, the value immediately shoots up. So, you must always talk to experts before you go ahead and purchase such diamonds.",
            "Dazzling with promise, fancy coloured yellow diamonds often resemble shifting bits of flesh lasting sun. But sometimes, they reflect secondary shades like an orange or a reddish one. When these diamonds, yellow and red that deep, intense shade that you can have your heart to, they're called 'Canary Yellow Diamonds.' They are sometimes also called 'Canaries'. This name originated in the late 1800s when plenty of diamonds of the similar colouring were churned out from the South African mines. Cape Colony.",
            "Wondering here they get their dazzling hue? Well, this colour is actually the result of the presence of nitrogen at their time of composition. During this stage, any present nitrogen molecules take in blue light, turning the stone a shade of yellow. This yellow colour could also range from light to dark.",
        ],
    },
    {
        id: "green",
        title: "Green Diamonds",
        colorName: "Green Diamonds",
        chartImage: GreenDiamondChart,
        chartTitle: "Color Chart For Green Diamonds",
        description: [
            "Did you know that just a handful of these beautiful green coloured diamonds finally arrive in the market every year? That's what makes them so highly-sought-after all over the world over. Most of these beauties come from South America and Africa and are also pretty rare. They are actually formed at a depth of 150-200 kilometers below the earth, at a searing temperature. This is a process that takes millions of years to over slow.",
            "Natural green diamonds actually come in two types:",
            "1. Green Shade – These diamonds are green alright, but lighter in colour. The green hue appears only on the outer portion of the diamond.",
            "2. Green Body Colour – These diamonds are green through and through. The hue is absorbed throughout the stone and the colour is far more intense and darker.",
            "When it comes to investing, what you should know is that the price of green coloured diamonds has been on the rise in past few years. So, of course, investing in them is always a sound decision. Take the various Green coloured diamonds for instance – the most expensive diamonds at the market, you can get you large profits.",
            "Natural colour green diamonds are strikingly beautiful. They catch your eye and their physical characteristics sum up elegance in every way. How do they do it? Well, it's in their colouring. A colour circle is built by interaction between a subject and an object by perfection.",
        ],
    },
];

const page = () => {
    return (
        <div className="min-h-screen  mb-20">
            <BannerSection
                image={BannerImage}
                text="Fancy Colored Diamonds"
                textClassName="right-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />

            {/* Colored Diamonds Sections */}
            <div className="max-w-7xl mx-auto px-4">
                {coloredDiamonds.map((diamond, idx) => (
                    <section key={diamond.id} className={`py-20 `}>
                        <div className="max-w-7xl mx-auto px-4">
                            {/* Chart Section */}
                            <div className="mb-16">
                                {/* Chart Image */}
                                <div className="flex justify-center">
                                    <Image
                                        src={diamond.chartImage}
                                        alt={diamond.chartTitle}
                                        className="w-full max-w-7xl h-auto object-contain"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="mt-12">
                                <h3 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-black mb-6">
                                    {diamond.colorName}
                                </h3>

                                <div className="space-y-6">
                                    {diamond.description.map(
                                        (paragraph, pidx) => (
                                            <p
                                                key={pidx}
                                                className="text-slate-700 font-lora text-lg leading-relaxed text-justify"
                                            >
                                                {paragraph}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Contact CTA Banner */}
            <section className="w-full container mx-auto   relative py-16 px-4 mt-20 mb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={ContactBannerImage}
                        alt="Contact Banner Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10 flex items-center justify-center min-h-[150px]">
                    <div className="text-center">
                        <p className="text-white text-xl md:text-2xl font-lora leading-relaxed max-w-4xl">
                            Considering buying or selling fancy coloured
                            diamonds?{" "}
                            <a
                                href="#contact"
                                className="underline hover:text-[#bb923a] transition-colors font-semibold"
                            >
                                Contact us today!
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <SubFooter />
        </div>
    );
};

export default page;
