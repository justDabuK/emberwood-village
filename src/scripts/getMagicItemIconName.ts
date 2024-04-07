export const getMagicItemIconName = (type: string) => {
    switch (type) {
        case "Wondrous Item":
            return "book-open-variant.svg";
        case "Rod":
            return "magic-staff.svg"
        case "Potion":
            return "flask.svg";
        default:
            return "sword.svg";
    }
}