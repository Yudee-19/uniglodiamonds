import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

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
                className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} ${lora.variable} antialiased`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
