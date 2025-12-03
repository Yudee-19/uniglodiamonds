import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/the-best-price-for-your-diamonds/banner1.png";
import React from "react";
import ArticleLayout from "@/components/shared/ArticleLayout";
import DiamondsBanner from "@/assets/services/the-best-price-for-your-diamonds/banner2.png";
import FedexImage from "@/assets/about/antwerp_1.jpg"; // Add your FedEx image path
import { Button } from "@/components/ui/button";
import SubFooter from "@/components/shared/SubFooter";

const page = () => {
    return (
        <div className="min-h-screen mt-40">
            <BannerSection
                image={BannerImage}
                text="The best price for your diamond"
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            {/* Article Section */}
            <section className=" max-w-7xl mx-auto px-10 mt-20">
                <ArticleLayout
                    title="Free Diamond Valuation and FedEx Shipping"
                    subtitle="Welcome"
                    paragraphs={[
                        "Uniglo Diamonds’ provides you with a step by step shipping process, which is secure and safe. We understand what it takes to securely transport diamonds, and therefore take the necessary measures. All our transactions are fully insured by Malca-Amit.",
                    ]}
                    bulletPoints={[
                        "Begin by filling out the form.",
                        "Once you do that, we give you a free estimation for your diamond(s) and arrange a free pickup from your desired location.",
                        "After having received your diamonds, we will examine them to determine a more accurate and final buying offer.",
                        "If you accept it, we will transfer the amount into your bank account, else we return your diamonds. You need not worry about the return shipping either, because we bear the expense for that also.",
                    ]}
                    image={{
                        src: FedexImage.src,
                        alt: "FedEx shipping diamond",
                    }}
                    reverse={false}
                    floatImages={true}
                />
                <div className="mt-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                    At Uniglo Diamonds, you can stay rest assured of receiving
                    the best value for your diamonds thanks to our experience of
                    over ten years in valuing and buying diamonds. We have
                    gained the expertise and knowledge needed to offer you the
                    highest prices for your diamonds. You can book an
                    appointment, free of change and without obligation, and
                    benefit from our trustworthy experts on your every
                    transaction.
                </div>
            </section>
            {/* Banner Section */}
            <section className="mt-16 max-w-7xl mx-auto px-4">
                <div className="relative w-full h-56 md:h-64">
                    <img
                        src={DiamondsBanner.src}
                        alt="Diamonds banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xl md:text-2xl font-lora text-center px-4 drop-shadow-lg">
                            To proceed with a free FedEx pick up and a free
                            appraisal, fill in our FedEx pick up request form.
                            Upon receiving it, we will respond with a
                            confirmation, along with further instructions.
                        </span>
                    </div>
                </div>
            </section>
            {/* Pickup Form */}
            <section className="mt-16 bg-brand-gradient">
                <div className=" max-w-7xl mx-auto px-4 rounded-lg p-10  shadow-lg">
                    <h2 className="text-white text-center text-2xl md:text-3xl font-cormorantGaramond mb-10">
                        To proceed with a free FedEx pick up and a free
                        appraisal, fill in our FedEx pick up request form. Upon
                        receiving it, we will respond with a confirmation, along
                        with further instructions.
                    </h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-primary mb-2 font-semibold font-lora">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="John"
                                className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label className=" font-lora block text-primary mb-2 font-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="John@gmail.com"
                                className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>
                        {/* Type */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block font-lora text-primary mb-2 font-semibold">
                                Type
                            </label>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-2 text-white">
                                    <input
                                        type="checkbox"
                                        className="accent-primary"
                                    />
                                    Private
                                </label>
                                <label className="flex items-center gap-2 text-white">
                                    <input
                                        type="checkbox"
                                        className="accent-primary"
                                    />
                                    Business
                                </label>
                            </div>
                        </div>
                        {/* Address */}
                        <div>
                            <label className="block font-lora text-primary mb-2 font-semibold">
                                Address
                            </label>
                            <input
                                type="text"
                                placeholder="User Address"
                                className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>
                        {/* City */}
                        <div>
                            <label className="block font-lora text-primary mb-2 font-semibold">
                                City
                            </label>
                            <input
                                type="text"
                                placeholder="Enter City Name"
                                className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>
                        {/* Country */}
                        <div>
                            <label className="block font-lora text-primary mb-2 font-semibold">
                                Country
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Country Name"
                                className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>
                        {/* Phone */}
                        <div>
                            <label className="block font-lora text-primary mb-2 font-semibold">
                                Phone
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Phone Number"
                                className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>
                        {/* Diamond Details */}
                        <div className="md:col-span-2">
                            <label className="block font-lora text-primary mb-2 font-semibold">
                                Diamond Details
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Diamond Details"
                                className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>
                        {/* Upload Button */}
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="button"
                                className="bg-primary text-white font-lora px-8 py-5 rounded-md text-lg w-full md:w-auto"
                            >
                                Please Upload Photos And/or Certificates
                            </button>
                        </div>
                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-start mt-2">
                            <Button
                                type="submit"
                                className="gold-reveal-btn bg-primary font-semibold px-8 py-3  text-base font-lora"
                            >
                                <span> SUBMIT NOW</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
