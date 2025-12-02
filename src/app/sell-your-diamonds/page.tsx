import BannerSection from "@/components/shared/BannerSection";
import React from "react";
import bannerImage from "@/assets/banner_2.jpg";
import sellyourdiamondsImage from "@/assets/sell-your-diamonds/sell_diamonds.jpg";
import adviceImage from "@/assets/sell-your-diamonds/advice.png";
import benefitImage from "@/assets/sell-your-diamonds/banifits.jpg";
import ReasonImage from "@/assets/sell-your-diamonds/reson.jpg";
import { Button } from "@/components/ui/button";
import blog1 from "@/assets/home/blog_1.jpg";
import blog2 from "@/assets/home/blog_2.1.jpg";
import blog3 from "@/assets/home/blog_3.jpg";
import blog4 from "@/assets/home/blog_4.jpg";
import blog5 from "@/assets/home/Education.jpg";
import { desc } from "motion/react-client";
import CertificatesMarqueeSection from "@/components/shared/CertificatesMarqueeSection";
import Image from "next/image";
import appointmentRing from "@/assets/sell-your-diamonds/online-inventory-banner.png";

const articleData = [
    {
        subtitle: "Why Uniglo Diamonds",
        title: "Why sell your diamonds to us?",
        image: sellyourdiamondsImage,
        reverse: false,
        paragraphs: [
            "By quoting you a firm and precise value based on the 4C diamond criteria and market demand, we promise you the very best price for your valuable diamonds. With our ever-growing global customer base, we will always have a strong demand for your diamonds, 365 days a year.",
            "We also cater to professional clients, offering the best prices for premium quality diamonds. Selling your inventory to us will ensure brilliant returns and excellent, seamless service.",
            "You can rest assured about immediate payment for the diamonds we buy from you. This not only reinstates our commitment towards trust and transparency, but also ensures you an easy, stress-free experience doing business with Uniglo Diamonds. In addition to diamonds, we have interest in precious and semi-precious coloured stones and diamond jewellery, also payable on the same day.",
        ],
    },
    {
        subtitle: "Advice For You",
        title: "Advice You Will Get At Uniglo?",
        image: adviceImage,
        reverse: true,
        paragraphs: [
            "Keeping in mind that buying and selling diamonds is a complex process, we understand that qualified experience is essential. You may or may not have the accurate information or knowledge of making an informed decision, and getting the best value for your diamonds. At Uniglo Diamonds, you will receive the best value for your diamonds thanks to our experience of over ten years in valuing and buying diamonds. We have the expertise and knowledge needed to offer you the highest prices for your diamonds. You can book an appointment, free of charge and without obligation, and benefit from our trustworthy experts on your every transaction.",
            "At Uniglo Diamonds, you will receive the best value for your diamonds.",
        ],
        buttonText: "Contact Us",
    },
    {
        subtitle: "What's Your Benefit",
        title: "More Reasons To Sell Your Diamonds To Uniglo",
        image: ReasonImage,
        reverse: false,
        paragraphs: [
            "Uniglo is a safe, secure and reliable option. We take your diamonds and appraise it first, to ensure you understand its value. We check if the diamond(s) need to be recut or what can be done to get the best possible value from them. Furthermore, if the diamonds require new certification or an update of certification, we can get that done for you, charging you no extra.",
            "What’s more, if you want to sell your diamond jewellery, we can remove the diamonds from it and sell the diamond component for you. We can check if the diamond needs to be recut, or if it needs renewed certification. We will give you the best offer on your diamonds, and pay you immediately based on the appraised value of your diamonds. This option saves you the stress of listing your diamond on your own. With the dedicated audience we have, and traffic we attract, you will have your diamond sold in a quicker manner compared to other jewellers.",
        ],
        buttonText: "Contact Us",
    },
    {
        subtitle: "Why Uniglo Diamonds",
        title: "The benefit of selling your diamonds online",
        image: benefitImage,
        reverse: true,
        paragraphs: [
            "The benefits are many. The most crucial thing while making the decision of whom to sell your diamonds to is TRUST. You can review Uniglo’s testimonials, history in the industry and track record with reputed websites, to ensure the best service and that the highest possible returns are provided to you.",
            "Uniglo has access to national and global markets, which can have a positive impact on the returns you may receive for your diamonds, since we have the ability to purchase a larger range of items.",
            "Another benefit of selling your diamonds to Uniglo is the guarantee of easy, seamless communication. We have a dedicated team on ground and online to respond to your every query, resolving any doubts or confusion you may have. Our experts will educate you on everything you may need to know to ensure your sale is legitimate and beneficiary to you. If you are located in Antwerp, you can always come to the office headquarters, or alternatively, we can even arrange an appointment to meet you at a location of your convenience to satisfy your every requirement during the sale",
            "Selling online with Uniglo, means significantly less hassle. Our process is seamless and executed by a team of well-trained and efficient executives, who will always assist you every step of the way.",
            "Selling diamonds online also allows you to free up finance and do something positive with the money and returns you receive. It also puts you in the position of upgrading or downgrading to find another coveted and special piece for your personal diamond collection.",
        ],
    },
];

