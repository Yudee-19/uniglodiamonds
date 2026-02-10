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
    UserIcon,
    LogOut,
    ShoppingCart,
    Users,
    FileStack,
    Shield,
    FormInputIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/assets/Uniglo-Logo-Horizontal1.png";
import logoIcon from "@/../public/logo/logo.png";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
    { name: "About", href: "/about" },
    { name: "Sell Diamonds", href: "/sell-your-diamonds" },
    {
        name: "Services",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            { name: "Diamond Manufacturing", href: "/diamond-manufacturing" },
            {
                name: "Free diamond estimation",
                href: "/the-best-price-for-your-diamonds",
            },
            {
                name: "Diamond Financing Options",
                href: "/diamond-financing-options",
            },
            { name: "Investment Diamonds", href: "/investment-diamonds" },
            { name: "Partners", href: "/partners" },
        ],
    },
    {
        name: "Education",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            {
                name: "Supply Chain Policy & Procedure",
                href: "/supply-chain-policy-procedure",
            },
            { name: "Diamond 4C's", href: "/the-diamond-4cs" },
            { name: "Diamond Certificates", href: "/diamond-certificates" },
            { name: "Diamond Shapes", href: "/diamond-shapes" },
            { name: "Fancy Colored Diamond", href: "/fancy-colored-diamonds" },
            { name: "Ethical Diamond", href: "/ethical-diamonds" },
            { name: "Conflict Free Diamond", href: "/conflict-free-diamonds" },
            { name: "Security Seals", href: "/security-seals" },
            { name: "Old Cut Diamonds", href: "/old-cut-diamonds" },
        ],
    },
    { name: "Blog", href: "/blogs" },
];

const ADMIN_NAV_LINKS = [
    { name: "Members Management", href: "/members-management", icon: Users },
    {
        name: "Enquiry Management",
        href: "/enquiry-management",
        icon: FileStack,
    },
    {
        name: "Sell Diamonds Requests",
        href: "/sell-diamonds-requests",
        icon: FormInputIcon,
    },
    { name: "My Profile", href: "/profile", icon: UserIcon },
];

const SUPER_ADMIN_NAV_LINKS = [
    { name: "Members Management", href: "/members-management", icon: Users },
    {
        name: "Enquiry Management",
        href: "/enquiry-management",
        icon: FileStack,
    },
    { name: "Admin Management", href: "/admin-management", icon: Shield },
    {
        name: "Sell Diamonds Requests",
        href: "/sell-diamonds-form-requests",
        icon: FormInputIcon,
    },
    { name: "My Profile", href: "/profile", icon: UserIcon },
];

