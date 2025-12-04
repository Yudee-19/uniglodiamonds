"use client";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import banner1 from "@/assets/Banner-01.jpg";
import banner2 from "@/assets/Banner-02.jpg";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
    Gem,
    SlidersHorizontal,
    ListChecks,
    Eye,
    Hammer,
    Package,
    User,
    Phone,
} from "lucide-react";

import sellDiamond from "@/assets/home/sell_diamonds.jpg";
import education from "@/assets/home/Education.jpg";
import diamondGuide from "@/assets/home/diamonds_guide.jpg";
import blogImage1 from "@/assets/home/blog_1.jpg";
import blogImage2 from "@/assets/home/blog_2.1.jpg";
import blogImage3 from "@/assets/home/blog_3.jpg";

// 1. Service data array
const services = [
    {
        icon: Gem,
        title: "Diamond Manufacturing",
        description:
            "Uniglo Diamonds crafts exquisite, certified gems with precision and ethical sourcing. Trusted quality for your perfect diamond.",
    },
    {
        icon: SlidersHorizontal,
        title: "Free Estimations",
        description:
            "Uniglo Diamonds provides free, accurate estimations with no obligation, offering trusted insights into your diamond's true value.",
    },
    {
        icon: Package,
        title: "Financing",
        description:
            "Uniglo Diamonds offers flexible, easy financing options, allowing you to enjoy your diamond now with manageable payments over time.",
    },
    {
        icon: Hammer,
        title: "Investment",
        description:
            "Uniglo Diamonds provides expert guidance and certified, high-quality stones for secure diamond investments that grow in value.",
    },
    {
        icon: ListChecks,
        title: "Sealing",
        description:
            "Uniglo Diamonds provides secure, professional diamond sealing services to protect, preserve, and enhance your gem’s authenticity and quality.",
    },
    {
        icon: Eye,
        title: "Partners",
        description:
            "Uniglo Diamonds partners globally, offering premium diamonds and tailored services to meet diverse client needs and standards.",
    },
];

