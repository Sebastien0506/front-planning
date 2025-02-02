"use client";
import React, { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validation";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
        setIsValid(validateEmail(newEmail));
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
        setIsValidPassword(validatePassword(newPassword));
    };

    return (
        <div>
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
            />
            <span>{isValid ? "✅ Email valide" : "❌ Email invalide"}</span>

            <input 
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <span>{isValidPassword ? "✅ Mot de passe valide" : "❌ Mot de passe invalide"}</span>
        </div>
    );
};

export default LoginForm;