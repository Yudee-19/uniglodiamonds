import BannerSection from "@/components/shared/BannerSection";
import React from "react";
import BannerImage from "@/assets/services/diamond-manufacturing/bannerNew.jpeg";
import ArticleLayout from "@/components/shared/ArticleLayout";

// Example images (replace with your actual paths)
import manufacturing1 from "@/assets/services/diamond-manufacturing/manufacturing1.jpeg";
import manufacturing2 from "@/assets/services/diamond-manufacturing/image-2.png";
import customDiamondImage from "@/assets/services/diamond-manufacturing/custom-diamond-manufacturing.png";
import whyChooseImage from "@/assets/services/diamond-manufacturing/image-3.png";
import contactUsImage from "@/assets/services/diamond-manufacturing/contact-us.jpg";
import Image from "next/image";

const page = () => {
    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text="Diamond Manufacturing"
                imageClassName="h-120 object-cover"
                textClassName="left-10 top-110  text-5xl"
            />

            <section className="max-w-7xl mx-auto px-4 py-20">
                <ArticleLayout
                    title="Diamond Manufacturing Services: Precision and Quality"
                    subtitle="Welcome"
                    paragraphs={[
                        "At Uniglo Diamonds, we offer premium diamond manufacturing services, transforming raw diamonds into stunning, high-quality stones. Our expert craftsmen use cutting-edge technology to ensure each diamond meets the highest standards of brilliance and precision.",
                        "Whether you need loose diamonds, custom cuts, or bulk orders, we provide tailored solutions to meet your unique needs.",
                    ]}
                    image={{
                        src: manufacturing1.src,
                        alt: "Diamond manufacturing process",
                    }}
                    reverse={false}
                    floatImages={false}
                />

                <ArticleLayout
                    title="Our Diamond Manufacturing Process"
                    subtitle="Welcome"
                    paragraphs={[
                        "We follow a meticulous process to ensure every diamond we manufacture is of the finest quality:",
                    ]}
                    bulletPoints={[
                        "Sourcing: We source rough diamonds from ethical, conflict-free suppliers.",
                        "Planning: Advanced 3D mapping helps us determine the best cut for maximum value and brilliance.",
                        "Cutting: Skilled artisans use precision tools to create a variety of cuts, including round, princess, and custom designs.",
                        "Polishing: Each diamond is polished to enhance its sparkle and luster.",
                        "Grading: All diamonds are graded according to the 4 Cs and certified by leading institutes such as GIA.",
                    ]}
                    image={{
                        src: manufacturing2.src,
                        alt: "Diamond grading and inspection",
                    }}
                    reverse={true}
                    floatImages={false}
                />
            </section>

            <section className="w-full bg-primary-purple-dark md:min-h-120 flex flex-col md:flex-row items-center justify-between   mb-16">
                <div className="md:w-1/2 w-full h-full flex flex-col justify-center z-10 px-8 py-10 md:py-0 md:pl-20 ">
                    <h2 className="text-primary-yellow-1 text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-6">
                        Custom Diamond Manufacturing
                    </h2>
                    <p className="text-white font-lora text-lg max-w-xl">
                        We offer bespoke services to bring your unique designs
                        to life. Whether you need custom cuts or bespoke
                        jewelry, our team will work with you to deliver exactly
                        what you envision. We also cater to bulk orders,
                        providing high-quality diamonds at competitive prices.
                    </p>
                </div>
                <div className="hidden  md:w-1/2 w-full h-full md:flex justify-end relative mt-10 md:mt-0">
                    <Image
                        src={customDiamondImage}
                        alt="Custom Diamond Manufacturing"
                        className="w-full md:h-120 h-full object-cover  shadow-lg"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-primary-purple-dark via-primary-purple-dark/80 to-transparent pointer-events-none" />
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-20">
                {/* Why Choose Uniglo Diamonds Section */}
                <ArticleLayout
                    title="Why Choose Uniglo Diamonds?"
                    subtitle="Welcome"
                    paragraphs={[]}
                    bulletPoints={[
                        "Expert Craftsmanship: Highly skilled artisans with years of experience.",
                        "Advanced Technology: We use the latest diamond-cutting tools and techniques.",
                        "Ethical Sourcing: All diamonds are responsibly sourced.",
                        "Certified Diamonds: Every diamond is GIA-certified, ensuring authenticity and quality.",
                        "Custom Solutions: We offer flexible manufacturing options to meet specific client needs.",
                    ]}
                    image={{
                        src: whyChooseImage.src,
                        alt: "Hand holding a rough diamond",
                    }}
                    reverse={true}
                    floatImages={false}
                />

                {/* Contact Us Today Section */}
                <div className="w-full mt-16 mb-10">
                    <div className="relative w-full h-[180px] md:h-[220px] rounded overflow-hidden flex items-center">
                        <Image
                            src={contactUsImage}
                            alt="Contact Us Today"
                            fill
                            className="object-cover"
                            style={{ zIndex: 1 }}
                        />
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        <div className="relative z-20 px-8 md:px-16">
                            <h2 className="text-white font-bold text-3xl md:text-4xl font-cormorantGaramond mb-4 mt-6">
                                Contact Us Today
                            </h2>
                            <p className="text-white/60 font-lora text-lg max-w-4xl">
                                Uniglo Diamonds is committed to delivering
                                high-quality diamonds with exceptional
                                craftsmanship.
                                <br />
                                Contact us today to discuss your diamond
                                manufacturing needs and receive a custom quote.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default page;
