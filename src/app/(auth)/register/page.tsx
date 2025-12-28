import React from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/assets/login/login-background.jpg";
import diamondImage from "@/assets/diamond.png";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
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

                {/* Right Side: Register Form */}
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
                        Create Account
                    </h2>

                    <form className="space-y-5">
                        {/* Full Name Input */}
                        <div className="relative group">
                            <Input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 pl-4 pr-10 rounded-lg"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-100/80 pointer-events-none">
                                <User className="h-5 w-5 opacity-80" />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <Input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 pl-4 pr-10 rounded-lg"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-100/80 pointer-events-none">
                                <Mail className="h-5 w-5 opacity-80" />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <Input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 pl-4 pr-10 rounded-lg"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-100/80 pointer-events-none">
                                <Lock className="h-5 w-5 opacity-80" />
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative group">
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 pl-4 pr-10 rounded-lg"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-100/80 pointer-events-none">
                                <Lock className="h-5 w-5 opacity-80" />
                            </div>
                        </div>

                        {/* Register Button with Reveal Animation */}
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full h-auto py-3 rounded-lg shadow-lg mt-2 uppercase tracking-wider text-xl gold-reveal-btn border-none hover:bg-transparent font-cormorantGaramond font-bold"
                        >
                            <span className="text-primary-purple">
                                REGISTER
                            </span>
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-lg text-gray-300 font-cormorantGaramond">
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
