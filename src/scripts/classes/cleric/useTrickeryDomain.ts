import { type Creature, getModifier } from "../../cheatSheetTypes.ts";
import { Spell } from "../../spellUtils.ts";

export const useTrickeryDomain = (currentLevel: Creature["characterLevel"]) => {
  const preCreatureCreation = (preparedSpellNameList: Spell[]) => {
    if (!currentLevel) {
      return;
    }

    if (currentLevel >= 2) {
      preparedSpellNameList.push(Spell.CharmPerson, Spell.DisguiseSelf);
    }

    if (currentLevel >= 3) {
      preparedSpellNameList.push(Spell.MirrorImage, Spell.PassWithoutTrace);
    }
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    if (!creatureList[0].characterLevel) {
      return;
    }

    if (creatureList[0].characterLevel >= 2) {
      creatureList[0].sectionList
        .find((section) => section.title === "Action")
        ?.subsections?.push({
          title: "Blessing of the Trickster",
          description: "Give advantage on Stealth checks for 1 hour",
        });

      creatureList[0].sectionList
        .find((section) => section.title === "Channel Divinity")
        ?.subsections?.push({
          title: "Invoke Duplicity",
          description: "Give advantage on Stealth checks for 1 hour",
        });
    }
  };

  return {
    preCreatureCreation,
    postCreatureCreation,
  };
};
