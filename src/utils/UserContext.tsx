"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserContextType = {
    role: string | null;
    isAuthenticated: boolean;
    logout: () => void;
    refreshUser : () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // 👇 Rendu réutilisable
    const refreshUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/get_user_role/", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Utilisateur non authentifié");
            }

            const data = await response.json();
            setRole(data.role);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("❌ Erreur récupération rôle :", error);
            setRole(null);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        refreshUser(); // 🔁 appelée une seule fois au chargement
    }, []);

    const logout = async () => {
        await fetch("http://localhost:8000/api/logout/", {
            method: "POST",
            credentials: "include",
        });

        setRole(null);
        setIsAuthenticated(false);
    };

    return (
        <UserContext.Provider value={{ role, isAuthenticated, logout, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook pour accéder au contexte utilisateur
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};