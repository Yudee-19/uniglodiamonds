import BannerSection from "@/components/shared/BannerSection";
import ArticleLayout from "@/components/shared/ArticleLayout";
import React from "react";
import BannerImage from "@/assets/old-diamonds/banner.jpg";
import Image from "next/image";

// Replace with your actual image paths
import SingleCutDiagram from "@/assets/old-diamonds/single-cut-diagram.png";
import SingleCutImage from "@/assets/old-diamonds/single-cut-diagram.png";
import RoseCutImage from "@/assets/old-diamonds/single-cut.png";
import OldMineCutImage from "@/assets/old-diamonds/old-mine-cut.png";
import OldEuropeanCutImage from "@/assets/old-diamonds/old-european-cut.png";
import ModernRoundBrilliantImage from "@/assets/old-diamonds/modern-round-brilliant.jpg";
import SubFooter from "@/components/shared/SubFooter";

const articles = [
    {
        title: "The Single Cut",
        subtitle: "Welcome",
        paragraphs: [
            "The history of single cut diamonds can be traced back to the 1300s. Diamonds that are cut using this method tend to have large tables and octagonal girdles and generally have 18 facets. The bottom edge of the diamond, which is known as the culet, can either be pointed or even flat.",
        ],
        image: {
            src: SingleCutImage.src,
            alt: "Single Cut Diamond",
        },
        reverse: true,
        floatImages: true,
    },
    {
        title: "The Rose Cut",
        subtitle: "Welcome",
        paragraphs: [
            "As its name suggests, rose cut diamonds resemble the shape of a rose bud. They can look anything from three to 24 facets and are diamonds that are enjoying some space in the spotlight again, especially when it comes to bridal jewels.",
            "Such diamonds have a dome-shaped top, while the bottom is flat. Interestingly enough, this diamond cut can be traced back to the Victorian and Georgian eras.",
        ],
        image: {
            src: RoseCutImage.src,
            alt: "Rose Cut Diamond",
        },
        reverse: true,
        floatImages: true,
    },
];

const oldCutTypes = [
    {
        title: "The Old Mine Cut",
        description:
            "Often, these cuts are said to be similar to today's cushion cuts. Think gently rounded corners and a nearly square-shaped girdle. They feature a high crown, a small table and a culet that is flat but large. This cut too, can be traced back to the Georgian and Victoria age, going as far back as the 1700s.",
        image: OldMineCutImage,
        reverse: false,
    },
    {
        title: "The Old European Cut",
        description:
            "From the 1800s to the 1930s, these cuts were handcrafted with precision. Those that were cut before the 1880s were termed the 'old mine cuts', while those created after 1935 were called 'modern round brilliant diamonds'.",
        additionalText:
            "These diamonds feature as many as 58 facets. They also have a high crown, small table and a large but flat culet.",
        image: OldEuropeanCutImage,
        reverse: true,
    },
];

