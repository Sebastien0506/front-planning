"use client";
import React from "react";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateEmail, validateLastName, validateName, validatePassword } from "../../utils/validationInscription";

const inter = Inter({ subsets: ["latin"], weight: ["600"] });
const inter2 = Inter({ subsets: ["latin"], weight: ["400"] });

const InscriptionForm = () => {
    const router = useRouter();

    const [username, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [lastname, setLastname] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState(""); 
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        async function getCsrfToken() {
            const response = await fetch("http://127.0.0.1:8000/get_csrf_token/", {
                method: "GET",
                credentials: "include"  // ✅ Important pour récupérer le cookie !
            });
            // console.log(response);
            if (!response.ok) {
                console.error("Erreur lors de la récupération du token CSRF");
                return;
            }
    
            
        }
        getCsrfToken();
    }, []);

    const sendInscriptionRequest = async (username: string, lastname: string, email: string, password: string): Promise<void> => {
        const url = "http://127.0.0.1:8000/api/add_admin/";
        const payload = {
            username,
            lastname,
            email,
            password : password,
        };

        try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
              },
              credentials: "include",

              body : JSON.stringify(payload),
            });
            
            const ResponseData = await response.json();

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erreur: ${errorData.message || response.statusText}`);
                return;
            }
            localStorage.setItem("user_role", ResponseData.role);
            alert("Inscription résussi");

            setTimeout(() => {
                router.push("/redirect");
            }, 5000);

        } catch(error : any) {
            alert("Erreur réseau" + error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validateEmail(email)) return;
        if(!validateLastName(lastname)) return;
        if(!validateName(username)) return;
        if(!validatePassword(password)) return;
        sendInscriptionRequest(username, lastname, email, password);
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
                            value={username}
                            onChange={(e) => setName(e.target.value)}
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
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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