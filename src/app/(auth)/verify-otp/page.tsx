"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import backgroundImage from "@/assets/login/login-background.jpg";
import diamondImage from "@/assets/diamond.png";
import { ArrowLeft, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { verifyOtp } from "@/services/authServices";
import { toast } from "sonner";

const VerifyOtpContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [email, setEmail] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const emailParam = searchParams.get("email");
        if (emailParam) {
            setEmail(decodeURIComponent(emailParam));
        } else {
            toast.error("Email not found. Please register again.");
            router.push("/register");
        }
    }, [searchParams, router]);

    const handleOtpChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last character
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 4);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length; i++) {
            if (/^\d+$/.test(pastedData[i])) {
                newOtp[i] = pastedData[i];
            }
        }

        setOtp(newOtp);

        // Focus on the next empty input or the last one
        const nextEmptyIndex = newOtp.findIndex((val) => !val);
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus();
        } else {
            inputRefs.current[3]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const otpValue = otp.join("");

        if (otpValue.length !== 4) {
            toast.error("Please enter a 4-digit OTP");
            setIsLoading(false);
            return;
        }

        try {
            const response = await verifyOtp({
                email: email,
                otp: otpValue,
            });

            toast.success(response.message || "Email verified successfully!");

            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (error) {
            toast.error(error as string);
            // Clear OTP on error
            setOtp(["", "", "", ""]);
            inputRefs.current[0]?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        // You can implement resend OTP functionality here if your API supports it
        toast.info("Resend OTP functionality to be implemented");
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

                {/* Right Side: OTP Verification Form */}
                <div className="w-full max-w-[500px] bg-black/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    {/* Home Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-primary-yellow-1 hover:text-primary-yellow-2 transition-colors mb-8 text-sm font-bold tracking-wide group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 mt-1" />
                        Home
                    </Link>

                    <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 text-center mb-4 tracking-wide">
                        Verify Your Email
                    </h2>

                    <p className="text-center text-gray-300 font-lato text-sm mb-2">
                        We've sent a 4-digit OTP to
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <Mail className="h-4 w-4 text-primary-yellow-1" />
                        <p className="text-center text-primary-yellow-1 font-lato text-sm font-semibold">
                            {email}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* OTP Input */}
                        <div className="flex justify-center gap-3 md:gap-4">
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleOtpChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    disabled={isLoading}
                                    className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl md:text-3xl font-bold bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 rounded-lg"
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <Button
                            type="submit"
                            variant="ghost"
                            disabled={isLoading || otp.some((d) => !d)}
                            className="w-full h-auto py-3.5 rounded-lg uppercase tracking-wider text-xl gold-reveal-btn border-none hover:bg-transparent font-cormorantGaramond font-bold disabled:opacity-50"
                        >
                            <span className="text-primary-purple">
                                {isLoading ? "VERIFYING..." : "VERIFY OTP"}
                            </span>
                        </Button>
                    </form>

                    {/* Resend OTP */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-300 font-lato text-sm mb-2">
                            Didn't receive the code?
                        </p>
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={isLoading}
                            className="text-primary-yellow-1 hover:text-primary-yellow-2 transition-colors text-sm font-semibold disabled:opacity-50"
                        >
                            Resend OTP
                        </button>
                    </div>

                    <div className="mt-8 text-center text-base text-gray-300 font-cormorantGaramond">
                        Already verified?{" "}
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

const Page = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen w-full flex items-center justify-center bg-black">
                    <div className="text-primary-yellow-1 text-xl">
                        Loading...
                    </div>
                </div>
            }
        >
            <VerifyOtpContent />
        </Suspense>
    );
};

export default Page;