const diamondShapes = [
    { name: "Round", src: "/shapes/round-diamond.png" },
    { name: "Oval", src: "/shapes/Oval-Diamond.png" },
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
import UniglowFamilySection from "@/components/shared/UniglowFamilySection";
import CertificatesMarqueeSection from "@/components/shared/CertificatesMarqueeSection";

const pyramidPattern = [4, 3, 2, 1];

// 2. Helper to chunk the data into that pattern
let currentIndex = 0;
const rows = pyramidPattern.map((count) => {
    const chunk = diamondShapes.slice(currentIndex, currentIndex + count);
    currentIndex += count;
    return chunk;
});

const blogPosts = [
    {
        image: blogImage1,
        title: "How to Choose a Diamond Engagement Ring",
        description:
            "Choosing a diamond engagement ring is an exciting and personal experience, but with so many options, it can be overwhelming.",
        author: "Admin",
        date: "August 29, 2023",
        button: "LEARN MORE",
    },
    {
        image: blogImage2,
        title: "Best Places to Buy Diamonds Online",
        description: "Buying diamonds online has become increasingly...",
        author: "Admin",
        date: "August 29, 2023",
        button: "LEARN MORE",
    },
    {
        image: blogImage3,
        title: "Diamond Investment Guide: What You Need to Know Before Investing",
        description: "Diamonds have long been valued for their beauty...",
        author: "Admin",
        date: "August 29, 2023",
        button: "LEARN MORE",
    },
];

export default function Home() {
    // 3. ServiceCard component
    function ServiceCard({ icon: Icon, title, description }: any) {
        return (
            <div className="purple-reveal-btn px-8 py-15 flex flex-col items-center justify-center text-center group ">
                <div className="flex flex-col items-center mb-4">
                    <Icon
                        size={40}
                        strokeWidth={2}
                        className="text-primary mb-2 group-hover:text-primary-purple"
                    />
                </div>
                <h3 className="text-3xl font-cormorantGaramond text-primary mb-2 group-hover:text-primary-purple">
                    {title}
                </h3>
                <p className="text-slate-200 font-lora text-base max-w-sm group-hover:text-primary-purple">
                    {description}
                </p>
            </div>
        );
    }

    const infoSections = [
        {
            image: sellDiamond,
            tag: "SELL YOUR DIAMONDS",
            title: "Why sell your diamonds to us?",
            description:
                "By quoting you a firm and precise value based on the 4C diamond criteria and market demand, we promise you the very best price for your valuable diamonds. With our ever-growing global customer base, we will always have a strong demand for your diamonds, 365 days a year.",
            button: "LEARN MORE",
            number: "01",
            reverse: false,
        },
        {
            image: diamondGuide,
            tag: "GUIDE",
            title: "Diamond Investment Guide: What You Need to Know Before Investing",
            description:
                "Diamonds have long been valued for their beauty and rarity, but they are increasingly being considered as an investment option. While diamonds don’t provide dividends or interest, like stocks or bonds, they offer value through their inherent scarcity and long-term durability.",
            button: "LEARN MORE",
            number: "02",
            reverse: true,
        },
        {
            image: education,
            tag: "EDUCATION",
            title: "Every Stone Has A Different Story To Tell",
            description:
                "Every diamond is a unique miracle of nature, created billions of years ago deep below the Earth’s surface by forces beyond our imagination. They are the ultimate symbols of love, emotion, commitment and purity. Like snowflakes, no two are exactly alike.",
            button: "LEARN MORE",
            number: "03",
            reverse: false,
        },
    ];

    return (
        <div className="">
            {/* Hero Section : Carousel */}
            <section className="w-full   min-h-screen flex items-center justify-center">
                <Carousel
                    className="w-full min-h-screen p-0 m-0 mt-30 border border-white "
                    plugins={[
                        Autoplay({
                            delay: 3000,
                        }),
                    ]}
                >
                    <CarouselContent className="  w-full min-h-screen p-0 m-0">
                        <CarouselItem className="p-0 m-0  min-h-screen  w-full relative">
                            <Image
                                src={banner1}
                                alt="Description"
                                className="w-full  min-h-screen   object-cover "
                            />
                            {/* Phone Number Div - Left */}
                            <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20">
                                <div className="border-2 border-white/80 px-4 md:px-6 py-4 md:py-12 flex flex-col items-center justify-center">
                                    <p className="text-white text-lg font-lora font-semibold leading-tight [writing-mode:vertical-rl] rotate-180 tracking-widest">
                                        +32 473 565 758
                                    </p>
                                    <span className="text-[#bb923a] [writing-mode:vertical-rl]  -rotate-50 mt-4">
                                        <Phone size={24} />
                                    </span>
                                </div>
                            </div>
                            <div className="absolute bottom-12 md:bottom-90 right-30  z-20">
                                <Button
                                    className="purple-reveal-btn px-10 py-8 font-cormorantGaramond text-xl uppercase"
                                    size="lg"
                                >
                                    <span> Browse Inventory</span>
                                </Button>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="p-0 m-0  min-h-screen  w-full relative">
                            <Image
                                src={banner2}
                                alt="Description"
                                className="w-full  min-h-screen  object-cover "
                            />
                            <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20">
                                <div className="border-2 border-white/80 px-4 md:px-6 py-4 md:py-12 flex flex-col items-center justify-center">
                                    <p className="text-white text-lg font-lora font-semibold leading-tight [writing-mode:vertical-rl] rotate-180 tracking-widest">
                                        +32 473 565 758
                                    </p>
                                    <span className="text-[#bb923a] [writing-mode:vertical-rl]  -rotate-50 mt-4">
                                        <Phone size={24} />
                                    </span>
                                </div>
                            </div>
                            <div className="absolute bottom-12 md:bottom-90 left-1/2 -translate-x-1/2 -translate-y-4/4 z-20">
                                <Button
                                    className="purple-reveal-btn px-10 py-8 font-cormorantGaramond text-xl uppercase"
                                    size="lg"
                                >
                                    <span> Browse Inventory</span>
                                </Button>
                            </div>
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
            <UniglowFamilySection />
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
            {/* Journey Section */}
            <section className="bg-white py-24 font-cormorantGaramond">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm uppercase font-cormorantGaramond font-semibold">
                            DIAMOND TO JEWELRY
                        </span>
                        <h2 className="text-4xl font-semibold  font-cormorantGaramond  mt-2">
                            The Journey Of Elegance
                        </h2>
                        <p className="text-slate-500 font-lora text-sm mt-4">
                            See how every piece of diamond transforms from idea
                            to timeless jewelry.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 text-center">
                        {/* Design Inspiration */}
                        <div className="flex flex-col items-center px-6">
                            <Gem
                                size={64}
                                strokeWidth={0.9}
                                className="text-primary mb-6"
                            />
                            <h3 className="text-2xl font-semibold font-cormorantGaramond mb-3">
                                Design Inspiration
                            </h3>
                            <p className="text-slate-500 font-lora text-sm">
                                Our designers craft timeless concepts, blending
                                tradition with modern elegance.
                            </p>
                        </div>
                        {/* Artisan Crafting */}
                        <div className="flex flex-col items-center px-6">
                            <Hammer
                                size={64}
                                strokeWidth={0.9}
                                className="text-primary mb-6"
                            />
                            <h3 className="text-2xl font-semibold font-cormorantGaramond mb-3">
                                Artisan Crafting
                            </h3>
                            <p className="text-slate-500 font-lora text-sm">
                                Skilled artisans shape each piece with
                                precision, using only the finest materials.
                            </p>
                        </div>
                        {/* Delivered To You */}
                        <div className="flex flex-col items-center px-6">
                            <Package
                                size={64}
                                strokeWidth={0.9}
                                className="text-primary mb-6"
                            />
                            <h3 className="text-2xl font-semibold font-cormorantGaramond mb-3">
                                Delivered To You
                            </h3>
                            <p className="text-slate-500 font-lora text-sm">
                                Your jewelry arrives beautifully packaged, ready
                                to be worn and cherished.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Services Section */}
            <section className="bg-brand-gradient py-24 font-cormorantGaramond">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <span className="text-primary text-sm uppercase tracking-widest font-lora">
                            YOUR 360 DIAMONDS SOLUTIONS
                        </span>
                        <h2 className="text-4xl font-cormorantGaramond text-white mt-2 mb-4">
                            Our Services
                        </h2>
                        <p className="text-slate-300/70 font-lora text-base max-w-7xl mx-auto">
                            Uniglo Diamonds is committed to giving you all the
                            relevant diamond expertise, guidance and product
                            range depending on your investment goals and
                            available funds, ensuring you make a sound, safe and
                            smart investment in diamonds.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {services.map((service, idx) => (
                            <ServiceCard key={service.title} {...service} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-10">
                        <Button
                            className="purple-reveal-btn px-10 py-6 font-serif text-base"
                            size="lg"
                        >
                            <span>EXPLORE MORE</span>
                        </Button>
                    </div>
                </div>
            </section>
            {/* Partners Marquee Section */}
            <CertificatesMarqueeSection />
            {/* Videos Section */}
            <section className="relative w-full h-[600px] flex items-center justify-start font-cormorantGaramond">
                {/* Background Video */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/videos/GettyImages.mp4" // <-- Replace with your video path
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />
                {/* Content */}
                <div className="relative z-10 max-w-2xl pl-5 md:pl-16">
                    <span className="text-primary-yellow-1 text-lg uppercase font-lora tracking-widest mb-6 block">
                        A PARTNERSHIP OF VALUE
                    </span>
                    <h2 className="text-3xl md:text-5xl font-cormorantGaramond text-white font-semibold mb-6 leading-tight">
                        WHY SHOULD YOU BUY A<br />
                        DIAMOND FROM UNIGLO
                        <br />
                        DIAMONDS
                    </h2>
                    <p className="text-white font-lora text-xs md:text-lg mb-10">
                        Uniglo Diamonds has been selling diamonds in Antwerp,
                        Belgium for over three decades. We buy and sell
                        diamonds, ensuring a seamless and memorable experience.
                        Since we manufacture in our own facilities in Antwerp,
                        we guarantee low, wholesale pricing,
                    </p>
                    <Button
                        className="purple-reveal-btn px-10 py-6 text-lg font-cormorantGaramond"
                        size="lg"
                    >
                        <span>ABOUT MORE</span>
                    </Button>
                </div>
            </section>
            {/* Services Description Section */}
            <section className="bg-white py-20 font-cormorantGaramond">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {infoSections.map((section, idx) => (
                        <div
                            key={section.title}
                            className={`flex flex-col md:flex-row items-center gap-8 py-12 border-b border-gray-300/60 ${
                                section.reverse ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            {/* Image */}
                            <div className="w-full md:w-1/2 flex justify-center">
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    width={600}
                                    height={260}
                                    className="rounded-md object-cover"
                                />
                            </div>
                            {/* Content */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center px-2">
                                <div className="flex items-center mb-2">
                                    <span className="text-primary text-4xl font-cormorantGaramond font-semibold mr-4">
                                        {section.number}
                                    </span>
                                    <span className="text-primary text-lg uppercase font-lora tracking-widest">
                                        {section.tag}
                                    </span>
                                </div>
                                <h3 className="text-4xl font-cormorantGaramond font-semibold mb-2">
                                    {section.title}
                                </h3>
                                <p className="text-slate-600 font-lora text-base mb-6 max-w-sm mt-10">
                                    {section.description}
                                </p>
                                <Button
                                    className="purple-reveal-btn px-8 py-6 font-cormorantGaramond text-base w-fit"
                                    size="lg"
                                >
                                    <span>{section.button}</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Latest News Section */}
            <section className="bg-[#f3f3f3] py-24 font-cormorantGaramond">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-10">
                        <span className="text-primary-yellow-1 text-lg uppercase font-lora tracking-widest">
                            Blog
                        </span>
                        <h2 className="text-4xl font-cormorantGaramond font-semibold mt-2 mb-4">
                            Latest News Update
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-8 max-w-7xl mx-auto">
                        {/* Left Large Card */}
                        <div className="bg-white rounded-md shadow-sm col-span-1 md:col-span-2 lg:col-span-1 flex flex-col">
                            <Image
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                width={600}
                                height={600}
                                className="rounded-t-md object-cover w-full "
                            />
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-primary-yellow-1 font-lora mb-2">
                                    <span className="flex justify-start items-center gap-2">
                                        <User size={20} /> {blogPosts[0].author}
                                    </span>
                                    <span>{blogPosts[0].date}</span>
                                </div>
                                <h3 className="text-2xl font-cormorantGaramond font-semibold mb-2">
                                    {blogPosts[0].title}
                                </h3>
                                <p className="text-slate-600 font-lora text-base mb-6">
                                    {blogPosts[0].description}
                                </p>
                                <Button
                                    className="purple-reveal-btn px-8 py-3 font-cormorantGaramond text-base"
                                    size="lg"
                                >
                                    <span>{blogPosts[0].button}</span>
                                </Button>
                            </div>
                        </div>
                        {/* Right Two Cards */}
                        <div className="flex flex-col gap-8">
                            {/* Top Card */}
                            <div className="bg-white rounded-md shadow-sm flex flex-row h-1/2">
                                <Image
                                    src={blogPosts[1].image}
                                    alt={blogPosts[1].title}
                                    width={600}
                                    height={140}
                                    className=" object-cover w-1/2 h-full"
                                />
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-primary-yellow-1 font-lora mb-2">
                                        <span className="flex justify-start items-center gap-2">
                                            <User size={20} />{" "}
                                            {blogPosts[1].author}
                                        </span>
                                        <span>{blogPosts[1].date}</span>
                                    </div>
                                    <h3 className="text-2xl font-cormorantGaramond font-semibold mb-2">
                                        {blogPosts[1].title}
                                    </h3>
                                    <p className="text-slate-600 font-lora text-base mb-6">
                                        {blogPosts[1].description}
                                    </p>
                                    <Button
                                        className="purple-reveal-btn px-8 py-3 font-cormorantGaramond text-base"
                                        size="lg"
                                    >
                                        <span>{blogPosts[1].button}</span>
                                    </Button>
                                </div>
                            </div>
                            {/* Bottom Card */}
                            <div className="bg-white shadow-sm flex flex-row">
                                <Image
                                    src={blogPosts[2].image}
                                    alt={blogPosts[2].title}
                                    width={600}
                                    height={140}
                                    className="object-cover w-1/2 "
                                />
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-primary-yellow-1 font-lora mb-2">
                                        <span className="flex justify-start items-center gap-2">
                                            <User size={20} />{" "}
                                            {blogPosts[2].author}
                                        </span>
                                        <span>{blogPosts[2].date}</span>
                                    </div>
                                    <h3 className="text-2xl font-cormorantGaramond font-semibold mb-2">
                                        {blogPosts[2].title}
                                    </h3>
                                    <p className="text-slate-600 font-lora text-base mb-6">
                                        {blogPosts[2].description}
                                    </p>
                                    <Button
                                        className="purple-reveal-btn px-8 py-3 font-cormorantGaramond text-base"
                                        size="lg"
                                    >
                                        <span>{blogPosts[2].button}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
