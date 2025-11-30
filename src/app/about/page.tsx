import Image from "next/image";
import React from "react";
import bannerImage from "@/assets/banner_2.jpg";
import UniglowFamilySection from "@/components/shared/UniglowFamilySection";
import CertificatesMarqueeSection from "@/components/shared/CertificatesMarqueeSection";
import Antwerpimage1 from "@/assets/about/antwerp_2.jpg";
import Antwerpimage2 from "@/assets/about/antwerp_1.jpg";
import blog1 from "@/assets/home/blog_1.jpg";
import blog2 from "@/assets/home/blog_2.1.jpg";
import blog3 from "@/assets/home/blog_3.jpg";
import BannerSection from "@/components/shared/BannerSection";

const latestBlogs = [
    {
        image: blog1,
        date: "AUGUST 10, 2023",
        category: "INTERIOR",
        title: "How to Choose a Diamond Engagement Ring",
        link: "#",
    },
    {
        image: blog2,
        date: "AUGUST 10, 2023",
        category: "INTERIOR",
        title: "Best Places to Buy Diamonds Online",
        link: "#",
    },
    {
        image: blog3,
        date: "AUGUST 10, 2023",
        category: "INTERIOR",
        title: "Diamond Investment Guide: What You Need to Know Before Investing",
        link: "#",
    },
];

const Page = () => {
    return (
        <div className="min-h-screen py-20">
            {/* Banner section */}
            <BannerSection image={bannerImage} text="About us" />
            {/* Uniglow Family Section */}
            <UniglowFamilySection />
            {/* History Section */}
            <section className="bg-[#232222] py-20 font-cormorantGaramond">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12 ">
                    {/* Left: Video */}
                    <div className="w-full md:w-3/2 flex justify-center">
                        <div className="aspect-video w-full max-w-2xl overflow-hidden shadow-lg">
                            <video
                                src="/videos/history.mp4" // <-- Replace with your video path
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    {/* Right: Text */}
                    <div className="w-full  flex flex-col justify-center px-2">
                        <span className="text-primary-yellow-1 text-sm uppercase font-lora tracking-widest mb-4 block">
                            OUR HISTORY
                        </span>
                        <h2 className="text-4xl font-cormorantGaramond font-semibold text-white mb-6">
                            SINCE 2001
                        </h2>
                        <p className="text-slate-300/40 font-lora text-sm mb-8 max-w-xl">
                            Driven by a passion for perfection, Uniglo Diamonds
                            began its journey in the year 2001. Our dedication
                            turned this venture into one of the most trusted
                            brands. Since its inception, Uniglo Diamonds has
                            been in constant pursuit for perfection.
                        </p>
                        <div>
                            <span className="text-primary-yellow-1 text-xl font-cormorantGaramond font-semibold">
                                Suraj Poddar
                            </span>
                            <div className="text-slate-400 font-lora text-lg mt-1">
                                — Founder
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Partners Marquee Section */}
            <CertificatesMarqueeSection />
            {/* Quotation Video Section */}
            <section className="relative w-full h-[550px] flex items-center justify-center font-cormorantGaramond">
                {/* Background Video */}
                <video
                    className="absolute inset-0 w-full max-h-100 object-cover"
                    src="/videos/about_page.mp4" // <-- Replace with your video path
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                {/* Overlay for darkening */}
                <div className="absolute inset-0 bg-black/10 flex justify-center items-center" />
                {/* Quotation Content */}
                <div className="relative z-10 w-full flex flex-col items-center justify-center px-4  pb-40">
                    <h2 className="text-white text-4xl md:text-5xl max-w-6xl mx-auto text-center font-cormorantGaramond font-semibold leading-tight mb-6">
                        “We are determined to live up to the expectations of our
                        clients and do the best we can to meet their
                        expectations.”
                    </h2>
                    <div className="text-primary-yellow-1 text-2xl font-cormorantGaramond font-semibold text-center mt-2">
                        Suraj Poddar – Uniglo Diamonds
                    </div>
                </div>
            </section>
            {/* Antwerp Section */}
            <section className="bg-white py-24 font-cormorantGaramond">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row  gap-7">
                        <div className="flex flex-col justify-center items-center md:w-1/2  ">
                            <div>
                                <span className="text-primary text-sm uppercase font-cormorantGaramond tracking-widest mb-4 block">
                                    OPERATING WORLDWIDE
                                </span>
                                <h2 className="text-6xl font-cormorantGaramond font-semibold text-black mb-10">
                                    Situated in
                                    <br />
                                    <span className="sm:pl-40">Antwerp</span>
                                </h2>
                            </div>
                            <Image
                                src={Antwerpimage1} // Replace with your diamond image path
                                alt="Diamond"
                                width={300}
                                height={400}
                                className="sm:w-full h-auto object-cover shadow-md"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center md:w-1/2 ">
                            {" "}
                            <Image
                                src={Antwerpimage2} // Replace with your Antwerp image path
                                alt="Antwerp"
                                width={300}
                                height={400}
                                className="sm:w-full h-auto object-cover shadow-md"
                            />
                            <div className="w-full  mt-10">
                                <p className="text-slate-700 font-lora text-base">
                                    Situated in Antwerp, Belgium, Uniglo
                                    Diamonds strives hard to bring you the best
                                    natural diamonds. Over 80 percent of our
                                    clientele includes those who reach out to us
                                    by the ‘word of mouth’. We pride ourselves
                                    for earning customer loyalty and upholding
                                    it by sourcing the best diamonds available.
                                    Your trust makes us more determined to work
                                    harder and to exceed your expectations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Latest Blog Section */}
            <section className="bg-white py-24 font-cormorantGaramond">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-black text-center mb-4">
                        LATEST POST FROM BLOG
                    </h2>
                    <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
                        Proactively morph optimal infomediaries rather than
                        accurate expertise. Intrinsically progressive resources
                        rather than resource-leveling
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestBlogs.map((blog, idx) => (
                            <div
                                key={idx}
                                className="bg-white shadow-sm overflow-hidden flex flex-col group"
                            >
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="text-sm text-slate-400 mb-2">
                                        <span className="mr-2">
                                            ■ {blog.date}
                                        </span>
                                        <span>■ {blog.category}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">
                                        {blog.title}
                                    </h3>
                                    <div className="mt-auto flex justify-between items-center pt-4 border-t">
                                        <a
                                            href={blog.link}
                                            className="text-sm text-black font-medium hover:underline"
                                        >
                                            READ MORE
                                        </a>
                                        <span className="text-xl">→</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
