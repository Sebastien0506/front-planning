"use client";
import React from "react";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"], weight: ["600"] });
const inter2 = Inter({ subsets: ["latin"], weight: ["400"] });

const InscriptionForm = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [lastname, setLastname] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState(""); 
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        async function getData() {
            const url = "http://127.0.0.1:8000/get_csrf_token";
            try {
                const response = await fetch(url, { method: "GET", credentials: "include" });
                if (!response.ok) throw new Error(`Error status: ${response.status}`);

                const json = await response.json();
                console.log(json);
            } catch (error) {
                console.error("Erreur lors de la récupération du token CSRF:", error.message);
            }
        }
        getData();
    }, []);

    const sendInscriptionRequest = async (name: string, lastname: string, email: string, password: string) => {
        const url = "http://127.0.0.1:8000/api/add_admin";
        const payload = {
            name : encodeURIComponent(name),
            lastname : encodeURIComponent(lastname),
            email : encodeURIComponent(email),
            password : password,
        };

        try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
              },
              body : JSON.stringify(payload),
              credentials: "include",
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erreur: ${errorData.message || response.statusText}`);
                return;
            }

            const data = await response.json();
            alert("Connexion réussi");
            router.push("/Home")

        } catch(error) {
            alert("Erreur réseau" + error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        sendInscriptionRequest(name, lastname, email, password);
    }
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
                    onSubmit={handleSubmit} 
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