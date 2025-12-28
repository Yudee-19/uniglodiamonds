"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { User, getCurrentUser, logoutUser } from "@/services/authServices";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. Check if user is logged in on app load
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const response = await getCurrentUser();
                if (response.success && response.data.user) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                // If 401 or other error, user is not logged in
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUserLoggedIn();
    }, []);

    // 2. Logout Function
    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            // Always clear local state even if server request fails
            setUser(null);
            // Optional: Redirect to login page
            window.location.href = "/login";
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setUser,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used withinan AuthProvider");
    }
    return context;
};
