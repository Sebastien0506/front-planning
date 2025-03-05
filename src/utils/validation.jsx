export const validateEmail = (email) => {
    const domainesAutorises = ["gmail.com", "yahoo.com", "outlook.com"];

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
        return "Email invalide. Il doit contenir '@' et un domaine.";
    }

    const parts = email.split("@");
    if (parts.length !== 2) {
        return "L'email doit contenir une seule occurrence de '@'.";
    }

    const [, domaine] = parts;
    if (!domainesAutorises.includes(domaine)) {
        return `Le domaine '${domaine}' n'est pas autorisé.`;
    }

    const isValid = [...email].every(char =>
        (char >= 'A' && char <= 'Z') ||
        (char >= 'a' && char <= 'z') ||
        (char >= '0' && char <= '9') ||
        char === '@' ||
        char === '.' ||
        char === '-' ||
        char === '_'
    );

    if (!isValid) {
        return "L'email contient des caractères non autorisés.";
    }

    return null; // Aucune erreur
};

export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
        return "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères.";
    }

    return null;
};