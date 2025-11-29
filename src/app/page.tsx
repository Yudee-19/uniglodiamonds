"use client";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import banner from "@/assets/banner_3.jpg";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import about1 from "@/assets/uniglow-family/about_1.jpg";
import about2 from "@/assets/uniglow-family/about_2.jpg";
import { Gem, SlidersHorizontal, ListChecks, Eye } from "lucide-react";
const diamondShapes = [
    { name: "Round", src: "/shapes/round-diamond.png" },
    { name: "Oval", src: "/shapes/oval-diamond.png" },
    { name: "Cushion", src: "/shapes/cushion-diamond.png" },
    { name: "Pear", src: "/shapes/pear-diamond.png" },
    { name: "Princess", src: "/shapes/princess-diamond.png" },
    { name: "Emerald", src: "/shapes/emerald-diamond.png" },
    { name: "Marquise", src: "/shapes/marquise-diamond.png" },
    { name: "Asscher", src: "/shapes/asscher-diamond.png" },
    { name: "Radiant", src: "/shapes/radiant-diamond.png" },
    { name: "Heart", src: "/shapes/heart.png" },
];
import mobileAppMockup from "@/assets/mobile-app.png";

const pyramidPattern = [4, 3, 2, 1];

// 2. Helper to chunk the data into that pattern
let currentIndex = 0;
const rows = pyramidPattern.map((count) => {
    const chunk = diamondShapes.slice(currentIndex, currentIndex + count);
    currentIndex += count;
    return chunk;
});
const carouselImages = [
    "/uniglow-family/about_1.jpg", // Replace with your image paths
    "/uniglow-family/about_2.jpg",
];

