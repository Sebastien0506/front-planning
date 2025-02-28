"use client";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["600"] });
const inter2 = Inter({ subsets: ["latin"], weight: ["400"] });

const LoginForm = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [emailVerify, setEmailVerify] = React.useState("");
    const [passwordVerify, setPasswordVerify] = React.useState("");

    React.useEffect(() => {
        async function getData() {
            const url = 'http://127.0.0.1:8000/get_csrf_token';
            try {
                const response = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error(`Error status: ${response.status}`);
                }

                const json = await response.json();
                console.log(json);
            } catch (error) {
                console.error("Erreur lors de la récupération du token CSRF:", error.message);
            }
        }
        getData();
    }, []);

    function handleChangeEmail(e) {
        const newEmail = e.target.value
        setEmail(newEmail);

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(newEmail)){
            setEmailVerify("Email correct");
        } else {
            setEmailVerify("Email incorrect");
        }
    }

    function handleChangePassword(e) {
        const newPassword = e.target.value;
        setPassword(newPassword);
        
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (regex.test(newPassword)) {
            setPasswordVerify("Password correct");
        } else {
            setPasswordVerify("Password incorrect");
        }
        
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
                    Connexion
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
                            Email:
                        </label>
                        <input 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChangeEmail}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                height: "40px",
                                fontSize: "1rem",
                            }}
                        />
                        <span style={{color: "green"}}>{emailVerify}</span>
                    </div>

                    <div style={{ width: "100%" }}>
                        <label className={inter2.className} style={{ color: "white", fontSize: "1.2rem", display: "block", marginBottom: "5px" }}>
                            Password:
                        </label>
                        <input 
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={handleChangePassword}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                height: "40px",
                                fontSize: "1rem",
                            }}
                        />
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <span style={{color: "white"}}>Le mot de passe doit contenir une minscule, une majscule, un chiffre, un caractère spécial et doit faire minimum 8 caractère</span>
                            <span style={{color: "green"}}>{passwordVerify}</span>
                        </div>
                        
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

export default LoginForm;