import {
  type Creature,
  getModifier,
  TypeOfRest,
} from "../../cheatSheetTypes.ts";

export const getBardicInspirationDie = (level: Creature["characterLevel"]) => {
  switch (level) {
    case 1:
    case 2:
    case 3:
    case 4:
      return "d6";
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return "d8";
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      return "d10";
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
      return "d12";
    default:
      return "d6";
  }
};

export const useBard = (currentLevel: Creature["characterLevel"]) => {
  const postCreatureCreation = (creatureList: Creature[]) => {
    if (!currentLevel) {
      return;
    }

    creatureList[0].sectionList
      .find((section) => section.title === "Bonus Action")
      ?.subsections?.push({
        title: "Bardic Inspiration",
        description: `Give ${getBardicInspirationDie(currentLevel)} to a creature, who can add it to any ability check, attack roll or saving throw over the next 10 minutes`,
        usages: {
          flags: [
            ...Array(getModifier(creatureList[0].abilityScores.CHA)),
          ].fill(false),
          typeOfRest: currentLevel < 5 ? TypeOfRest.LONG : TypeOfRest.SHORT, // font of inspiration
        },
      });

    if (currentLevel >= 2) {
      const getSongOfRestDie = (level: Creature["characterLevel"]) => {
        switch (level) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            return "d6";
          case 9:
          case 10:
          case 11:
          case 12:
            return "d8";
          case 13:
          case 14:
          case 15:
          case 16:
            return "d10";
          case 17:
          case 18:
          case 19:
          case 20:
            return "d12";
          default:
            return "d6";
        }
      };

      creatureList[0].sectionList
        .find((section) => section.title === "Features")
        ?.subsections?.push({
          title: "Song of Rest",
          description: `All hit dice spending creatures gain extra ${getSongOfRestDie(currentLevel)} during short rest`,
        });
    }
  };

  return {
    postCreatureCreation,
  };
};