const USER_NAV_LINKS = [
    { name: "My Cart", href: "/cart", icon: ShoppingCart },
    { name: "My Enquiries", href: "/enquiries", icon: FileStack },
    { name: "My Profile", href: "/profile", icon: UserIcon },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
        null,
    );
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);
    const { user, logout, isAuthenticated, loading } = useAuth();

    // Get role-specific nav links
    const getRoleNavLinks = () => {
        if (!user) return [];
        if (user.role === "SUPER_ADMIN") return SUPER_ADMIN_NAV_LINKS;
        if (user.role === "ADMIN") return ADMIN_NAV_LINKS;
        if (user.role === "USER") return USER_NAV_LINKS;
        return [];
    };

    useMotionValueEvent(scrollY, "change", (latest: number) => {
        if (latest > lastScrollY) {
            setIsScrolled(true);
        } else if (latest < lastScrollY) {
            setIsScrolled(false);
        }
        setLastScrollY(latest);
    });

    const roleNavLinks = getRoleNavLinks();

    const toggleMobileDropdown = (linkName: string) => {
        setMobileDropdownOpen(
            mobileDropdownOpen === linkName ? null : linkName,
        );
    };

    return (
        <>
            {/* --- HEADER SECTION --- */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-2xl `}
            >
                <motion.div
                    initial={false}
                    animate={{
                        height: isScrolled ? 0 : "auto",
                        opacity: isScrolled ? 1 : 1,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="border-b border-slate-800 hidden md:block"
                >
                    {/* BRAND BAR: Logo & Primary Buttons */}
                    <div className="px-4 lg:px-8 py-4 bg-brand-gradient border-b border-white/70">
                        <div className="lg:container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Left Actions */}
                            <div className="hidden md:flex gap-3 lg:w-1/3 w-fit">
                                {loading ? (
                                    <>
                                        <div className="h-10 w-32 bg-gray-200/50 animate-pulse " />
                                        <div className="h-10 w-24 bg-gray-200/50 animate-pulse " />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase"
                                        >
                                            <Link href="/inventory">
                                                <span>Inventory</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase"
                                        >
                                            <Link href="/contact-us">
                                                <span>Contact</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                            {/* Center Logo */}
                            <div className="w-full md:w-1/3 flex justify-center items-center gap-3">
                                <Link href="/">
                                    <Image
                                        src={logo}
                                        alt="Uniglo Logo"
                                        width={350}
                                        height={100}
                                        className="object-contain"
                                    />
                                </Link>
                            </div>
                            {/* Right Actions */}
                            <div className="hidden md:flex gap-3 w-1/3 justify-end">
                                {loading ? (
                                    <>
                                        <div className="h-10 w-32 bg-gray-200/50 animate-pulse " />
                                        <div className="h-10 w-24 bg-gray-200/50 animate-pulse " />
                                    </>
                                ) : isAuthenticated && user ? (
                                    <>
                                        {/* Profile Button with Dropdown */}
                                        <div className="relative group">
                                            <Button className="gold-reveal-btn font-cormorantGaramond uppercase flex items-center gap-2">
                                                <span className="flex items-center gap-1">
                                                    <UserIcon size={16} />
                                                    <span>{user.username}</span>
                                                    <ChevronDown
                                                        size={14}
                                                        className="group-hover:rotate-180 transition-transform duration-300"
                                                    />
                                                </span>
                                            </Button>

                                            {/* Dropdown Menu */}
                                            {roleNavLinks.length > 0 && (
                                                <div className="absolute top-full right-0 mt-0 w-56 bg-white border-t-2 border-[#c5a059] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl transform group-hover:translate-y-0 translate-y-2 z-60">
                                                    <div className="flex flex-col text-black font-cormorantGaramond text-base normal-case tracking-normal">
                                                        {roleNavLinks.map(
                                                            (link) => (
                                                                <Link
                                                                    key={
                                                                        link.name
                                                                    }
                                                                    href={
                                                                        link.href
                                                                    }
                                                                    className="p-3 slide-down-link flex items-center gap-2"
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        {link.icon && (
                                                                            <link.icon
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        )}
                                                                        {
                                                                            link.name
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            ),
                                                        )}
                                                        <div className="border-t border-gray-200"></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <Button
                                            onClick={logout}
                                            className="gold-reveal-btn font-cormorantGaramond uppercase flex items-center gap-2"
                                        >
                                            <span className="flex items-center gap-1">
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </span>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase"
                                        >
                                            <Link href="/login">
                                                <span>Login</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase"
                                        >
                                            <Link href="/register">
                                                <span>Signup</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* NAV BAR */}
                <nav
                    className={`bg-brand-gradient py-3 w-full border-b border-white/10 relative z-50 transition-colors duration-300 `}
                >
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="flex justify-between md:justify-center items-center h-14">
                            {/* Mobile Menu Toggle */}
                            <div className="md:hidden flex items-center gap-4 w-full justify-between">
                                <Link
                                    href="/"
                                    className="font-serif text-2xl text-white flex items-center gap-2"
                                >
                                    <Image
                                        src={logoIcon}
                                        alt="Uniglo Logo"
                                        width={40}
                                        height={50}
                                        className="object-contain"
                                    />
                                    UNIGLO
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(!isMobileMenuOpen);
                                        setMobileDropdownOpen(null);
                                    }}
                                    className="text-white z-50"
                                >
                                    {isMobileMenuOpen ? (
                                        <X size={28} />
                                    ) : (
                                        <Menu size={28} />
                                    )}
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
                                            className="flex items-center gap-1 font-cormorantGaramond text-lg text-primary font-bold "
                                        >
                                            {link.name}
                                            {link.hasDropdown && (
                                                <ChevronDown
                                                    size={10}
                                                    className="group-hover:rotate-180 transition-transform duration-300"
                                                />
                                            )}
                                        </a>

                                        {/* Desktop Dropdown */}
                                        {link.hasDropdown && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-48 bg-white border-t-2 border-[#c5a059] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl transform group-hover:translate-y-0 translate-y-2">
                                                <div className="flex flex-col text-black font-cormorantGaramond text-base normal-case tracking-normal ">
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
                                                        ),
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
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden absolute top-full left-0 right-0 max-h-[calc(100vh-80px)] overflow-y-auto"
                            >
                                <div className="flex flex-col p-4 gap-2">
                                    {/* Navigation Links */}
                                    {NAV_LINKS.map((link) => (
                                        <div key={link.name}>
                                            {link.hasDropdown ? (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            toggleMobileDropdown(
                                                                link.name,
                                                            )
                                                        }
                                                        className="w-full text-left text-primary text-base uppercase tracking-wider py-3 border-b border-slate-800 font-cormorantGaramond font-bold flex justify-between items-center"
                                                    >
                                                        {link.name}
                                                        <ChevronDown
                                                            size={16}
                                                            className={`transition-transform duration-300 ${
                                                                mobileDropdownOpen ===
                                                                link.name
                                                                    ? "rotate-180"
                                                                    : ""
                                                            }`}
                                                        />
                                                    </button>
                                                    <AnimatePresence>
                                                        {mobileDropdownOpen ===
                                                            link.name && (
                                                            <motion.div
                                                                initial={{
                                                                    height: 0,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    height: "auto",
                                                                    opacity: 1,
                                                                }}
                                                                exit={{
                                                                    height: 0,
                                                                    opacity: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.2,
                                                                }}
                                                                className="overflow-hidden bg-slate-800/50"
                                                            >
                                                                {link.submenuItems?.map(
                                                                    (
                                                                        submenu,
                                                                    ) => (
                                                                        <Link
                                                                            key={
                                                                                submenu.name
                                                                            }
                                                                            href={
                                                                                submenu.href
                                                                            }
                                                                            className="block text-slate-300 text-sm py-2 px-6 font-cormorantGaramond hover:text-primary transition-colors"
                                                                            onClick={() => {
                                                                                setIsMobileMenuOpen(
                                                                                    false,
                                                                                );
                                                                                setMobileDropdownOpen(
                                                                                    null,
                                                                                );
                                                                            }}
                                                                        >
                                                                            {
                                                                                submenu.name
                                                                            }
                                                                        </Link>
                                                                    ),
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="block text-primary text-base uppercase tracking-wider py-3 border-b border-slate-800 font-cormorantGaramond font-bold"
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </div>
                                    ))}

                                    {/* Role-specific links for mobile */}
                                    {isAuthenticated &&
                                        roleNavLinks.length > 0 && (
                                            <div className="border-t border-slate-700 pt-2 mt-2">
                                                <p className="text-primary text-xs uppercase px-2 mb-2 font-cormorantGaramond">
                                                    My Account
                                                </p>
                                                {roleNavLinks.map((link) => (
                                                    <Link
                                                        key={link.name}
                                                        href={link.href}
                                                        className="text-slate-300 text-sm uppercase tracking-wider py-2 border-b border-slate-800 font-cormorantGaramond flex items-center gap-2"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        {link.icon && (
                                                            <link.icon
                                                                size={16}
                                                            />
                                                        )}
                                                        {link.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-700">
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase w-full py-6 text-base font-bold"
                                        >
                                            <Link
                                                href="/inventory"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                <span>Inventory</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase w-full py-6 text-base font-bold"
                                        >
                                            <Link
                                                href="/contact-us"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                <span>Contact</span>
                                            </Link>
                                        </Button>
                                        {isAuthenticated ? (
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="w-full py-3 border-2 border-red-500 text-white text-base font-cormorantGaramond font-bold uppercase rounded hover:bg-red-500 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button
                                                    asChild
                                                    className="gold-reveal-btn font-cormorantGaramond uppercase flex-1 py-6 text-base font-bold"
                                                >
                                                    <Link
                                                        href="/login"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        <span>Login</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    asChild
                                                    className="gold-reveal-btn font-cormorantGaramond uppercase flex-1 py-6 text-base font-bold"
                                                >
                                                    <Link
                                                        href="/register"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        <span>Signup</span>
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
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
