import React from "react";

function EmailInput({ email, onEmailChange }) {
    return (
        <div>
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                value={email} // L'email vient des props
                onChange={(e) => onEmailChange(e.target.value)} // Envoie la mise à jour au parent
                placeholder="Please provide your email"
            />
        </div>
    );
}

export default EmailInput;