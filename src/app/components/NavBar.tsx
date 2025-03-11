"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Poppins, Ranga } from "next/font/google";

const poppins = Poppins({ subsets: ['latin'], weight: ["600"] });
const ranga = Ranga({ subsets: ["latin"], weight: ["700"] });

function NavBar() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        // ✅ Récupérer le rôle stocké après la connexion
        const storedRole = localStorage.getItem("user_role");
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    return (
        <nav style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor: "#171717" }}>
            <span className={ranga.className} style={{ color: "white", fontSize: "2.5rem", marginLeft: "2%" }}>Planeasy</span>
            <ul className={poppins.className} style={{ color: "white", fontSize: "1.5rem", width: "100%", display: "flex", justifyContent: "space-around", margin: "auto" }}>
                
                <li><Link href="/">Accueil</Link></li>

                {/* 🔹 Affichage conditionnel en fonction du rôle */}
                {role === "admin" && (
                    <>
                        <li><Link href="/dashboard">Admin Dashboard</Link></li>
                        <li><Link href="/manage-users">Gérer les utilisateurs</Link></li>
                        <li><Link href="/profile">Profil</Link></li>
                        <li><Link href="/planning">Planning</Link></li>
                    </>
                )}

                {role === "employe" && (
                    <>
                        <li><Link href="/profile">Mon Profil</Link></li>
                        <li><Link href="/planning">Mon Planning</Link></li>
                    </>
                )}

                {role === null && (
                    <>
                        <li><Link href="/connexion">Connexion</Link></li>
                        <li><Link href="/inscription">Inscription</Link></li>
                    </>
                )}

                {/* 🔹 Bouton de déconnexion */}
                {role && (
                    <li>
                        <button onClick={logout} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
                            Déconnexion
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

// ✅ Fonction de déconnexion
const logout = () => {
    localStorage.removeItem("user_role");  // ✅ Supprimer le rôle du stockage
    window.location.reload();  // 🔄 Recharge la page pour réinitialiser la navbar
};

export default NavBar;