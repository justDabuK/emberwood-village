export const getSpellSchoolIconName = (school: string) => {
    if(school.startsWith("Contaminated")) {
        return "deliriumCrystal.png";
    }

    switch (school) {
        case "Abjuration":
            return "abjuration.svg";
        case "Conjuration":
            return "conjuration.svg";
        case "Divination":
            return "divination.svg";
        case "Enchantment":
            return "enchantment.svg";
        case "Evocation":
            return "evocation.svg";
        case "Illusion":
            return "illusion.svg";
        case "Necromancy":
            return "necromancy.svg";
        case "Transmutation":
            return "transmutation.svg";
        default:
            return "";
    }
}