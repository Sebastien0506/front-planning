import React from "react";

function PasswordInput({ password, onPasswordChange}) {
    return(
        <div>
            <label htmlFor="password" id="password">Password:</label>
            <input type="password" id="password" placeholder="Please provide your password" value={password} onChange={(e) => onPasswordChange(e.target.value)}/>
        </div>
    );
}

export default PasswordInput;