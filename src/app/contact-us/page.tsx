"use client";

import React, { useState } from "react";
import Image from "next/image";
import BannerSection from "@/components/shared/BannerSection";
import {
    Map,
    MapMarker,
    MarkerContent,
    MapControls,
} from "@/components/ui/map";
import bannerImage from "@/assets/banner_2.jpg";
import contactImage1 from "@/assets/contact-us/contact-1.webp";
import contactImage2 from "@/assets//contact-us/contact-3.png";

// Icons
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Page = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add your form submission logic here
    };

    // Hoveniersstraat 30, 2018 Antwerpen coordinates
    const officeCoordinates: [number, number] = [4.41857, 51.215235];

    return (
        <div className="w-full">
            {/* Banner Section */}
            <BannerSection
                image={bannerImage}
                text="CONTACT US"
                textClassName="text-xl md::text-5xl lg:text-7xl font-bold"
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex  flex-col">
                        {/* Header Section */}
                        <div className="text-left mb-1">
                            <p className="text-primary text-lg mb-2 font-cormorantGaramond">
                                GET IN TOUCH
                            </p>
                            <h1 className="text-5xl md:text-6xl font-cormorantGaramond font-bold text-foreground mb-6 text-left">
                                Contact Us
                            </h1>
                        </div>

                        {/* Contact Methods */}
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {/* Email Support */}
                            <div className="bg-primary/5 p-8 text-center hover:shadow-lg transition-shadow flex flex-col items-start">
                                <div className="w-16 h-16 bg-primary  mb-4 flex items-center justify-center">
                                    <Mail className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-cormorantGaramond font-semibold mb-3">
                                    Email Support
                                </h3>
                                <p className="text-slate-600 mb-4 text-sm font-cormorantGaramond text-left">
                                    Reach out to us email for any inquiries or
                                    support. Our team responds within 24 hours.
                                </p>
                            </div>

                            {/* Call Us */}
                            <div className="bg-primary/5 p-8 text-center hover:shadow-lg transition-shadow flex flex-col items-start">
                                <div className="w-16 h-16 bg-primary  mb-4 flex items-center justify-center">
                                    <Phone className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-cormorantGaramond font-semibold mb-3">
                                    Call Us
                                </h3>
                                <p className="text-slate-600 mb-4 text-sm font-cormorantGaramond text-left">
                                    Contact our friendly team for phone for
                                    immediate assistance anytime or to book an
                                    appointment.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Images */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                            <Image
                                src={contactImage1}
                                alt="Customer Support"
                                className="object-cover aspect-square lg:aspect-auto"
                            />
                        </div>
                        <div>
                            <Image
                                src={contactImage2}
                                alt="Diamond Display"
                                className="object-cover aspect-square lg:aspect-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Form and Image Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Get in Touch Form */}
                    <div className="bg-[#f7f8fa] p-8 lg:p-12">
                        <h2 className="text-4xl font-cormorantGaramond font-semibold mb-8">
                            Get in Touch
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-lato"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-lato"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-lato"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 border border-slate-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none font-lato"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="gold-reveal-btn w-full py-4 text-primary font-bold text-lg transition-all duration-300"
                            >
                                <span>SEND MESSAGE</span>
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Information Box */}
                        <div className="bg-[#f7f8fa] p-8">
                            <h3 className="text-3xl font-cormorantGaramond font-semibold mb-6 underline">
                                Contact Information
                            </h3>

                            {/* Address */}
                            <div className="flex gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-2 font-cormorantGaramond">
                                        Dalila Diamonds
                                    </h4>
                                    <p className="text-slate-700 text-lg font-lora">
                                        Shivraq O. Gandhi
                                        <br />
                                        Hoveniersstraat 30, Bus 105
                                        <br />
                                        Suite 326, 2018 Antwerpen
                                        <br />
                                        BTW BE: 0750.471.230
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-2 font-cormorantGaramond">
                                        Landline: +32 3 453 94 74
                                    </h4>
                                    <p className="text-slate-700 text-lg font-lora">
                                        Phone: +32 487 93 93 51
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <a
                                        href="mailto:business@daliladiamonds.com"
                                        className="text-slate-700 text-lg hover:text-primary transition font-lora"
                                    >
                                        business@daliladiamonds.com
                                    </a>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-2 font-cormorantGaramond">
                                        Mon - Fri: 9:00 AM - 5:00 PM
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full h-[500px] relative border border-slate-200">
                    <Map center={officeCoordinates} zoom={15} theme="light">
                        <MapControls
                            position="bottom-right"
                            showZoom
                            showFullscreen
                        />
                        <MapMarker
                            longitude={officeCoordinates[0]}
                            latitude={officeCoordinates[1]}
                        >
                            <MarkerContent>
                                <div className="relative">
                                    <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse" />
                                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-2 rounded shadow-lg border border-slate-200">
                                        <p className="font-bold text-sm font-cormorantGaramond">
                                            Uniglo Diamonds
                                        </p>
                                        <p className="text-xs text-slate-600 font-lato">
                                            Hoveniersstraat 30
                                        </p>
                                    </div>
                                </div>
                            </MarkerContent>
                        </MapMarker>
                    </Map>
                </div>
            </div>
        </div>
    );
};

export default Page;