const blogData = [
    {
        image: blog1,

        title: "How to Choose a Diamond Engagement Ring",
        description:
            "Choosing a diamond engagement ring is an exciting and personal experience, but with so many options, it can be overwhelming.",
    },
    {
        image: blog2,

        title: "Best Places to Buy Diamonds Online",
        description: "Buying diamonds online has become increasingly...",
    },
    {
        image: blog3,

        title: "Diamond Investment Guide: What You Need to Know Before Investing",
        description: "Diamonds have long been valued for their beauty..",
    },
    {
        image: blog4,

        title: "Loose Diamonds Buying Guide: How to Choose the Perfect Stone",
        description:
            " When buying a loose diamond, you have the opportunity to handpick a stone that matches your personal style, budget, and jewelry preferences.",
    },
    {
        image: blog5,

        title: "Diamond Size Guide: Understanding Carat Weight and Visual Appearance",
        description:
            "When selecting a diamond, one of the most important factors to consider is carat weight, which directly influences the size and visual impact of the stone.",
    },
];

const Page = () => {
    return (
        <div className="min-h-screen mt-30">
            <BannerSection image={bannerImage} text="Sell Your Diamonds" />
            {/* Articles Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {articleData.map((data, index) => (
                    <div
                        key={index}
                        className="mb-10 after:clear-both after:block"
                    >
                        {/* 1. IMAGE: Must be placed BEFORE the text to float correctly. 
                - md:float-right: Pushes image to right on desktop
                - md:ml-10: Adds margin to the left so text doesn't touch it
                - w-full md:w-[45%]: Full width on mobile, partial width on desktop
            */}
                        <div
                            className={`relative w-full md:w-[45%] h-auto my-16  ${
                                data.reverse
                                    ? "md:float-right md:ml-10"
                                    : "md:float-left md:mr-10"
                            }`}
                        >
                            <img
                                src={data.image.src} // Depending on your loader, might just be {data.image}
                                alt={data.title}
                                className="w-full h-auto object-cover  shadow-sm "
                            />
                        </div>

                        {/* 2. TEXT CONTENT: This will naturally wrap around the floated image above */}
                        <div className="text-content">
                            {/* Subtitle */}
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-primary font-bold font-lora uppercase tracking-widest text-sm">
                                    {data.subtitle}
                                </h4>
                                <span className="w-8 h-px bg-primary"></span>
                            </div>

                            {/* Title */}
                            <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-gray-900 mb-8 leading-tight">
                                {data.title}
                            </h2>

                            {/* Paragraphs */}
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-lora">
                                {data.paragraphs.map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>

                            {/* Button (Optional based on design) */}
                            {data.buttonText && (
                                <Button className="mt-8 px-8 py-5 purple-reveal-btn uppercase">
                                    <span>{data.buttonText}</span>
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            {/* No Hidden Costs Section */}
            <section className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-semibold font-cormorantGaramond text-gray-900 mb-6">
                        No Hidden Costs Or Fees
                    </h2>
                    <p className="text-gray-600 text-lg font-lora leading-relaxed">
                        With Uniglo, you do not have to bear any hidden costs or
                        fees. You will be able to sell with the absolute
                        certainty that you will have a buyer and no information
                        will be hidden from you at any point of the sale. This
                        results in the returns you can expect, without losing to
                        any middle men.
                    </p>
                </div>
            </section>

            {/* Blog Section */}
            <section className="bg-brand-gradient  pb-20  px-10">
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
                    <div className="my-15 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div>
                            <span className="text-primary-yellow-1 text-xs uppercase font-lora mb-4 block">
                                Our Blog
                            </span>
                            <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-white mb-4">
                                Recent Posts
                            </h2>
                        </div>
                        <div>
                            <p className="text-white font-lora max-w-xl">
                                Discover expert insights, from buying guides to
                                expert advice, and the latest trends to help you
                                make informed choices.
                            </p>
                        </div>
                        <div>
                            <Button className="px-8 py-5 purple-reveal-btn uppercase font-lora ">
                                <span>VIEW ALL POST</span>
                            </Button>
                        </div>
                    </div>
                    {/* First grid: 3 blogs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-5 max-w-6xl mx-auto">
                        {blogData.slice(0, 3).map((blog, idx) => (
                            <div
                                key={idx}
                                className="relative group  overflow-hidden h-80 cursor-pointer"
                            >
                                <img
                                    src={blog.image.src}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Black overlay reveal */}
                                <div className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
                                    <div className="absolute inset-0 bg-black/80 transition-transform duration-500 ease-in-out origin-center scale-x-0 group-hover:scale-x-100" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500 pointer-events-auto group-hover:opacity-100 opacity-0 ">
                                        <h3 className="text-3xl font-cormorantGaramond font-semibold text-white mb-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-sm text-gray-200 font-lora mb-3">
                                            {blog.description}
                                        </p>
                                        <Button className="gold-reveal-btn px-8 py-5 w-fit uppercase font-lora text-sm">
                                            <span>Learn More</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Second grid: 2 blogs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full  max-w-6xl mx-auto">
                        {blogData.slice(3, 5).map((blog, idx) => (
                            <div
                                key={idx}
                                className="relative group overflow-hidden h-80 cursor-pointer"
                            >
                                <img
                                    src={blog.image.src}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Black overlay reveal */}
                                <div className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
                                    <div className="absolute inset-0 bg-black/80 transition-transform duration-500 ease-in-out origin-center scale-x-0 group-hover:scale-x-100" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500 pointer-events-auto group-hover:opacity-100 opacity-0 ">
                                        <h3 className="text-3xl font-cormorantGaramond font-semibold text-white mb-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-sm text-gray-200 font-lora mb-3">
                                            {blog.description}
                                        </p>
                                        <Button className="gold-reveal-btn px-8 py-5 w-fit uppercase font-lora text-sm">
                                            <span>Learn More</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <CertificatesMarqueeSection />
            {/* Make an Appointment Section */}
            <section className="bg-brand-gradient py-20 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:items-stretch gap-0 md:gap-0 rounded-lg overflow-hidden">
                    {/* Left: Inventory Promo */}
                    <div className="bg-black flex flex-col items-center justify-center p-10 min-h-[400px] md:w-1/3">
                        <div className="flex flex-col items-center">
                            <h3 className="text-white text-3xl md:text-4xl font-cormorantGaramond text-center mb-8">
                                BROWSE THOUSANDS
                                <br />
                                OF LOOSE DIAMONDS
                            </h3>
                            <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition px-8 py-4 text-lg font-lora tracking-wide rounded-none mt-2">
                                ONLINE INVENTORY
                            </Button>
                            <Image
                                src={appointmentRing} // Replace with your diamond ring image path
                                alt="Diamond Ring"
                                width={250}
                                height={250}
                                className="mt-10 w-60 h-auto aspect-square object-contain"
                            />
                        </div>
                    </div>
                    {/* Right: Appointment Info */}
                    <div className="bg-primary-purple flex flex-col justify-center p-10 min-h-[400px]">
                        <span className="text-primary-yellow-1 text-sm uppercase font-lora tracking-widest mb-4 block">
                            MAKE AN APPOINTMENT{" "}
                            <span className="inline-block align-middle w-8 h-px bg-primary-yellow-1 ml-2"></span>
                        </span>
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-white mb-8">
                            Find Us
                        </h2>
                        <div className="mb-6">
                            <h4 className="text-2xl font-cormorantGaramond text-white mb-2">
                                Address
                            </h4>
                            <p className="text-white font-lora text-lg">
                                Hoveniersstraat 30, Suite 663, Bus 250 2018
                                Antwerp
                            </p>
                        </div>
                        <div className="mb-8">
                            <h4 className="text-2xl font-cormorantGaramond text-white mb-2">
                                Hours
                            </h4>
                            <p className="text-white font-lora text-lg">
                                Monday–Friday: 10:00 – 18:00
                                <br />
                                Saturday &amp; Sunday: On Appointment
                            </p>
                        </div>
                        <Button className="border-2 border-primary-yellow-1 text-white bg-transparent hover:bg-primary-yellow-1 hover:text-black transition px-8 py-4 text-lg font-lora tracking-wide rounded-none mt-2 gold-reveal-btn">
                            <span>CONTACT US</span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
