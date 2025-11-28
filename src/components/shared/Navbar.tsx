"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import {
    Phone,
    Mail,
    Clock,
    Facebook,
    Twitter,
    Instagram,
    ChevronDown,
    Menu,
    X,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/assets/Uniglo-Logo-Horizontal1.png";
import { sub } from "motion/react-client";

const NAV_LINKS = [
    { name: "About", href: "#" },
    {
        name: "Buy Diamonds",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            { name: "Round Cut", href: "#" },
            { name: "Princess Cut", href: "#" },
            { name: "Oval Cut", href: "#" },
        ],
    },
    { name: "Sell Diamonds", href: "#" },
    {
        name: "Services",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            { name: "Diamond", href: "#" },
            { name: "Manufacturing", href: "#" },
            { name: "Security Seals", href: "#" },
            { name: "Partners", href: "#" },
        ],
    },
    {
        name: "Education",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            { name: "Diamond 4C's", href: "#" },
            { name: "Certificates", href: "#" },
            { name: "Diamond Shapes", href: "#" },
        ],
    },
    { name: "Blog", href: "#" },
    {
        name: "Guides",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            { name: "Investment Guide", href: "#" },
            { name: "Buying Guide", href: "#" },
            { name: "Size Guide", href: "#" },
        ],
    },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

    // 2. Listen to scroll changes using the Motion hook (Replacing native event listener)
    useMotionValueEvent(scrollY, "change", (latest: number) => {
        if (latest > lastScrollY) {
            // Scrolling down, retract navbar
            setIsScrolled(true);
        } else if (latest < lastScrollY) {
            // Scrolling up, show navbar
            setIsScrolled(false);
        }
        setLastScrollY(latest);
    });

    return (
        <>
            {/* --- HEADER SECTION --- */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-2xl`}
            >
                <motion.div
                    initial={false}
                    animate={{
                        height: isScrolled ? 0 : "auto",
                        opacity: isScrolled ? 1 : 1,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} // Smooth cubic-bezier
                    className="overflow-hidden  border-b border-slate-800"
                >
                    {/* TOP BAR: Info & Socials */}
                    <div className="bg-primary-blue-2 px-4 md:px-8 py-2 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-sm text-slate-400 border-b border-slate-800/50 font-lora">
                        <div className="container mx-auto  flex justify-between">
                            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                                <span className="flex items-center gap-1 text-white/70 cursor-pointer transition-colors">
                                    <Phone
                                        size={12}
                                        className={"text-primary"}
                                    />{" "}
                                    +32 473 565 758
                                </span>
                                <span className="flex items-center gap-1 text-white/70 cursor-pointer transition-colors">
                                    <Mail
                                        size={12}
                                        className={"text-primary"}
                                    />{" "}
                                    suraj@uniglodiamonds.com
                                </span>
                                <span className="hidden md:flex items-center gap-1 text-white/70">
                                    <Clock
                                        size={12}
                                        className={"text-primary"}
                                    />{" "}
                                    Mon-Fri: 10:00-18:00
                                </span>
                            </div>
                            <div className="flex gap-4 mt-2 md:mt-0">
                                <Facebook
                                    size={12}
                                    className="hover:text-[#c5a059] cursor-pointer transition-colors"
                                />
                                <Twitter
                                    size={12}
                                    className="hover:text-[#c5a059] cursor-pointer transition-colors"
                                />
                                <Instagram
                                    size={12}
                                    className="hover:text-[#c5a059] cursor-pointer transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BRAND BAR: Logo & Primary Buttons */}
                    <div className=" px-4 md:px-8 py-2 bg-primary-blue-1 border-b border-white/70">
                        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Left Actions */}
                            <div className="hidden md:flex gap-3 w-1/3">
                                <Button className="gold-reveal-btn  font-cormorantGaramond uppercase">
                                    <span>Inventory</span>
                                </Button>
                                <Button className="gold-reveal-btn font-cormorantGaramond uppercase">
                                    <span>Contact</span>
                                </Button>
                            </div>

                            {/* Center Logo */}
                            <div className="w-full md:w-1/3 flex justify-center items-center gap-3">
                                {/* Logo Icon Mock */}
                                <Image
                                    src={logo}
                                    alt="Uniglo Logo"
                                    width={350}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>

                            {/* Right Actions */}
                            <div className="hidden md:flex gap-3 w-1/3 justify-end">
                                <Button className="gold-reveal-btn font-cormorantGaramond uppercase">
                                    <span>Login</span>
                                </Button>
                                <Button className="gold-reveal-btn font-cormorantGaramond uppercase">
                                    <span>Signup</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* NAV BAR 
            This stays visible always.
        */}
                <nav
                    className={`bg-primary-blue-1 w-full border-b border-white/10 relative z-50 transition-colors duration-300`}
                >
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="flex justify-between md:justify-center items-center h-14">
                            {/* Mobile Menu Toggle (Visible only on small screens) */}
                            <div className="md:hidden flex items-center gap-4 w-full justify-between">
                                {/* When scrolled, we might want to show a mini logo on mobile, otherwise just text */}
                                <span className="font-serif text-lg text-white">
                                    UNIGLO
                                </span>
                                <button
                                    onClick={() =>
                                        setIsMobileMenuOpen(!isMobileMenuOpen)
                                    }
                                    className="text-white"
                                >
                                    {isMobileMenuOpen ? <X /> : <Menu />}
                                </button>
                            </div>

                            {/* Desktop Links */}
                            <ul className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-slate-300">
                                {NAV_LINKS.map((link) => (
                                    <li
                                        key={link.name}
                                        className="group relative py-4 cursor-pointer"
                                    >
                                        <a
                                            href={link.href}
                                            className="flex items-center gap-1 font-cormorantGaramond text-sm "
                                        >
                                            {link.name}
                                            {link.hasDropdown && (
                                                <ChevronDown
                                                    size={10}
                                                    className="group-hover:rotate-180 transition-transform duration-300"
                                                />
                                            )}
                                        </a>

                                        {/* Mock Dropdown */}
                                        {link.hasDropdown && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-48 bg-white border-t-2 border-[#c5a059] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl transform group-hover:translate-y-0 translate-y-2">
                                                <div className=" flex flex-col  text-black font-cormorantGaramond text-base normal-case tracking-normal ">
                                                    {link.submenuItems?.map(
                                                        (submenu) => (
                                                            <a
                                                                key={
                                                                    submenu.name
                                                                }
                                                                href={
                                                                    submenu.href
                                                                }
                                                                className="p-3 slide-down-link"
                                                            >
                                                                <span>
                                                                    {
                                                                        submenu.name
                                                                    }
                                                                </span>
                                                            </a>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Mobile Menu Drawer */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden"
                            >
                                <div className="flex flex-col p-4 gap-4">
                                    {NAV_LINKS.map((link) => (
                                        <a
                                            key={link.name}
                                            href="#"
                                            className="text-slate-300 text-sm uppercase tracking-wider py-2 border-b border-slate-800"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                    <div className="flex gap-2 mt-4">
                                        <button className="flex-1 py-3 bg-[#c5a059] text-black text-xs font-bold uppercase">
                                            Inventory
                                        </button>
                                        <button className="flex-1 py-3 border border-slate-600 text-white text-xs font-bold uppercase">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>
        </>
    );
}
