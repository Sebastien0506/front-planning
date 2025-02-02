"use client";
import { validateEmail, validatePassword } from "@/utils/validation";
import React from "react";

function useCsrfToken() {
    const [csrfToken, setCsrfToken] = React.useState("");

    React.useEffect(() => {
        fetch("http://127.0.0.1:8000/get-csrf/", {
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => setCsrfToken(data.csrfToken))
        .catch((err) => console.error("Erreur CSRF:", err));
    }, []);

    return csrfToken;
}

function InscriptionForm() {
    const [name, setName] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [isValidName, setIsValidName] = React.useState(false);
    const [isValidLastname, setIsValidLastname] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(false);
    const [isValidPassword, setIsValidPassword] = React.useState(false);

    const csrfToken = useCsrfToken(); // Récupère le token CSRF

    const handleNameChange = (newName) => {
        setName(newName);
        setIsValidName(newName.trim().length > 0);
    };

    const handleLastNameChange = (newLastname) => {
        setLastname(newLastname);
        setIsValidLastname(newLastname.trim().length > 0);
    };

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
        setIsValidEmail(validateEmail(newEmail));
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
        setIsValidPassword(validatePassword(newPassword));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const formData = {
            name,
            lastname,
            email,
            password,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/add_admin/", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    'X-CSRFToken': csrfToken // Utilisation correcte du token CSRF
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'inscription");
            }

            const data = await response.json();
            console.log("Inscription réussie :", data);
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nom:</label>
                <input 
                    type="text" 
                    id="name"
                    placeholder="Please provide your name" 
                    value={name} 
                    onChange={(e) => handleNameChange(e.target.value)} 
                />
                <span>{isValidName ? "Le champ Nom est rempli" : "Le champ Nom est vide"}</span>

                <label htmlFor="lastname">Prénom:</label>
                <input 
                    type="text" 
                    id="lastname"
                    placeholder="Please provide your lastname" 
                    value={lastname} 
                    onChange={(e) => handleLastNameChange(e.target.value)} 
                />
                <span>{isValidLastname ? "Le champ Prénom est rempli" : "Le champ Prénom est vide"}</span>

                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email"
                    placeholder="Please provide your email" 
                    value={email} 
                    onChange={(e) => handleEmailChange(e.target.value)}  
                />
                <span>{isValidEmail ? "Le champ Email est valide" : "Le champ Email n'est pas valide"}</span>

                <label htmlFor="password">Mot de passe:</label>
                <input 
                    type="password" 
                    id="password"
                    placeholder="Please provide your password" 
                    value={password} 
                    onChange={(e) => handlePasswordChange(e.target.value)} 
                />
                <span>{isValidPassword ? "Le champ Mot de passe est valide" : "Le champ Mot de passe n'est pas valide"}</span>

                <button type="submit">S'inscrire</button>
            </form>
        </>
    );
}

export default InscriptionForm;