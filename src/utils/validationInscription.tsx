export const sanitizeInput = (input: string) => {
    let sanitized = "";
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (
            (char >= 'A' && char <= 'Z') || // Lettres majuscules
            (char >= 'a' && char <= 'z') || // Lettres minuscules
            (char >= '0' && char <= '9') || // Chiffres
            char === '@' || char === '.' || // Caractères autorisés pour email
            char === '-' || char === '_'    // Optionnels pour email
        ) {
            sanitized += char;
        }
    }
    return sanitized;
};

export const validateName = (username: string) => {
    if (!username) {
        throw new Error("Le nom ne peut pas être vide.");
    }

    for (let char of username) {
        const charCode = char.charCodeAt(0);

        // Vérifie si le caractère est une lettre, un espace ou un tiret
        if (
            !(charCode >= 65 && charCode <= 90) &&  // A-Z
            !(charCode >= 97 && charCode <= 122) && // a-z
            !(charCode >= 192 && charCode <= 255) && // Lettres accentuées (latin étendu)
            char !== ' ' && char !== '-'  // Autorise espaces et tirets
        ) {
            throw new Error("Le nom contient des caractères non autorisés.");
        }
    }

    return username.trim();
};
export const validateLastName = (lastname: string) => {
    if (!lastname) {
        throw new Error("Le nom ne peut pas être vide.");
    }

    for (let char of lastname) {
        const charCode = char.charCodeAt(0);

        // Vérifie si le caractère est une lettre, un espace ou un tiret
        if (
            !(charCode >= 65 && charCode <= 90) &&  // A-Z
            !(charCode >= 97 && charCode <= 122) && // a-z
            !(charCode >= 192 && charCode <= 255) && // Lettres accentuées (latin étendu)
            char !== ' ' && char !== '-'  // Autorise espaces et tirets
        ) {
            throw new Error("Le nom contient des caractères non autorisés.");
        }
    }

    return lastname.trim();
};

export const validateEmail = (email: string) => {
    const emailSanitized = sanitizeInput(email);
    const domainesAutorises = ["gmail.com", "yahoo.com", "outlook.com"];

    if (!emailSanitized.includes("@") || !emailSanitized.includes(".")) {
        alert("Email invalide ! Il doit contenir '@' et un nom de domaine valide.");
        return false;
    }

    const parts = emailSanitized.split("@");
    if (parts.length !== 2) {
        alert("L'email doit contenir une seule occurrence de '@'.");
        return false;
    }

    const [, domaine] = parts;
    if (!domainesAutorises.includes(domaine)) {
        alert(`Le domaine '${domaine}' n'est pas autorisé.`);
        return false;
    }

    return true;
};

export const validatePassword = (password: string) => {
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumber = false;
    let hasSpecialChar = false;
    const specialChars = "@$!%*?&"; // Liste des caractères spéciaux autorisés

    if (password.length < 8) {
        alert("Le mot de passe doit avoir au moins 8 caractères.");
        return false;
    }

    for (let i = 0; i < password.length; i++) {
        let char = password[i];

        if (char >= 'A' && char <= 'Z') hasUpperCase = true;
        else if (char >= 'a' && char <= 'z') hasLowerCase = true;
        else if (char >= '0' && char <= '9') hasNumber = true;
        else if (specialChars.includes(char)) hasSpecialChar = true;
    }

    if (!hasUpperCase) {
        alert("Le mot de passe doit contenir au moins une majuscule.");
        return false;
    }
    if (!hasLowerCase) {
        alert("Le mot de passe doit contenir au moins une minuscule.");
        return false;
    }
    if (!hasNumber) {
        alert("Le mot de passe doit contenir au moins un chiffre.");
        return false;
    }
    if (!hasSpecialChar) {
        alert("Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, ?, &).");
        return false;
    }

    return true;
};