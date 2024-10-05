import {
  type AbilityScores,
  type Creature,
  getModifier,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { Spell } from "../spellUtils.ts";

export const useLucky = () => {
  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList[0].sectionList
      .find((section) => section.title === "Features")
      ?.subsections?.push({
        title: "Lucky",
        usages: {
          flags: [...Array(3)].fill(false),
          typeOfRest: TypeOfRest.LONG,
        },
        description:
          "Reroll any attack roll, ability check, saving throw or attack against you and choose the die",
      });
  };

  return {
    postCreatureCreation,
  };
};
