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
    FileText,
    CreditCard,
    Users,
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
        // Step 1: Account Info
        username: "",
        email: "",
        password: "",
        confirmPassword: "",

        // Step 2: Company Info
        companyName: "",
        contactName: "",
        currency: "USD",
        companyGroup: "",
        firmRegNo: "",
        defaultTerms: "",
        creditLimit: "",
        annualTarget: "",
        remarks: "",

        // Step 3: Personal Info
        firstName: "",
        lastName: "",
        phoneNumber: "",
        countryCode: "+91",
        landlineNumber: "",

        // Step 4: Address Info
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",

        // Step 5: Business Info
        businessCompanyName: "",
        businessType: "",
        vatNumber: "",
        websiteUrl: "",

        // Step 6: Billing Address
        billingPrintName: "",
        billingStreet: "",
        billingCity: "",
        billingState: "",
        billingCountry: "",
        billingZipCode: "",
        billingVatNo: "",
        billingGstnNo: "",

        // Step 7: Shipping Address
        sameAsBilling: false,
        shippingPrintName: "",
        shippingStreet: "",
        shippingCity: "",
        shippingState: "",
        shippingCountry: "",
        shippingZipCode: "",
        shippingVatNo: "",
        shippingGstnNo: "",

        // Step 8: Contact Details
        contactDetailName: "",
        designation: "",
        businessTel1: "",
        businessTel2: "",
        businessFax: "",
        mobileNo: "",
        personalNo: "",
        otherNo: "",
        contactEmail: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Auto-fill shipping address if "same as billing" is checked
        if (name === "sameAsBilling" && checked) {
            setFormData((prev) => ({
                ...prev,
                shippingPrintName: prev.billingPrintName,
                shippingStreet: prev.billingStreet,
                shippingCity: prev.billingCity,
                shippingState: prev.billingState,
                shippingCountry: prev.billingCountry,
                shippingZipCode: prev.billingZipCode,
                shippingVatNo: prev.billingVatNo,
                shippingGstnNo: prev.billingGstnNo,
            }));
        }
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
            !formData.companyName ||
            !formData.contactName ||
            !formData.currency
        ) {
            toast.error("Please fill in required company information");
            return false;
        }
        return true;
    };

    const validateStep3 = () => {
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

    const validateStep4 = () => {
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

    const validateStep5 = () => {
        // Business info is optional
        return true;
    };

    const validateStep6 = () => {
        if (
            !formData.billingStreet ||
            !formData.billingCity ||
            !formData.billingState ||
            !formData.billingZipCode ||
            !formData.billingCountry
        ) {
            toast.error(
                "Please fill in all required billing address information",
            );
            return false;
        }
        return true;
    };

    const validateStep7 = () => {
        if (!formData.sameAsBilling) {
            if (
                !formData.shippingStreet ||
                !formData.shippingCity ||
                !formData.shippingState ||
                !formData.shippingZipCode ||
                !formData.shippingCountry
            ) {
                toast.error(
                    "Please fill in all required shipping address information",
                );
                return false;
            }
        }
        return true;
    };

    const validateStep8 = () => {
        if (
            !formData.contactDetailName ||
            !formData.designation ||
            !formData.mobileNo ||
            !formData.contactEmail
        ) {
            toast.error("Please fill in required contact details");
            return false;
        }
        return true;
    };

    const handleNext = () => {
        let isValid = false;

        switch (currentStep) {
            case 1:
                isValid = validateStep1();
                break;
            case 2:
                isValid = validateStep2();
                break;
            case 3:
                isValid = validateStep3();
                break;
            case 4:
                isValid = validateStep4();
                break;
            case 5:
                isValid = validateStep5();
                break;
            case 6:
                isValid = validateStep6();
                break;
            case 7:
                isValid = validateStep7();
                break;
            case 8:
                isValid = validateStep8();
                break;
        }

        if (isValid && currentStep < 8) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateStep8()) {
            return;
        }

        setIsLoading(true);

        try {
            const registrationData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                companyName: formData.companyName,
                contactName: formData.contactName,
                currency: formData.currency,
                companyGroup: formData.companyGroup,
                firmRegNo: formData.firmRegNo,
                defaultTerms: formData.defaultTerms,
                creditLimit: formData.creditLimit,
                annualTarget: formData.annualTarget,
                remarks: formData.remarks,
                billingAddress: [
                    {
                        isDefault: "Y",
                        printName:
                            formData.billingPrintName || formData.companyName,
                        street: formData.billingStreet,
                        city: formData.billingCity,
                        state: formData.billingState,
                        country: formData.billingCountry,
                        zipCode: formData.billingZipCode,
                        vat_No: formData.billingVatNo,
                        gstn_No: formData.billingGstnNo,
                    },
                ],
                shippingAddress: [
                    {
                        isDefault: "Y",
                        printName:
                            formData.shippingPrintName || formData.companyName,
                        street: formData.shippingStreet,
                        city: formData.shippingCity,
                        state: formData.shippingState,
                        country: formData.shippingCountry,
                        zipCode: formData.shippingZipCode,
                        vat_No: formData.shippingVatNo,
                        gstn_No: formData.shippingGstnNo,
                    },
                ],
                contactDetail: {
                    contactName: formData.contactDetailName,
                    designation: formData.designation,
                    businessTel1: formData.businessTel1,
                    businessTel2: formData.businessTel2,
                    businessFax: formData.businessFax,
                    mobileNo: formData.mobileNo,
                    personalNo: formData.personalNo,
                    otherNo: formData.otherNo,
                    email: formData.contactEmail,
                },
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
                        companyName:
                            formData.businessCompanyName ||
                            formData.companyName,
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

    const totalSteps = 8;
    const stepTitles = [
        "Account Details",
        "Company Information",
        "Personal Information",
        "Address Information",
        "Business Information",
        "Billing Address",
        "Shipping Address",
        "Contact Details",
    ];

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
                    <div className="relative w-48 h-48 md:w-72 md:h-72 mb-2">
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
                    <div className="flex justify-center items-center gap-1 mb-6 overflow-x-auto">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-8 rounded-full transition-all ${
                                    index + 1 === currentStep
                                        ? "bg-primary-yellow-1 w-12"
                                        : index + 1 < currentStep
                                          ? "bg-primary-yellow-1/50"
                                          : "bg-white/20"
                                }`}
                            />
                        ))}
                    </div>

                    <p className="text-center text-sm text-gray-400 mb-6 font-lato">
                        Step {currentStep} of {totalSteps}:{" "}
                        {stepTitles[currentStep - 1]}
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
                            </>
                        )}

                        {/* Step 2: Company Info */}
                        {currentStep === 2 && (
                            <>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="companyName"
                                        placeholder="Company Name *"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="contactName"
                                        placeholder="Contact Name *"
                                        value={formData.contactName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="text"
                                        name="currency"
                                        placeholder="Currency *"
                                        value={formData.currency}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                    <Input
                                        type="text"
                                        name="companyGroup"
                                        placeholder="Company Group"
                                        value={formData.companyGroup}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="firmRegNo"
                                        placeholder="Firm Registration Number"
                                        value={formData.firmRegNo}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <FileText className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="defaultTerms"
                                        placeholder="Default Terms (e.g., Net 30)"
                                        value={formData.defaultTerms}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="text"
                                        name="creditLimit"
                                        placeholder="Credit Limit"
                                        value={formData.creditLimit}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                    <Input
                                        type="text"
                                        name="annualTarget"
                                        placeholder="Annual Target"
                                        value={formData.annualTarget}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="remarks"
                                        placeholder="Remarks (Optional)"
                                        value={formData.remarks}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>
                            </>
                        )}

                        {/* Step 3: Personal Info */}
                        {currentStep === 3 && (
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
                                        placeholder="+91"
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

                        {/* Step 4: Address Info */}
                        {currentStep === 4 && (
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

                        {/* Step 5: Business Info */}
                        {currentStep === 5 && (
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
                                    <FileText className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
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

                        {/* Step 6: Billing Address */}
                        {currentStep === 6 && (
                            <>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="billingPrintName"
                                        placeholder="Print Name (Optional)"
                                        value={formData.billingPrintName}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="billingStreet"
                                        placeholder="Billing Street Address *"
                                        value={formData.billingStreet}
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
                                        name="billingCity"
                                        placeholder="City *"
                                        value={formData.billingCity}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                    <Input
                                        type="text"
                                        name="billingState"
                                        placeholder="State *"
                                        value={formData.billingState}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="text"
                                        name="billingZipCode"
                                        placeholder="Zip Code *"
                                        value={formData.billingZipCode}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                    <Input
                                        type="text"
                                        name="billingCountry"
                                        placeholder="Country *"
                                        value={formData.billingCountry}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="text"
                                        name="billingVatNo"
                                        placeholder="VAT No (Optional)"
                                        value={formData.billingVatNo}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                    <Input
                                        type="text"
                                        name="billingGstnNo"
                                        placeholder="GSTN No (Optional)"
                                        value={formData.billingGstnNo}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>
                            </>
                        )}

                        {/* Step 7: Shipping Address */}
                        {currentStep === 7 && (
                            <>
                                <div className="flex items-center gap-3 mb-4">
                                    <input
                                        type="checkbox"
                                        name="sameAsBilling"
                                        checked={formData.sameAsBilling}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-4 h-4 text-primary-yellow-1 bg-white/10 border-white/20 rounded focus:ring-primary-yellow-1"
                                    />
                                    <label className="text-sm text-gray-300 font-lato">
                                        Same as Billing Address
                                    </label>
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="shippingPrintName"
                                        placeholder="Print Name (Optional)"
                                        value={formData.shippingPrintName}
                                        onChange={handleInputChange}
                                        disabled={
                                            isLoading || formData.sameAsBilling
                                        }
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg disabled:opacity-50"
                                    />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="shippingStreet"
                                        placeholder="Shipping Street Address *"
                                        value={formData.shippingStreet}
                                        onChange={handleInputChange}
                                        required
                                        disabled={
                                            isLoading || formData.sameAsBilling
                                        }
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg disabled:opacity-50"
                                    />
                                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="text"
                                        name="shippingCity"
                                        placeholder="City *"
                                        value={formData.shippingCity}
                                        onChange={handleInputChange}
                                        required
                                        disabled={
                                            isLoading || formData.sameAsBilling
                                        }
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg disabled:opacity-50"
                                    />
                                    <Input
                                        type="text"
                                        name="shippingState"
                                        placeholder="State *"
                                        value={formData.shippingState}
                                        onChange={handleInputChange}
                                        required
                                        disabled={
                                            isLoading || formData.sameAsBilling
                                        }
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg disabled:opacity-50"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="text"
                                        name="shippingZipCode"
                                        placeholder="Zip Code *"
                                        value={formData.shippingZipCode}
                                        onChange={handleInputChange}
                                        required
                                        disabled={
                                            isLoading || formData.sameAsBilling
                                        }
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg disabled:opacity-50"
                                    />
                                    <Input
                                        type="text"
                                        name="shippingCountry"
                                        placeholder="Country *"
                                        value={formData.shippingCountry}
                                        onChange={handleInputChange}
                                        required
                                        disabled={
                                            isLoading || formData.sameAsBilling
                                        }
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg disabled:opacity-50"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="text"
                                        name="shippingVatNo"
                                        placeholder="VAT No (Optional)"
                                        value={formData.shippingVatNo}
                                        onChange={handleInputChange}
                                        disabled={
                                            isLoading || formData.sameAsBilling
                                        }
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg disabled:opacity-50"
                                    />
                                    <Input
                                        type="text"
                                        name="shippingGstnNo"
                                        placeholder="GSTN No (Optional)"
                                        value={formData.shippingGstnNo}
                                        onChange={handleInputChange}
                                        disabled={
                                            isLoading || formData.sameAsBilling
                                        }
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg disabled:opacity-50"
                                    />
                                </div>
                            </>
                        )}

                        {/* Step 8: Contact Details */}
                        {currentStep === 8 && (
                            <>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="contactDetailName"
                                        placeholder="Contact Name *"
                                        value={formData.contactDetailName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Users className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="text"
                                        name="designation"
                                        placeholder="Designation *"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="tel"
                                        name="businessTel1"
                                        placeholder="Business Tel 1"
                                        value={formData.businessTel1}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                    <Input
                                        type="tel"
                                        name="businessTel2"
                                        placeholder="Business Tel 2"
                                        value={formData.businessTel2}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="tel"
                                        name="businessFax"
                                        placeholder="Business Fax"
                                        value={formData.businessFax}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative group">
                                        <Input
                                            type="tel"
                                            name="mobileNo"
                                            placeholder="Mobile No *"
                                            value={formData.mobileNo}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isLoading}
                                            className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                        />
                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
                                    </div>
                                    <Input
                                        type="tel"
                                        name="personalNo"
                                        placeholder="Personal No"
                                        value={formData.personalNo}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="tel"
                                        name="otherNo"
                                        placeholder="Other No (Optional)"
                                        value={formData.otherNo}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                    />
                                </div>

                                <div className="relative group">
                                    <Input
                                        type="email"
                                        name="contactEmail"
                                        placeholder="Contact Email *"
                                        value={formData.contactEmail}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                    />
                                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-100/80" />
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

                            {currentStep < totalSteps ? (
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
