"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface BaseGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface RoleGuardProps extends BaseGuardProps {
    allowedRoles: string[];
}

interface StatusGuardProps extends BaseGuardProps {
    allowedStatuses: string[];
}

/**
 * AuthGuard
 * Protects a route or component.
 * If user is not logged in, redirects to /login.
 * Shows a loading spinner while checking auth status.
 */
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            const timer = setTimeout(() => {
                router.push("/login");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white">
                <Loader2 className="h-10 w-10 animate-spin text-primary-yellow-1" />
            </div>
        );
    }

    // If not authenticated, show message before redirecting
    if (!isAuthenticated) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-gray-800">
                <h2 className="text-2xl font-bold text-primary-yellow-1 font-cormorantGaramond">
                    Access Denied
                </h2>
                <p className="mt-2 text-gray-400">
                    Please login first to access this page.
                </p>
                <p className="mt-4 text-sm text-gray-500">
                    Redirecting to login in 5 seconds...
                </p>
            </div>
        );
    }

    return <>{children}</>;
};

/**
 * GuestGuard
 * Used for pages that should ONLY be accessible by guests (e.g., Login, Register).
 * If user is logged in, redirects to home (/).
 */
export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <Loader2 className="h-10 w-10 animate-spin text-primary-yellow-1" />
            </div>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

/**
 * RoleGuard
 * Restricts access based on user role.
 * Does NOT redirect, but renders a fallback (or nothing) if role doesn't match.
 */
export const RoleGuard = ({
    children,
    allowedRoles,
    fallback = null,
}: RoleGuardProps) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user || !allowedRoles.includes(user.role)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};

/**
 * StatusGuard
 * Restricts access based on user status (e.g., "active", "pending").
 */
export const StatusGuard = ({
    children,
    allowedStatuses,
    fallback = null,
}: StatusGuardProps) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user || !allowedStatuses.includes(user.status)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};
