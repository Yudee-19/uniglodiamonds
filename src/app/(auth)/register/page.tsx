"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import backgroundImage from "@/assets/login/login-background.jpg";
import diamondImage from "@/assets/diamond.png";
import {
    ArrowLeft,
    User,
    Mail,
    Lock,
    Building2,
    Phone,
    MapPin,
    Globe,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/authServices";
import { toast } from "sonner";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Account Info
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",

        // Personal Info
        firstName: "",
        lastName: "",
        phoneNumber: "",
        countryCode: "+1",
        landlineNumber: "",

        // Address Info
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",

        // Business Info
        businessCompanyName: "",
        businessType: "",
        vatNumber: "",
        websiteUrl: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateStep1 = () => {
        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast.error("Please fill in all required fields");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }

        return true;
    };

    const validateStep2 = () => {
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.phoneNumber
        ) {
            toast.error("Please fill in all required personal information");
            return false;
        }
        return true;
    };

    const validateStep3 = () => {
        if (
            !formData.street ||
            !formData.city ||
            !formData.state ||
            !formData.postalCode ||
            !formData.country
        ) {
            toast.error("Please fill in all required address information");
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        } else if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
        } else if (currentStep === 3 && validateStep3()) {
            setCurrentStep(4);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const registrationData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                companyName: formData.companyName,
                customerData: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phoneNumber: formData.phoneNumber,
                    countryCode: formData.countryCode,
                    landlineNumber: formData.landlineNumber,
                    address: {
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        postalCode: formData.postalCode,
                        country: formData.country,
                    },
                    businessInfo: {
                        companyName: formData.businessCompanyName,
                        businessType: formData.businessType,
                        vatNumber: formData.vatNumber,
                        websiteUrl: formData.websiteUrl,
                    },
                },
            };

            const response = await registerUser(registrationData);

            toast.success(
                response.message ||
                    "Registration successful! Please verify your email.",
            );

            // Redirect to OTP verification page with email
            setTimeout(() => {
                router.push(
                    `/verify-otp?email=${encodeURIComponent(formData.email)}`,
                );
            }, 1500);
        } catch (error) {
            toast.error(error as string);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image */}
            <Image
                src={backgroundImage}
                alt="Background"
                fill
                className="object-cover z-0 opacity-90"
                priority
            />

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-32 w-full h-full py-10">
                {/* Left Side: Diamond & Quote */}
                <div className="flex flex-col items-center text-center max-w-lg">
                    <div className="relative w-48 h-48 md:w-72 md:h-72 mb-2 ">
                        <Image
                            src={diamondImage}
                            alt="Diamond"
                            fill
                            className="object-contain drop-shadow-2xl animate-subtle-float"
                        />
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorantGaramond font-bold text-primary-yellow-1 mb-4 leading-tight">
                        "Where Every Sparkle Tells a Story."
                    </h1>
                    <p className="text-gray-300 font-lato text-sm md:text-base tracking-wide opacity-90">
                        Luxury crafted with emotion & elegance.
                    </p>
                </div>

                {/* Right Side: Register Form */}
                <div className="w-full max-w-[500px] bg-black/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    {/* Home Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-primary-yellow-1 hover:text-primary-yellow-2 transition-colors mb-6 text-sm font-bold tracking-wide group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 mt-1" />
                        Home
                    </Link>

                    <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 text-center mb-2 tracking-wide">
                        Create Account
                    </h2>

                    {/* Progress Indicator */}
                    <div className="flex justify-center items-center gap-2 mb-6">
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`h-2 w-12 rounded-full transition-all ${
                                    step === currentStep
                                        ? "bg-primary-yellow-1"
                                        : step < currentStep
                                          ? "bg-primary-yellow-1/50"
                                          : "bg-white/20"
                                }`}
                            />
                        ))}
                    </div>

                    <p className="text-center text-sm text-gray-400 mb-6 font-lato">
                        Step {currentStep} of 4:{" "}
                        {currentStep === 1
                            ? "Account Details"
                            : currentStep === 2
                              ? "Personal Information"
                              : currentStep === 3
                                ? "Address Information"
                                : "Business Information"}
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Step 1: Account Info */}
                        {currentStep === 1 && (
                            <>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="Username *"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password *"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password *"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="companyName"
                                        placeholder="Company Name"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>
                            </>
                        )}

                        {/* Step 2: Personal Info */}
                        {currentStep === 2 && (
                            <>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name *"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name *"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <Input
                                        type="text"
                                        name="countryCode"
                                        placeholder="+1"
                                        value={formData.countryCode}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                    <div className="col-span-2 relative group">
                                        <Input
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="Phone Number *"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isLoading}
                                            className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                        />
                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="tel"
                                        name="landlineNumber"
                                        placeholder="Landline Number (Optional)"
                                        value={formData.landlineNumber}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>
                            </>
                        )}

                        {/* Step 3: Address Info */}
                        {currentStep === 3 && (
                            <>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="street"
                                        placeholder="Street Address *"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="text"
                                        name="city"
                                        placeholder="City *"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                    <Input
                                        type="text"
                                        name="state"
                                        placeholder="State *"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="text"
                                        name="postalCode"
                                        placeholder="Postal Code *"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                    <Input
                                        type="text"
                                        name="country"
                                        placeholder="Country *"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>
                            </>
                        )}

                        {/* Step 4: Business Info */}
                        {currentStep === 4 && (
                            <>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="businessCompanyName"
                                        placeholder="Business Company Name (Optional)"
                                        value={formData.businessCompanyName}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="businessType"
                                        placeholder="Business Type (e.g., Retail, Wholesale)"
                                        value={formData.businessType}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="vatNumber"
                                        placeholder="VAT Number (Optional)"
                                        value={formData.vatNumber}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="url"
                                        name="websiteUrl"
                                        placeholder="Website URL (Optional)"
                                        value={formData.websiteUrl}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Globe className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>
                            </>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-3 mt-6">
                            {currentStep > 1 && (
                                <Button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="flex-1 h-auto py-3 rounded-lg border-white/20 text-white hover:bg-white/10"
                                >
                                    Back
                                </Button>
                            )}

                            {currentStep < 4 ? (
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={isLoading}
                                    variant="ghost"
                                    className="flex-1 h-auto py-3 rounded-lg uppercase tracking-wider text-lg gold-reveal-btn border-none hover:bg-transparent font-cormorantGaramond font-bold"
                                >
                                    <span className="text-primary-purple">
                                        Next
                                    </span>
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    variant="ghost"
                                    className="flex-1 h-auto py-3 rounded-lg uppercase tracking-wider text-lg gold-reveal-btn border-none hover:bg-transparent font-cormorantGaramond font-bold disabled:opacity-50"
                                >
                                    <span className="text-primary-purple">
                                        {isLoading
                                            ? "REGISTERING..."
                                            : "REGISTER"}
                                    </span>
                                </Button>
                            )}
                        </div>
                    </form>

                    <div className="mt-6 text-center text-base text-gray-300 font-cormorantGaramond">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary-yellow-1 hover:text-primary-yellow-2 ml-1 transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
