"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Poppins, Ranga } from "next/font/google";
import { useRouter } from "next/navigation";
const poppins = Poppins({ subsets: ['latin'], weight: ["600"] });
const ranga = Ranga({ subsets: ["latin"], weight: ["700"] });

function NavBar() {
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get_user_role", {
                    credentials: "include",
                });
                if(!response.ok) {
                    throw new Error("Non connecté");
                }
                const data = await response.json();
                setRole(data.role);
            } catch (error) {
                console.error("Erreur rôle dans la NavBar :", error)
                setRole(null);
            }
        };
        fetchRole();
    }, []);
    // ✅ Fonction de déconnexion
    const logout = () => {
        localStorage.removeItem("user_role");  // ✅ Supprimer le rôle du stockage
        setRole(null);
        router.push("/");
    };
    return (
        <nav style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor: "#171717" }}>
            <span className={ranga.className} style={{ color: "white", fontSize: "2.5rem", marginLeft: "2%" }}>Planeasy</span>
            <ul className={poppins.className} style={{ color: "white", fontSize: "1.5rem", width: "100%", display: "flex", justifyContent: "space-around", margin: "auto" }}>
                
                <li><Link href="/">Accueil</Link></li>

                {/* 🔹 Affichage conditionnel en fonction du rôle */}
                {role === "admin" && (
                    <>
                        <li><Link href="/adminDashboard">Admin Dashboard</Link></li>
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



export default NavBar;