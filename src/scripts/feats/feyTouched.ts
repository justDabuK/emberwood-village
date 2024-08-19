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
  const preCreatureCreation = (
    abilityScores: AbilityScores,
    preparedSpellNameList: Spell[],
  ) => {
    abilityScores[abilityScore] += 1;
    preparedSpellNameList.push(Spell.MistyStep);
    preparedSpellNameList.push(additionalSpell);
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList[0].sectionList
      .find((section) => section.title === "Action")
      ?.subsections?.push({
        title: Spell.MistyStep,
        usages: {
          flags: [false],
          typeOfRest: TypeOfRest.LONG,
        },
        description: "for free, 2nd level",
      });

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
