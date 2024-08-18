import { type Creature, getModifier } from "../../cheatSheetTypes.ts";
import { Spell } from "../../spellUtils.ts";

export const useCircleOfContamination = (
  currentLevel: Creature["characterLevel"],
) => {
  const preCreatureCreation = (preparedSpellNameList: Spell[]) => {
    if (!currentLevel) {
      return;
    }

    if (currentLevel >= 2) {
      preparedSpellNameList.push(Spell.ChillTouch, Spell.PoisonNeedle);
    }

    if (currentLevel >= 3) {
      preparedSpellNameList.push(Spell.Biohazard, Spell.ControlledMutation);
    }
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList[0].sectionList.push({
      title: "Blighted Magic",
      description:
        "use 1 wild shape usage while casting a spell for any of the following effects",
      subsections: [
        {
          title: "Twin Spell",
          description: "target two creature with a single target spell",
        },
        {
          title: "Quicken Spell",
          description: "cast a 'action' spell as a 'bonus action'",
        },
        {
          title: "Corrupt Spell",
          description: `all damage is necrotic, reroll up to${getModifier(creatureList[0].abilityScores.WIS)} damage die`,
        },
        {
          title: "Purify Spell",
          description: "don't contaminate from a contaminated spell",
        },
      ],
    });
  };

  return {
    preCreatureCreation,
    postCreatureCreation,
  };
};
