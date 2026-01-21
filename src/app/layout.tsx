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
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard"; // Import the new guard
import { TooltipProvider } from "@/components/ui/tooltip";

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
                {" "}
                <AuthProvider>
                    <TooltipProvider>
                        <div className="md:h-41 bg-brand-gradient h-20" />
                        <Navbar />
                        <main className="relative z-0">
                            {/* Wrap children with RouteGuard */}
                            <RouteGuard>{children}</RouteGuard>
                        </main>
                        <Footer />
                        <Toaster />
                    </TooltipProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
