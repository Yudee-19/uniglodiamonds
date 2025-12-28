"use client"; // Required for hooks (useState, useRouter)

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirection
import backgroundImage from "@/assets/login/login-background.jpg";
import diamondImage from "@/assets/diamond.png";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"; // Added Loader2 and AlertCircle
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/authServices";
import { useAuth } from "@/context/AuthContext";

const Page = () => {
    const router = useRouter();
    const { setUser } = useAuth();
    // 1. State Management
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 2. Input Change Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing again
        if (error) setError(null);
    };

    // 3. Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        setIsLoading(true);
        setError(null);

        try {
            // Call the service function
            const response = await loginUser(formData.email, formData.password);

            if (response.success) {
                setUser(response.data.user);
                router.push("/");
            }
        } catch (err: any) {
            // The service function throws the error string directly
            setError(err || "Login failed. Please try again.");
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
                        “Where Every Sparkle Tells a Story.”
                    </h1>
                    <p className="text-gray-300 font-lato text-sm md:text-base tracking-wide opacity-90">
                        Luxury crafted with emotion & elegance.
                    </p>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full max-w-[450px] bg-black/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    {/* Home Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-primary-yellow-1 hover:text-primary-yellow-2 transition-colors mb-8 text-sm font-bold tracking-wide group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 mt-1" />
                        Home
                    </Link>

                    <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 text-center mb-8 tracking-wide">
                        Welcome Back
                    </h2>

                    {/* Error Message Display */}
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-200 text-sm">
                            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div className="relative group">
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                                className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 pl-4 pr-10 rounded-lg"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                                className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 px-4 rounded-lg"
                            />
                        </div>

                        {/* Login Button with Loading State */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="ghost"
                            className="w-full h-auto py-3 rounded-lg shadow-lg mt-2 uppercase tracking-wider text-xl gold-reveal-btn border-none hover:bg-transparent font-cormorantGaramond font-bold disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-primary-purple">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>LOGGING IN...</span>
                                </div>
                            ) : (
                                <span className="text-primary-purple">
                                    LOGIN
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-lg text-gray-300 font-cormorantGaramond">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="text-primary-yellow-1 hover:text-primary-yellow-2 ml-1 transition-colors"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
