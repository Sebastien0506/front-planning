"use client";
import React from "react";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

function PageConnexion(){
    const [email, setEmail] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);

    const [password, setPassword] = React.useState("");
    const [isValidPassword, setIsValidPassword] = React.useState(false);

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
        setIsValidPassword(validatePassword(newPassword));
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }


    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
        setIsValid(validateEmail(newEmail));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    };


    return(
        <div>
            <h1>Connexion</h1>
            <EmailInput email={email} onEmailChange={handleEmailChange}/>
            <p>{isValid ? "Email valide ✅" : "Email invalide ❌"}</p>
            
            <PasswordInput password={password} onPasswordChange={handlePasswordChange}/>
            <p>{isValidPassword ? "Password valide ✅" : "Password invalide ❌"}</p>

        </div>
    );
}

export default PageConnexion;