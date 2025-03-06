import { validateEmail, validatePassword } from "./validationConnexion";

describe("Validation des emails", () => {
    test("Emails valides", () => {
        expect(validateEmail("test@gmail.com")).toBe(true);
        expect(validateEmail("user@yahoo.com")).toBe(true);
    });

    test("Emails invalides", () => {
        jest.spyOn(window, "alert").mockImplementation(() => {}); // Empêche les alertes pendant les tests

        expect(validateEmail("invalidemail.com")).toBe(false);
        expect(validateEmail("user@@gmail.com")).toBe(false);
        expect(validateEmail("user@random.com")).toBe(false);

        jest.restoreAllMocks(); // Réactive les alertes après les tests
    });
});

describe("Validation des mots de passe", () => {
    test("Mots de passe valides", () => {
        expect(validatePassword("Strong1!")).toBe(true);
    });

    test("Mots de passe invalides", () => {
        jest.spyOn(window, "alert").mockImplementation(() => {}); // Empêche les alertes pendant les tests

        expect(validatePassword("weakpass")).toBe(false);
        expect(validatePassword("NoNumber!")).toBe(false);
        expect(validatePassword("nocapital1!")).toBe(false);
        expect(validatePassword("NOLITTLE1!")).toBe(false);
        expect(validatePassword("NoSpecialChar1")).toBe(false);
        expect(validatePassword("Short1!")).toBe(false);

        jest.restoreAllMocks(); // Réactive les alertes après les tests
    });
});