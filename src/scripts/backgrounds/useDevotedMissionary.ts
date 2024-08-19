import { type Creature, type Skill, TypeOfRest } from "../cheatSheetTypes.ts";
import { getProficiencyBonus } from "../getProficiencyBonus.ts";

export const useDevotedMissionary = (firstSkill: Skill, secondSkill: Skill) => {
  const preCreatureCreation = (skillProficiencies: Skill[]) => {
    skillProficiencies.push(firstSkill, secondSkill);
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList[0].sectionList
      .find((section) => section.title === "Features")
      ?.subsections?.push({
        title: "Guided by Faith",
        description: `Ask DM to reveal the DC of any ability check, choose afterwards if you want to attempt it`,
        usages: {
          flags: [...Array(creatureList[0].proficiencyBonus)].fill(false),
          typeOfRest: TypeOfRest.LONG,
        },
      });
  };

  return {
    preCreatureCreation,
    postCreatureCreation,
  };
};
