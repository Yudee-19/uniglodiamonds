import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import ArticleLayout from "@/components/shared/ArticleLayout";
import Image from "next/image";
import BannerImage from "@/assets/diamond-shape/banner.png";

// Replace with your actual image paths
import DiamondShapesGrid from "@/assets/diamond-shape/diamond-shape.png";
import DiamondCutVsShapeImage from "@/assets/diamond-shape/diamond-cut.png";
import FinancingBannerImage from "@/assets/diamond-shape/bottom-banner.jpg";

// Diamond shape images - Replace with your actual paths
import RoundDiamonds from "@/assets/shapes/round.png";
import PrincessDiamonds from "@/assets/shapes/princess.png";
import CushionDiamonds from "@/assets/shapes/cushion.png";
import EmeraldDiamonds from "@/assets/shapes/emerald.png";
import OvalDiamonds from "@/assets/shapes/oval.png";
import RadiantDiamonds from "@/assets/shapes/radiant.png";
import AssherDiamonds from "@/assets/shapes/asscher.png";
import MarquiseDiamonds from "@/assets/shapes/marquise.png";
import HeartDiamonds from "@/assets/shapes/heart.png";
import PearDiamonds from "@/assets/shapes/pear.png";
import DiamondBannerBg from "@/assets/diamond-shape/bottom-banner.jpg";
import SubFooter from "@/components/shared/SubFooter";
const diamondShapes = [
    {
        name: "Round Diamonds",
        image: RoundDiamonds,
        description:
            "The round brilliant cut diamond is the most popular diamond shape. It is timeless, classic and can be applied to many versatile albeit diamond rings, and therefore has the flexibility to facilitate many tastes and style preferences.",
        readMore: "#",
    },
    {
        name: "Princess Diamonds",
        image: PrincessDiamonds,
        description:
            "After the round brilliant cut diamond, princess cut diamonds are the most popular fancy diamond shape. And similar to round cut diamonds, princess cut diamond are also a good choice for their versatility.",
        readMore: "#",
    },
    {
        name: "Cushion Diamonds",
        image: CushionDiamonds,
        description:
            "The cushion cut combines the charm of a square cut diamond, but with soft, rounded corners, resembling a pillow. Cushion cut diamonds are a popular choice for their adaptability to any kind of diamond setting.",
        readMore: "#",
    },
    {
        name: "Emerald Diamonds",
        image: EmeraldDiamonds,
        description:
            "Emerald cut diamonds feature a rectangular shape with truncated corners, and a broad flat plane that resembles stair steps if seen from a top angle. It is a shallow-square-long crown and this heightens the clarity of the stone more than any other cut.",
        readMore: "#",
    },
    {
        name: "Oval Diamonds",
        image: OvalDiamonds,
        description:
            "The oval cut lies somewhere between the round brilliant cut, showcasing a similar fire, and the pear shape. Oval cut diamonds have an elongated shape that creates the illusion of them being larger than they usually are.",
        readMore: "#",
    },
    {
        name: "Radiant Diamonds",
        image: RadiantDiamonds,
        description:
            "The radiant shape is a unique shape because it combines the silhouette of an emerald cut diamond with the sparkle and fire of a round brilliant cut diamond as well as the depth and brilliance of an emerald and princess cut.",
        readMore: "#",
    },
    {
        name: "Asscher Diamonds",
        image: AssherDiamonds,
        description:
            "The asscher cut features a prismatic brilliance and square shape with cut corners. This diamond shape appears sleeker and showcases a more subdued sparkle than the star-like designed facets that you will see in round brilliant or princess cuts.",
        readMore: "#",
    },
    {
        name: "Marquise Diamonds",
        image: MarquiseDiamonds,
        description:
            "The marquise brilliant shape looks like the hull of a small boat, featuring pointed ends with a curved middle. It has an eye-catching appearance and features a larger surface area than any other diamond shape. It can therefore, be an upright diamond, maximize carat weight and appear larger than other stones of the same size.",
        readMore: "#",
    },
    {
        name: "Heart Diamonds",
        image: HeartDiamonds,
        description:
            "The heart shape, one of the most romantic of all shapes, is an unmistakable symbol of true love. It is one of the rarest of all diamond shapes. Comprising of two symmetrical halves, they offer a bold and shimmering appearance.",
        readMore: "#",
    },
    {
        name: "Pear Diamonds",
        image: PearDiamonds,
        description:
            "The pear shape is a hybrid diamond shape because it combines the silhouette of an emerald cut diamond with the sparkle and fire of a round brilliant cut diamond as well as the depth and brilliance of an emerald and princess cut.",
        readMore: "#",
    },
];

