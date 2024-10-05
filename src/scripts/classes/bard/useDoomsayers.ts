import { type Creature, getModifier } from "../../cheatSheetTypes.ts";
import { Spell } from "../../spellUtils.ts";
import { getProficiencyBonus } from "../../getProficiencyBonus.ts";

export const useDoomsayers = (currentLevel: Creature["characterLevel"]) => {
  const postCreatureCreation = (creatureList: Creature[]) => {
    if (!currentLevel) {
      return;
    }

    if (currentLevel >= 2) {
      creatureList[0].sectionList
        .find((section) => section.title === "Features")
        ?.subsections?.push({
          title: "The End is Nigh",
          description:
            "When rolling on intimidation, your d20 roll is a minimum of 10",
        });

      creatureList[0].sectionList
        .find((section) => section.title === "Bonus Action")
        ?.subsections?.push({
          title: "Dreadful Words",
          description:
            "use a bardic inspiration die for dealing psychic damage. Creature needs to additionally do a WIS saving throw or frightened until start of your next turn",
          dice: `DC ${8 + getModifier(creatureList[0].abilityScores.CHA) + getProficiencyBonus(currentLevel)}`,
        });
    }
  };

  return {
    postCreatureCreation,
  };
};
