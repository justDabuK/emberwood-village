import {
  type AbilityScores,
  type Creature,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { Spell } from "../spellUtils.ts";

export const useWarCaster = () => {
  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList[0].sectionList
      .find((section) => section.title === "Reaction")
      ?.subsections?.push({
        title: "Spell Opportunity Attack (Warcaster)",
        description: "Any single target spell with 1 action casting time",
      });

    creatureList[0].sectionList
      .find((section) => section.title === "Features")
      ?.subsections?.push({
        title: "War Caster",
        description: "Advantage on concentration checks",
      });
  };

  return {
    postCreatureCreation,
  };
};
