"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserContextType = {
    role: string | null;
    setRole: (role: string | null) => void;
};

// Création du contexte
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        // ✅ Récupère le rôle UNE SEULE FOIS après le chargement
        const fetchRole = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/get_user_role/", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Utilisateur non authentifié");
                }

                const data = await response.json();
                console.log("Rôle récupéré :", data.role);
                setRole(data.role);

            } catch (error) {
                console.error("Erreur récupération rôle :", error);
            }
        };

        fetchRole();
    }, []);  // 🔹 S'exécute UNE SEULE FOIS

    return (
        <UserContext.Provider value={{ role, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour accéder au rôle
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};