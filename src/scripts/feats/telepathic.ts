import {
  type AbilityScores,
  type Creature,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { Spell } from "../spellUtils.ts";

export const useTelepathic = (abilityToIncrease: keyof AbilityScores) => {
  const preCreatureCreation = (
    abilityScores: AbilityScores,
    knownSpellNameList: Spell[],
  ) => {
    abilityScores[abilityToIncrease] += 1;
    knownSpellNameList.push(Spell.DetectThoughts);
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList[0].sectionList
      .find((section) => section.title === "Features")
      ?.subsections?.push({
        title: "Telepathic",
        description:
          "speak telepathically in any language you know to any creature you can see within 60ft. (20 squares)",
      });

    creatureList[0].sectionList
      .find((section) => section.title === "Action")
      ?.subsections?.push({
        title: "Detect Thoughts",
        usages: {
          flags: [false],
          typeOfRest: TypeOfRest.LONG,
        },
        description: "for free, 2nd level",
      });
  };

  return {
    preCreatureCreation,
    postCreatureCreation,
  };
};
