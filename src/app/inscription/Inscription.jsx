"use client";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["600"] });
const inter2 = Inter({ subsets: ["latin"], weight: ["400"] });

const InscriptionForm = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh", // Centre verticalement sur toute la hauteur
            }}
        >
            <div
                style={{
                    backgroundColor: "#1E1E1E", // Fond du formulaire
                    padding: "2rem",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.1)", // Ombre légère
                    textAlign: "center",
                    width: "90%", // Pour éviter que ce soit trop large sur mobile
                    maxWidth: "400px", // Largeur max du formulaire
                }}
            >
                <h1 className={inter.className} style={{ color: "white", fontSize: "2rem" }}>
                    Inscription
                </h1>
                <form 
                    action="" 
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem", // Espace entre les éléments
                    }}
                >
                    <div style={{ width: "100%" }}>
                        <label className={inter2.className} style={{ color: "white", fontSize: "1.2rem", display: "block", marginBottom: "5px" }}>
                            Nom:
                        </label>
                        <input 
                            type="text"
                            placeholder="Nom"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                height: "40px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <label className={inter2.className} style={{ color: "white", fontSize: "1.2rem", display: "block", marginBottom: "5px" }}>
                            Prenom:
                        </label>
                        <input 
                            type="text"
                            placeholder="Prenom"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                height: "40px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <label className={inter2.className} style={{ color: "white", fontSize: "1.2rem", display: "block", marginBottom: "5px" }}>
                            Email:
                        </label>
                        <input 
                            type="email"
                            placeholder="Email"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                height: "40px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>

                    <div style={{ width: "100%" }}>
                        <label className={inter2.className} style={{ color: "white", fontSize: "1.2rem", display: "block", marginBottom: "5px" }}>
                            Password:
                        </label>
                        <input 
                            type="password"
                            placeholder="Mot de passe"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                height: "40px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            marginTop: "1rem",
                        }}
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InscriptionForm;