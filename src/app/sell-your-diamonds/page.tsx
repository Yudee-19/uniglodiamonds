"use client";

import BannerSection from "@/components/shared/BannerSection";
import React from "react";
import bannerImage from "@/assets/sell-your-diamonds/banner.jpeg";
import sellyourdiamondsImage from "@/assets/sell-your-diamonds/img1.jpg";
import adviceImage from "@/assets/sell-your-diamonds/img2.jpg";
import benefitImage from "@/assets/sell-your-diamonds/img3.jpg";
import ReasonImage from "@/assets/sell-your-diamonds/ing4.jpg";
import { Button } from "@/components/ui/button";
import CertificatesMarqueeSection from "@/components/shared/CertificatesMarqueeSection";
import Image from "next/image";
import appointmentRing from "@/assets/sell-your-diamonds/online-inventory-banner.png";
import ArticleLayout from "@/components/shared/ArticleLayout";
import SellDiamondForm from "@/components/shared/SellDiamondForm";

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
            "What's more, if you want to sell your diamond jewellery, we can remove the diamonds from it and sell the diamond component for you. We can check if the diamond needs to be recut, or if it needs renewed certification. We will give you the best offer on your diamonds, and pay you immediately based on the appraised value of your diamonds. This option saves you the stress of listing your diamond on your own. With the dedicated audience we have, and traffic we attract, you will have your diamond sold in a quicker manner compared to other jewellers.",
        ],
        buttonText: "Contact Us",
    },
    {
        subtitle: "Why Uniglo Diamonds",
        title: "The benefit of selling your diamonds online",
        image: benefitImage,
        reverse: true,
        paragraphs: [
            "The benefits are many. The most crucial thing while making the decision of whom to sell your diamonds to is TRUST. You can review Uniglo's testimonials, history in the industry and track record with reputed websites, to ensure the best service and that the highest possible returns are provided to you.",
            "Uniglo has access to national and global markets, which can have a positive impact on the returns you may receive for your diamonds, since we have the ability to purchase a larger range of items.",
            "Another benefit of selling your diamonds to Uniglo is the guarantee of easy, seamless communication. We have a dedicated team on ground and online to respond to your every query, resolving any doubts or confusion you may have. Our experts will educate you on everything you may need to know to ensure your sale is legitimate and beneficiary to you. If you are located in Antwerp, you can always come to the office headquarters, or alternatively, we can even arrange an appointment to meet you at a location of your convenience to satisfy your every requirement during the sale",
            "Selling online with Uniglo, means significantly less hassle. Our process is seamless and executed by a team of well-trained and efficient executives, who will always assist you every step of the way.",
            "Selling diamonds online also allows you to free up finance and do something positive with the money and returns you receive. It also puts you in the position of upgrading or downgrading to find another coveted and special piece for your personal diamond collection.",
        ],
    },
];

const Page = () => {
    return (
        <div className="min-h-screen ">
            <BannerSection image={bannerImage} text="Sell Your Diamonds" />

            {/* Articles Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {articleData.map((data, index) => (
                    <ArticleLayout
                        key={index}
                        title={data.title}
                        subtitle={data.subtitle}
                        paragraphs={data.paragraphs}
                        image={{
                            src: data.image.src,
                            alt: data.title,
                        }}
                        reverse={data.reverse}
                        buttonText={data.buttonText}
                    />
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

            {/* Certificates Marquee Section */}
            <CertificatesMarqueeSection />

            {/* Sell Your Diamonds Form Section */}
            <SellDiamondForm
                title="Sell Your Diamonds - Get a Free Valuation"
                subtitle="Complete the form below to get a free valuation for your diamonds. Our process is secure, confidential, and designed to get you the best possible price."
            />

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
                                src={appointmentRing}
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
                                Hoveniersstraat 30, Suite 662, Bus 250 2018
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
