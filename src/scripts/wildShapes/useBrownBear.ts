import {
  type AbilityScores,
  type Creature,
  Skill,
} from "../cheatSheetTypes.ts";

export const useBrownBear = () => {
  const brownBearAbilityScores: AbilityScores = {
    STR: 19,
    DEX: 10,
    CON: 16,
    INT: 2,
    WIS: 13,
    CHA: 7,
  };
  const brownBearSavingThrowProficiencyList: (keyof AbilityScores)[] = [];
  const brownBearSkillProficiencies: Skill[] = [Skill.Perception];
  const brownBearProficiencyBonus = 2;

  const brownBear = {
    name: "Brown Bear",
    hitPoints: {
      current: 34,
      max: 34,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 11,
    abilityScores: brownBearAbilityScores,
    savingThrowProficiencyList: brownBearSavingThrowProficiencyList,
    skill: {
      proficiencies: brownBearSkillProficiencies,
      expertise: [],
    },
    proficiencyBonus: brownBearProficiencyBonus,
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Multiattack(one of each)",
            dice: "d20+6",
            items: [
              { name: "Bite", dice: "1d8+4" },
              { name: "Claw", dice: "2d6+4" },
            ],
          },
        ],
      },
      {
        title: "Bonus Action",
        used: false,
        subsections: [
          {
            title: "Combat wild shape",
            description: `Use spell slots for healing`,
            dice: "1d8*Lvl",
          },
        ],
      },
      {
        title: "Reaction",
        used: false,
        subsections: [
          {
            title: "Opportunity Attack",
            description: "See Weapon Attack",
          },
        ],
      },
      {
        title: "Movement",
        used: false,
        subsections: [
          {
            title: "Walking 40ft.",
            description: "(8 squares)",
          },
          {
            title: "Climbing 30ft.",
            description: "(6 squares)",
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Keen Smell",
            description: "Advantage on Perception checks that rely on smell.",
          },
        ],
      },
    ],
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList.push(brownBear);
  };

  return {
    postCreatureCreation,
  };
};
