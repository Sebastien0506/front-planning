"use client";
import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../utils/validationConnexion";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
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

    const sendLoginRequest = async (email: string, password: string): Promise<void> => {
        const url = "http://127.0.0.1:8000/api/login";
        const payload = {
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
                body: JSON.stringify(payload),
                credentials: 'include', 
            });

            if(!response.ok) {
                const errorData = await response.json();
                alert(`Erreur: ${errorData.message || response.statusText}`);
                return;
            }

            const data = await response.json();
            alert("Connexion réussie");
        } catch (error: any) {
            alert("Erreur réseau : " + error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!validateEmail(email)) return;
        if (!validatePassword(password)) return;
    
        sendLoginRequest(email, password);
    };



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <div
                style={{
                    backgroundColor: "#1E1E1E",
                    padding: "2rem",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.1)",
                    textAlign: "center",
                    width: "90%",
                    maxWidth: "400px",
                }}
            >
                <h1 style={{ color: "white", fontSize: "2rem" }}>Connexion</h1>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    
                    {/* Input Email */}
                    <div>
                        <label style={{ color: "white", fontSize: "1.2rem", display: "block", marginBottom: "5px" }}>
                            Email:
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", height: "40px", fontSize: "1rem" }}
                        />
                        {emailError && <span style={{ color: "red", fontSize: "0.9rem" }}>{emailError}</span>}
                    </div>

                    {/* Input Password */}
                    <div>
                        <label style={{ color: "white", fontSize: "1.2rem", display: "block", marginBottom: "5px" }}>
                            Mot de passe:
                        </label>
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", height: "40px", fontSize: "1rem" }}
                        />
                        
                    </div>

                    {/* Bouton de soumission */}
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