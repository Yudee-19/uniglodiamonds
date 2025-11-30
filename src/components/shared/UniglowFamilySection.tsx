"use client";
import React, { useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "../ui/button";

const carouselImages = [
    "/uniglow-family/about_1.jpg", // Replace with your image paths
    "/uniglow-family/about_2.jpg",
];

const UniglowFamilySection = () => {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
    return (
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
                                guarantee the best-in-market, low and attractive
                                pricing, based on the 4C diamond criteria. You
                                can browse through a massive inventory of small
                                and large stones, in the best diamond cuts and
                                quality parameters and discerningly make your
                                selections.
                            </p>
                            <p>
                                Additionally, Uniglo Diamonds also caters to B2B
                                solutions and sells commercial stones as well as
                                top stones. For more information on that,
                                contact any of our experts from the Uniglo
                                Diamonds entourage.
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
    );
};

export default UniglowFamilySection;