const articles = [
    {
        title: "Selecting The Perfect Diamond Shape",
        subtitle: "Welcome",
        paragraphs: [
            "An important attribute of a diamond, the shape, which refers to the diamond's physical form, is usually the first aspect a couple or individual considers when selecting a diamond for their engagement ring or wedding band. It could be dependent on personal taste, for an occasion like your wedding, engagement or an anniversary gift, or what is trending in the world of diamonds. It could also be related to quality and value.",
            "All diamond shapes are unique to each other, with distinct characteristics which determine the quality for each shape. Each shape highlights the 4Cs of a diamond - cut, color, clarity and carat – in varying forms as well. And due to this, each diamond shape offers different forms of beauty, style and brilliance.",
        ],
        image: {
            src: DiamondShapesGrid.src,
            alt: "Diamond Shapes",
        },
        reverse: false,
        floatImages: false,
    },
    {
        title: "Diamond Shape vs Diamond Cut",
        subtitle: "Welcome",
        paragraphs: [
            "The term 'diamond shape' is often confused with the 'cut' of a diamond – one of the four Cs of a diamond. Each shape may be cut to different specifications, which impacts the overall beauty of the stone. However, the type of cut, or quality of it, is determined by different grades, which may or may not be dependent on the shape itself. The 'cut' of a diamond describes how well the diamond has been polished, and that determines the way light is reflected throughout the stone's facet arrangement. It also determines light refraction, sparkle and scintillation.",
            "Uniglo Diamonds suggests to select a diamond with a cut grade of Very Good and above (Very Good, Excellent) to get maximum beauty and value for money. The diamond shape's length-width ratio is also of importance. A greater length to width ratio implies that the diamond will be longer and skinny, while a lower ratio means the diamond is more circular/square in appearance.",
        ],
        image: {
            src: DiamondCutVsShapeImage.src,
            alt: "Diamond Cut vs Shape",
        },
        reverse: true,
        floatImages: false,
    },
];

const page = () => {
    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text="Diamond Shape"
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />

            {/* Articles Section */}
            <section className="max-w-7xl mx-auto px-10 my-20">
                {articles.map((article, idx) => (
                    <ArticleLayout key={idx} {...article} />
                ))}
            </section>

            {/* No-Interest Diamond Financing Banner */}
            <section className="w-full container mx-auto py-16 relative overflow-hidden mb-20">
                <div className="absolute inset-0 bg-black/70 z-10">
                    <Image
                        src={FinancingBannerImage}
                        alt="Diamond Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-10 relative z-20">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h3 className="text-4xl font-cormorantGaramond font-semibold text-white mb-6">
                                No-Interest Diamond Financing
                            </h3>
                            <ul className="space-y-4 text-white/90 font-lora text-lg">
                                <li className="flex gap-3">
                                    <span className="text-[#bb923a] text-2xl">
                                        •
                                    </span>
                                    For certified goods, you can pay 60 days
                                    after purchase date, under an interest-free
                                    financing scheme.
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#bb923a] text-2xl">
                                        •
                                    </span>
                                    If you are purchasing polished diamonds from
                                    Uniglo, you can pay 120 days after purchase
                                    date, under an interest-free diamond
                                    financing scheme.
                                </li>
                            </ul>
                            <p className="text-white/80 font-lora text-lg mt-6">
                                To know more, contact one of our customer care
                                representatives, or fill out the contact form,
                                and enable us to get in touch with you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diamond Shapes Grid Section */}
            <section className="w-full bg-brand-gradient py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {diamondShapes.map((shape, idx) => (
                            <div key={idx} className="flex flex-col">
                                {/* Image Card */}
                                <div className="bg-white p-4 mb-6  h-56 flex items-center justify-center overflow-hidden shadow-lg">
                                    <Image
                                        src={shape.image}
                                        alt={shape.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                {/* Content */}
                                <div className="">
                                    <h3 className="text-[#bb923a] text-2xl font-cormorantGaramond font-semibold mb-3">
                                        {shape.name}
                                    </h3>
                                    <p className="text-white/80 font-lora text-sm leading-relaxed mb-2 line-clamp-4">
                                        {shape.description}
                                    </p>
                                    <a
                                        href={shape.readMore}
                                        className="text-white/70 font-lora text-sm font-semibold hover:underline transition-all"
                                    >
                                        Read more...
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Educational Banner Section */}
            <section className="w-full container mx-auto relative py-16 px-4 overflow-hidden my-20">
                <div className="absolute inset-0">
                    <Image
                        src={DiamondBannerBg}
                        alt="Diamond Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex items-center justify-start">
                        <p className="text-white  text-lg md:text-xl font-lora leading-relaxed max-w-4xl">
                            Uniglo Diamonds believes in educating every customer
                            and catering to their detailed wishes. We seek to
                            ensure that you are well-informed about every
                            diamond shape available, and the best one to select
                            basis your requirement – be it for an engagement
                            ring, jewelry piece or a special gift. Our selection
                            of beautiful shapes, along with detailed information
                            regarding uniqueness and history, beautiful images
                            and recommendations of the ideal cut will help you
                            make the best decision.
                        </p>
                    </div>
                </div>
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
