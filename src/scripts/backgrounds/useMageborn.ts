import { type Creature, type Skill, TypeOfRest } from "../cheatSheetTypes.ts";
import { getProficiencyBonus } from "../getProficiencyBonus.ts";

export const useMageborn = (firstSkill: Skill, secondSkill: Skill) => {
  const preCreatureCreation = (skillProficiencies: Skill[]) => {
    skillProficiencies.push(firstSkill, secondSkill);
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList[0].sectionList
      .find((section) => section.title === "Features")
      ?.subsections?.push({
        title: "Bookworm",
        description: `Create on spell scroll of ${Math.max(1, Math.floor(getProficiencyBonus(creatureList[0].characterLevel!) / 2))}`,
      });
  };

  return {
    preCreatureCreation,
    postCreatureCreation,
  };
};