const page = () => {
    return (
        <div className="min-h-screen  mb-20">
            <BannerSection
                image={BannerImage}
                text="The Inescapable Charm of Antique Cut Diamonds"
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />

            {/* Introduction Section */}
            <section className="max-w-7xl mx-auto px-10 mt-20 mb-16">
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                    <p>
                        Today, when it comes to diamonds, everyone knows all
                        about its many different shapes and sizes. From marquise
                        cut diamonds to heart cut ones, there's enough and more
                        for you to choose from. But apart from the more
                        contemporary forms, there also exist a variety of cuts
                        that can only be classified as "vintage" or "antique"
                        cuts. In today's world, these kinds of diamonds are
                        becoming increasingly popular, too!
                    </p>
                    <p>
                        Years and years ago, diamond cutters employed methods
                        that are far more different from the ones used today, to
                        give diamonds their shape. The use of these age-old
                        cutting meant that these stones could more fire and
                        have. It was this magnificent glow that people grew to
                        love. Such antique cut diamonds gave off an air of
                        romance and seemed to be steeped in an old-world charm.
                        With time, diamond cutters have begun to go back to
                        these ancient techniques. In today's times, these
                        antique cuts are highly in vogue, coveted by people the
                        world over. They can be summed up as symbols of luxury
                        and what's better, they even have good returns.
                    </p>
                    <p>
                        There are five different cuts that you will find today.
                        They are:
                    </p>
                </div>
            </section>

            {/* Antique Cuts Diagram Section */}
            <section className="max-w-7xl mx-auto px-10 mb-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Left: Diagrams */}
                    <div className="flex-1">
                        <Image
                            src={SingleCutDiagram}
                            alt="Antique Diamond Cuts Diagram"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    {/* Right: Single Cut Article */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-[#bb923a] font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                Welcome
                            </h4>
                            <span className="w-12 h-px bg-[#bb923a]"></span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            The Single Cut
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed font-lora text-justify">
                            The history of single cut diamonds can be traced
                            back to the 1300s. Diamonds that are cut using this
                            method tend to have large tables and octagonal
                            girdles and generally have 18 facets. The bottom
                            edge of the diamond, which is known as the culet,
                            can either be pointed or even flat.
                        </p>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-10 mb-20">
                {articles.slice(1, 2).map((article, idx) => (
                    <ArticleLayout key={idx} {...article} />
                ))}
            </section>

            {/* Old Mine Cut & Old European Cut Sections */}
            <section className="w-full bg-primary-purple-dark  flex flex-col md:flex-row items-center justify-between my-16">
                <div className="md:w-1/2 w-full h-full flex flex-col justify-center z-10 px-8 py-10 md:py-0 md:pl-20 max-w-7xl mx-auto">
                    <h2 className="text-white text-3xl md:text-6xl font-cormorantGaramond font-semibold mb-6">
                        The old Mine Cut
                    </h2>

                    <p className="text-white/90 font-lora text-lg max-w-2xl">
                        Often, these cuts are said to be similar to today’s
                        cushion cuts. Think gently rounded corners and a nearly
                        square-shaped girdle. They feature a high crown, a small
                        table and a culet that is flat but large. This cut too,
                        can be traced back to the Georgian and Victoria age,
                        going as far back as the 1700s.
                    </p>
                </div>
                <div className="hidden md:w-1/2 w-full h-full md:flex justify-end relative mt-10 md:mt-0">
                    <Image
                        src={OldMineCutImage}
                        alt="No-interest Diamond Financing"
                        className="w-full  h-full object-cover "
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-primary-purple-dark via-primary-purple-dark/80 to-transparent pointer-events-none" />
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-10 mb-20">
                {oldCutTypes.slice(1, 2).map((article, idx) => (
                    <ArticleLayout
                        key={idx}
                        title={article.title}
                        subtitle={"welcome"} // Map description → subtitle
                        paragraphs={
                            article.additionalText
                                ? [article.description, article.additionalText]
                                : []
                        } // Wrap in array
                        image={article.image}
                        reverse={article.reverse}
                    />
                ))}
            </section>

            {/* Modern Round Brilliant Cut Banner Section */}
            <section className="w-full relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={ModernRoundBrilliantImage}
                        alt="Modern Round Brilliant Cut"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h4 className="text-[#bb923a] font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                    Welcome
                                </h4>
                                <span className="w-12 h-px bg-[#bb923a]"></span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-white mb-8 leading-[1.1]">
                                The Modern Round Brilliant Cut
                            </h2>
                            <div className="space-y-6 text-white/90 font-lora text-lg leading-relaxed">
                                <p>
                                    Think of this method as the most popular one
                                    when it comes to cutting diamonds. Why?
                                    Because these cuts have an innate ability to
                                    maximize fire and brilliance! During the
                                    beginnings of the 19th century, techniques
                                    to open to the idea of trying out new
                                    techniques. As a result of their efforts, in
                                    1919, the round brilliant 'was born. It
                                    actually rose up in popularity during the
                                    liberty and the art deco eras. When it comes
                                    to other shapes and their composition, round
                                    brilliant cuts are similar to the old
                                    European cut. In that they also have a
                                    circular girdle and 58 facets. But, these
                                    diamonds cuts come without cutlets.
                                </p>
                                <p>
                                    With the passage of time, antique cut
                                    diamonds have become the go-to choice for
                                    even the most discerning buyers and
                                    jewelers. Their larger faceting and
                                    beautiful glow are what make them truly
                                    timeless. Better still, antique or vintage
                                    cuts are warmer in colour and
                                    environmentally conscious, making them a
                                    preferred choice for the eco-friendly buyer.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SubFooter />
        </div>
    );
};

export default page;
