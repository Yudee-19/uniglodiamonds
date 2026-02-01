"use client";

import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/the-best-price-for-your-diamonds/bannerNew.jpeg";
import React, { useState } from "react";
import ArticleLayout from "@/components/shared/ArticleLayout";
import DiamondsBanner from "@/assets/services/the-best-price-for-your-diamonds/banner2.png";
import FedexImage from "@/assets/services/the-best-price-for-your-diamonds/fedex.jpg";
import { Button } from "@/components/ui/button";
import SubFooter from "@/components/shared/SubFooter";
import { submitInquiryForm, InquiryFormData } from "@/services/inquiryService";
import FileUploader from "@/components/shared/FileUploader";

const page = () => {
    const [formData, setFormData] = useState<InquiryFormData>({
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        type: "private",
        city: "",
        country: "",
        diamondDetails: "",
        images: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (type: "private" | "business") => {
        setFormData((prev) => ({ ...prev, type }));
    };

    const handleFilesChange = (files: File[]) => {
        setFormData((prev) => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        try {
            await submitInquiryForm(formData);
            setSubmitStatus({
                type: "success",
                message:
                    "Form submitted successfully! We will contact you soon.",
            });
            // Reset form
            setFormData({
                name: "",
                email: "",
                address: "",
                phoneNumber: "",
                type: "private",
                city: "",
                country: "",
                diamondDetails: "",
                images: [],
            });
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: "Failed to submit form. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text="The best price for your diamond"
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-120 object-cover"
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
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-primary mb-2 font-semibold font-lora">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="John"
                                required
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
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="John@gmail.com"
                                required
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
                                        checked={formData.type === "private"}
                                        onChange={() =>
                                            handleTypeChange("private")
                                        }
                                        className="accent-primary"
                                    />
                                    Private
                                </label>
                                <label className="flex items-center gap-2 text-white">
                                    <input
                                        type="checkbox"
                                        checked={formData.type === "business"}
                                        onChange={() =>
                                            handleTypeChange("business")
                                        }
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
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="User Address"
                                required
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
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Enter City Name"
                                required
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
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="Enter Country Name"
                                required
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
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Enter Phone Number"
                                required
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
                                name="diamondDetails"
                                value={formData.diamondDetails}
                                onChange={handleInputChange}
                                placeholder="Enter Diamond Details"
                                required
                                className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>

                        {/* File Uploader */}
                        <div className="md:col-span-2">
                            <FileUploader
                                files={formData.images || []}
                                onFilesChange={handleFilesChange}
                            />
                        </div>

                        {/* Status Message */}
                        {submitStatus.type && (
                            <div className="md:col-span-2">
                                <p
                                    className={`text-center ${
                                        submitStatus.type === "success"
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {submitStatus.message}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-start mt-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="gold-reveal-btn bg-primary font-semibold px-8 py-3  text-base font-lora disabled:opacity-50"
                            >
                                <span>
                                    {isSubmitting
                                        ? "SUBMITTING..."
                                        : "SUBMIT NOW"}
                                </span>
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
