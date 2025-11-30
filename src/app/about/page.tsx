import Image from "next/image";
import React from "react";
import bannerImage from "@/assets/banner_2.jpg";
import UniglowFamilySection from "@/components/shared/UniglowFamilySection";
import CertificatesMarqueeSection from "@/components/shared/CertificatesMarqueeSection";

const Page = () => {
    return (
        <div className="min-h-screen py-20">
            {/* Banner section */}
            <section className="">
                <div className="relative">
                    <Image
                        src={bannerImage}
                        alt="Banner"
                        width={1200}
                        height={100}
                        className="w-full"
                    />
                    <h1 className="absolute top-2/3 right-20 uppercase  transform  -translate-y-3/4 text-white text-5xl font-bold font-cormorantGaramond">
                        About us
                    </h1>
                </div>
            </section>
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
        </div>
    );
};

export default Page;
