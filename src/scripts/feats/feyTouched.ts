import {
  type AbilityScores,
  type Creature,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { Spell } from "../spellUtils.ts";

export const useFeyTouched = (
  abilityScore: keyof AbilityScores,
  additionalSpell: Spell,
) => {
  const preCreatureCreation = (abilityScores: AbilityScores) => {
    abilityScores[abilityScore] += 1;
  };

  const postCreatureCreation = (
    creatureList: Creature[],
    preparedSpellNameList: Spell[],
  ) => {
    preparedSpellNameList.push(Spell.MistyStep);
    creatureList[0].sectionList
      .find((section) => section.title === "Action")
      ?.subsections?.push({
        title: "Misty Step",
        usages: {
          flags: [false],
          typeOfRest: TypeOfRest.LONG,
        },
        description: "for free, 2nd level",
      });

    preparedSpellNameList.push(additionalSpell);
    creatureList[0].sectionList
      .find((section) => section.title === "Action")
      ?.subsections?.push({
        title: additionalSpell,
        usages: {
          flags: [false],
          typeOfRest: TypeOfRest.LONG,
        },
        description: "for free, 1st level",
      });
  };

  return {
    preCreatureCreation,
    postCreatureCreation,
  };
};