export default function Home() {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

    return (
        <div className="">
            {/* Hero Section : Carousel */}
            <section className="w-full   min-h-screen flex items-center justify-center">
                <Carousel
                    className="w-full min-h-screen p-0 m-0"
                    plugins={[
                        Autoplay({
                            delay: 3000,
                        }),
                    ]}
                >
                    <CarouselContent className="w-full min-h-screen p-0 m-0">
                        <CarouselItem className="p-0 m-0  min-h-screen  w-full">
                            <Image
                                src={banner}
                                alt="Description"
                                className="w-full  min-h-screen  transform -scale-x-100 object-cover "
                            />
                        </CarouselItem>
                        <CarouselItem className="p-0 m-0  min-h-screen  w-full">
                            <Image
                                src={banner}
                                alt="Description"
                                className="w-full  min-h-screen  object-cover "
                            />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </section>

            {/* Diamond Showcase Section */}
            <section className="py-20 bg-[#FBFBFB] text-center font-cormorantGaramond">
                <div className="mb-12 space-y-2">
                    <span className="text-primary text-sm uppercase tracking-widest ">
                        Diamond Cuts
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-primary-blue-1">
                        SHOP DIAMONDS BY SHAPE
                    </h2>
                    <p className="text-slate-500 font-ligh font-lora">
                        Browse a large collection of IGI, HRD and GIA certified
                        diamonds
                    </p>
                </div>

                {/* 3. Render the specific Rows */}
                <div className="flex flex-col items-center gap-y-10">
                    {rows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex justify-center gap-x-1 sm:gap-x-12 md:gap-x-30" // Increase gap for spacing
                        >
                            {row.map((shape) => (
                                <div
                                    key={shape.name}
                                    className="flex flex-col items-center group cursor-pointer w-20"
                                >
                                    {/* Image */}
                                    <div className="w-16 h-16 md:w-18 md:h-18 relative transition-transform hover:-translate-y-2 duration-300">
                                        <Image
                                            src={shape.src}
                                            alt={shape.name}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-contain drop-shadow-md"
                                        />
                                    </div>
                                    {/* Text */}
                                    <span className="mt-3 font-serif text-sm md:text-lg text-slate-700">
                                        {shape.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className="mt-16">
                    <Button className="purple-reveal-btn p-6" size={"lg"}>
                        <span>VIEW ALL DIAMONDS</span>
                    </Button>
                </div>
            </section>

            {/* Uniglow Family section */}
            <section className="w-full py-20 bg-white font-cormorantGaramond">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* --- LEFT COLUMN: Image Carousel with Geometric Decor --- */}
                        <div className="relative mx-auto w-full max-w-[500px] ">
                            {/* Decorative Gold Box (Top Left) */}
                            <div className="absolute -top-4 -left-4 w-32 h-3/4 bg-primary-yellow-1 z-0" />

                            {/* Decorative Purple Box (Bottom Right) */}
                            <div className="absolute -bottom-4 -right-4 w-32 h-3/4 bg-[#2E1035] z-0" />

                            {/* The Carousel */}
                            <Carousel
                                plugins={[plugin.current]}
                                className="w-full h-full bg-gray-100 shadow-xl"
                                onMouseEnter={plugin.current.stop}
                                onMouseLeave={plugin.current.reset}
                            >
                                <CarouselContent>
                                    {carouselImages.map((src, index) => (
                                        <CarouselItem key={index}>
                                            <div className="relative aspect-6/7 w-full h-full overflow-hidden">
                                                <Image
                                                    src={src}
                                                    alt={`Uniglo Family ${
                                                        index + 1
                                                    }`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {/* Optional: <CarouselPrevious /> <CarouselNext /> */}
                            </Carousel>
                        </div>

                        {/* --- RIGHT COLUMN: Text Content --- */}
                        <div className="flex flex-col space-y-6 text-center lg:text-left">
                            {/* Heading Group */}
                            <div>
                                <span className="text-primary text-sm uppercase  font-semibold mb-2 block">
                                    Welcome to Uniglo
                                </span>
                                <h2 className="text-4xl font-serif text-[#1f2732]">
                                    THE UNIGLO FAMILY
                                </h2>
                            </div>

                            {/* Paragraph Text */}
                            <div className=" font-lora space-y-4 leading-relaxed  text-sm">
                                <p>
                                    Uniglo Diamonds sell top-graded,
                                    independently-certified diamonds worldwide.
                                    Since we manufacture in our own in-house
                                    state-of-the-art facilities in Antwerp, we
                                    guarantee the best-in-market, low and
                                    attractive pricing, based on the 4C diamond
                                    criteria. You can browse through a massive
                                    inventory of small and large stones, in the
                                    best diamond cuts and quality parameters and
                                    discerningly make your selections.
                                </p>
                                <p>
                                    Additionally, Uniglo Diamonds also caters to
                                    B2B solutions and sells commercial stones as
                                    well as top stones. For more information on
                                    that, contact any of our experts from the
                                    Uniglo Diamonds entourage.
                                </p>
                            </div>

                            {/* Stats Section */}
                            <div className="pt-4 pb-8 flex justify-center lg:justify-start gap-16 border-b border-gray-200/50">
                                <div className="text-center lg:text-left">
                                    <span className="block text-5xl text-primary">
                                        100+
                                    </span>
                                    <span className="text-sm uppercase tracking-wide mt-1 block">
                                        Clients Served
                                    </span>
                                </div>
                                <div className="text-center lg:text-left">
                                    <span className="block text-5xl  text-primary">
                                        12+
                                    </span>
                                    <span className="text-sm uppercase tracking-wide mt-1 block">
                                        Years Experience
                                    </span>
                                </div>
                            </div>

                            {/* Button (Using your custom class) */}
                            <div className="pt-4 flex justify-center lg:justify-start">
                                <Button
                                    className="purple-reveal-btn p-6 uppercase"
                                    size={"lg"}
                                >
                                    <span>About Us</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Uniglow Diamonds App Section */}
            <section className="bg-brand-gradient font-cormorantGaramond ">
                <div className="container mx-auto flex flex-col justify-center items-center">
                    <div className="mb-12 space-y-2 text-center pt-15">
                        <span className="text-primary text-sm uppercase tracking-widest  ">
                            Uniglow diamond app
                        </span>
                        <h2 className="text-3xl font-serif text-white">
                            Discover the UNIGLO DIAMONDS APP
                        </h2>
                        <p className="text-slate-500 font-ligh font-lora">
                            Browse a large collection of IGI, HRD and GIA
                            certified diamonds
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 items-center w-full max-w-6xl">
                        {/* 1. Left Column (Features) */}
                        <div className="flex flex-col gap-16 order-2 lg:order-1">
                            {/* Feature: Diamond Search */}
                            <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-3">
                                <div className="text-primary">
                                    <Gem strokeWidth={1.5} size={30} />
                                </div>
                                <h3 className="text-2xl text-white font-cormorantGaramond">
                                    Diamond Search
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    Browse 1000's of natural & <br /> lab grown
                                    diamonds.
                                </p>
                            </div>

                            {/* Feature: Easy Filtering */}
                            <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-3">
                                <div className="text-primary">
                                    <SlidersHorizontal
                                        strokeWidth={1.5}
                                        size={30}
                                    />
                                </div>
                                <h3 className="text-2xl text-white font-cormorantGaramond">
                                    Easy filtering
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    Narrow down search results <br /> with smart
                                    filters.
                                </p>
                            </div>
                        </div>

                        {/* 2. Center Column (Phone Image) */}
                        {/* Note: order-1 on mobile puts image on top, order-2 on desktop puts it in center */}
                        <div className="order-1 lg:order-2 flex justify-center relative py-8">
                            {/* Glow Effect behind phone */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative w-[180px] md:w-[220px] h-[480px] md:h-[500px]">
                                {/* Replace this src with your actual phone screenshot transparent PNG */}
                                <Image
                                    src={mobileAppMockup}
                                    alt="Uniglo App Interface"
                                    fill
                                    className="object-contain drop-shadow-2xl z-10"
                                />
                            </div>
                        </div>

                        {/* 3. Right Column (Features) */}
                        <div className="flex flex-col gap-16 order-3">
                            {/* Feature: Enquire */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                                <div className="text-primary">
                                    <ListChecks strokeWidth={1.5} size={30} />
                                </div>
                                <h3 className="text-2xl text-white font-serif">
                                    Enquire
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    Add your favourite diamonds <br /> to your
                                    inquiry.
                                </p>
                            </div>

                            {/* Feature: 360 View */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                                <div className="text-primary">
                                    <Eye strokeWidth={1.5} size={30} />
                                </div>
                                <h3 className="text-2xl text-white font-serif">
                                    360° diamond View
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    See every detail in 360° <br /> diamond
                                    view.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
