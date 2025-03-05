import { validateEmail, validatePassword } from "./validation";

describe("Validation des emails", () => {
    test("Emails valides", () => {
        expect(validateEmail("test@gmail.com")).toBeNull();
        expect(validateEmail("user@yahoo.com")).toBeNull();
    });

    test("Emails invalides", () => {
        expect(validateEmail("invalidemail.com")).toBe("Email invalide. Il doit contenir '@' et un domaine.");
        expect(validateEmail("user@@gmail.com")).toBe("L'email doit contenir une seule occurrence de '@'.");
        expect(validateEmail("user@random.com")).toBe("Le domaine 'random.com' n'est pas autorisé.");
    });
});

describe("Validation des mots de passe", () => {
    test("Mots de passe valides", () => {
        expect(validatePassword("Strong1!")).toBeNull();
    });

    test("Mots de passe invalides", () => {
        expect(validatePassword("weakpass")).toBe("Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères.");
    });
});