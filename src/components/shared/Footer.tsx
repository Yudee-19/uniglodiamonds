import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/Uniglo-Logo-Horizontal1.png";
import diamondBg from "@/assets/footer_diamond.jpg"; // Add your diamond image here

const pages = [
    "Inventory",
    "About",
    "Buy Diamonds",
    "Sell Diamonds",
    "Education",
    "Blog",
    "Guide",
];

const services = [
    "Diamond Manufacturing",
    "Free Estimations",
    "Financing",
    "Investment",
    "Sealing",
    "Partners",
];

export default function Footer() {
    return (
        <footer className="bg-[#1a1120] pt-0 mt-50 font-cormorantGaramond relative">
            {/* Subscribe Banner */}
            <div className=" relative max-w-5xl mx-auto -translate-y-32 bg-primary-yellow-1 py-12 flex flex-col items-center justify-center z-20 px-10 ">
                <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between mx-auto px-4">
                    <div className="mb-6 md:mb-0">
                        <span className="text-white text-lg uppercase font-lora tracking-widest">
                            SUBSCRIBE
                        </span>
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-white mt-2">
                            For More Deals
                        </h2>
                    </div>
                    <form className="flex items-center w-full md:w-auto gap-0">
                        <input
                            type="email"
                            placeholder="Email Addresss"
                            className="px-6 py-4 w-full md:w-[350px] rounded-none border border-white/40 bg-transparent text-white placeholder:text-white focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-white px-6 py-4 text-primary-yellow-1 font-cormorantGaramond text-lg uppercase"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-11 max-w-7xl mx-auto px-4 py-2 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Left: Logo & About */}
                <div className="md:col-span-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <Image
                            src={logo}
                            alt="Uniglo Diamonds"
                            width={280}
                            height={100}
                        />
                    </div>
                    <p className="text-white/80 font-lora text-base mb-6">
                        At Uniglo, we believe a diamond is more than a
                        gemstone—it is a symbol of elegance, craftsmanship, and
                        timeless value. Our journey began with a single vision:
                        to bring ethically sourced, internationally certified
                        diamonds to people who appreciate true quality. Every
                        Uniglo diamond is hand-selected and graded by
                        world-renowned institutions like GIA and IGI.
                    </p>
                    <div className="mt-4">
                        <span className="text-primary-yellow-1 text-lg font-cormorantGaramond mb-2 block">
                            Follow Us:
                        </span>
                        <div className="flex gap-4 mt-2">
                            <a
                                href="#"
                                className="text-primary-yellow-1 hover:text-white text-xl"
                            >
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a
                                href="#"
                                className="text-primary-yellow-1 hover:text-white text-xl"
                            >
                                <i className="fab fa-instagram" />
                            </a>
                            <a
                                href="#"
                                className="text-primary-yellow-1 hover:text-white text-xl"
                            >
                                <i className="fab fa-twitter" />
                            </a>
                            <a
                                href="#"
                                className="text-primary-yellow-1 hover:text-white text-xl"
                            >
                                <i className="fab fa-linkedin-in" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Pages */}
                <div className="md:col-span-1 md:pl-10">
                    <h3 className="text-primary-yellow-1 text-2xl font-cormorantGaramond mb-8">
                        Pages
                    </h3>
                    <ul className="space-y-4">
                        {pages.map((page) => (
                            <li key={page}>
                                <a
                                    href="#"
                                    className="text-white/80 font-lora hover:text-primary-yellow-1 transition"
                                >
                                    {page}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Our Services */}
                <div className="md:col-span-1">
                    <h3 className="text-primary-yellow-1 text-2xl font-cormorantGaramond mb-8">
                        Our Services
                    </h3>
                    <ul className="space-y-4">
                        {services.map((service) => (
                            <li key={service}>
                                <a
                                    href="#"
                                    className="text-white/80 font-lora hover:text-primary-yellow-1 transition"
                                >
                                    {service}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Get In Touch */}
                <div className="md:col-span-1">
                    <h3 className="text-primary-yellow-1 text-2xl font-cormorantGaramond mb-8">
                        Get In Touch
                    </h3>
                    <ul className="space-y-8 text-white/80 font-lora">
                        <li className="flex items-start gap-2">
                            <MapPin
                                className="text-primary-yellow-1 mt-1 shrink-0"
                                size={20}
                            />
                            <span>
                                <span className="font-semibold">Location:</span>
                                <br />
                                Hoveniersstraat 30, Suite 662/Bus 250
                                <br />
                                2018 Antwerp
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail
                                className="text-primary-yellow-1 shrink-0"
                                size={20}
                            />
                            <span>
                                <span className="font-semibold">Email:</span>
                                <br />
                                <a
                                    href="mailto:suraj@uniglodiamonds.com"
                                    className="hover:text-primary-yellow-1 transition"
                                >
                                    suraj@uniglodiamonds.com
                                </a>
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone
                                className="text-primary-yellow-1 shrink-0"
                                size={20}
                            />
                            <span>
                                <span className="font-semibold">Phone:</span>
                                <br />
                                <a
                                    href="tel:+32473565758"
                                    className="hover:text-primary-yellow-1 transition"
                                >
                                    +32 473 565 758
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Diamond Image Overlay */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-9 w-full h-full opacity-50 pointer-events-none">
                <Image
                    src={diamondBg}
                    alt="Diamond"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10 w-full h-full bg-primary-purple/10 pointer-events-none"></div>

            {/* Copyright */}
            <div className="text-center py-6 text-white/70 font-lora text-base border-t border-white/40 max-w-7xl mx-auto mt-10 z-11 relative">
                All Rights Reserved By{" "}
                <span className="text-primary-yellow-1">Uniglo</span>
            </div>
        </footer>
    );
}
