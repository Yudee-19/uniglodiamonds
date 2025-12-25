import type { Metadata } from "next";
import {
    Geist,
    Geist_Mono,
    Cormorant_Garamond,
    Lora,
    Lato,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
    variable: "--font-cormorant-garamond",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "Uniglow Jewels",
    description: "Best Jewels in Antwerp",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} ${lora.variable} ${lato.variable} antialiased `}
            >
                <div className="h-41 bg-brand-gradient" />
                <Navbar />
                <main className="relative z-0">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
