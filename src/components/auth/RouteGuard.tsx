"use client";

import { usePathname } from "next/navigation";
import { AuthGuard, GuestGuard } from "./AuthGuards";

// 1. Routes that require the user to be logged in
const protectedRoutes = [
    "/cart",
    "/inventory",
    "/compare",
    "/profile",
    "/orders",
    "/checkout",
];

// 2. Routes that are ONLY for guests (redirect to home if logged in)
const guestRoutes = ["/login", "/register", "/forgot-password"];

export default function RouteGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Check if current path starts with any protected route
    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if current path starts with any guest route
    const isGuest = guestRoutes.some((route) => pathname.startsWith(route));

    if (isProtected) {
        return <AuthGuard>{children}</AuthGuard>;
    }

    // if (isGuest) {
    //     return <GuestGuard>{children}</GuestGuard>;
    // }

    // For all other routes (public), just render the content
    return <>{children}</>;
}
