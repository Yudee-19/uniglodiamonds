"use client";

import { usePathname } from "next/navigation";
import { AuthGuard, GuestGuard, RoleGuard } from "./AuthGuards";

// 1. Routes that require the user to be logged in
const protectedRoutes = [
    "/cart",
    "/compare",
    "/profile",
    "/orders",
    "/checkout",
    "/enquiries",
];

// 2. Routes that are ONLY for guests (redirect to home if logged in)
const guestRoutes = ["/login", "/register", "/forgot-password"];

// 3. Admin-only routes (ADMIN and SUPER_ADMIN)
const adminRoutes = [
    "/members-management",
    "/enquiry-management",
    "/inventory-management",
    "/sell-diamonds-form-submissions",
];

// 4. Super Admin-only routes
const superAdminRoutes = ["/admin-management"];

export default function RouteGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Check if current path starts with any super admin route
    const isSuperAdminRoute = superAdminRoutes.some((route) =>
        pathname.startsWith(route),
    );

    // Check if current path starts with any admin route
    const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route),
    );

    // Check if current path starts with any protected route
    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route),
    );

    // Check if current path starts with any guest route
    const isGuest = guestRoutes.some((route) => pathname.startsWith(route));

    // Super Admin routes - only SUPER_ADMIN role
    if (isSuperAdminRoute) {
        return (
            <AuthGuard>
                <RoleGuard
                    allowedRoles={["SUPER_ADMIN"]}
                    redirectTo="/"
                    fallback={
                        <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-gray-800">
                            <h2 className="text-2xl font-bold text-primary-yellow-1 font-cormorantGaramond">
                                Access Denied
                            </h2>
                            <p className="mt-2 text-gray-600">
                                You don't have permission to access this page.
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                This page is restricted to super administrators
                                only.
                            </p>
                        </div>
                    }
                >
                    {children}
                </RoleGuard>
            </AuthGuard>
        );
    }

    // Admin routes - both ADMIN and SUPER_ADMIN can access
    if (isAdminRoute) {
        return (
            <AuthGuard>
                <RoleGuard
                    allowedRoles={["ADMIN", "SUPER_ADMIN"]}
                    redirectTo="/"
                    fallback={
                        <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-gray-800">
                            <h2 className="text-2xl font-bold text-primary-yellow-1 font-cormorantGaramond">
                                Access Denied
                            </h2>
                            <p className="mt-2 text-gray-600">
                                You don't have permission to access this page.
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                This page is restricted to administrators only.
                            </p>
                        </div>
                    }
                >
                    {children}
                </RoleGuard>
            </AuthGuard>
        );
    }

    if (isProtected) {
        return <AuthGuard>{children}</AuthGuard>;
    }

    // For all other routes (public), just render the content
    return <>{children}</>;
}
