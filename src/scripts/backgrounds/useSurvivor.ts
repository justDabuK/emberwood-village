import { type Creature, type Skill, TypeOfRest } from "../cheatSheetTypes.ts";
import { getProficiencyBonus } from "../getProficiencyBonus.ts";

export const useSurvivor = (firstSkill: Skill, secondSkill: Skill) => {
  const preCreatureCreation = (skillProficiencies: Skill[]) => {
    skillProficiencies.push(firstSkill, secondSkill);
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    if (creatureList[0].characterLevel === undefined) {
      return;
    }

    creatureList[0].sectionList
      .find((section) => section.title === "Features")
      ?.subsections?.push({
        title: "Makeshift meals",
        usages: {
          flags: [false],
          typeOfRest: TypeOfRest.LONG,
        },
        description: `${creatureList[0].characterLevel} HP for ${getProficiencyBonus(creatureList[0].characterLevel)} creatures during short rest, 1 per long rest`,
      });
  };

  return {
    preCreatureCreation,
    postCreatureCreation,
  };
};
