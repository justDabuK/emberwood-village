import {
  type AbilityScores,
  type Creature,
  Skill,
} from "../cheatSheetTypes.ts";

export const useDireWolf = () => {
  const direWolfAbilityScores: AbilityScores = {
    STR: 17,
    DEX: 15,
    CON: 15,
    INT: 3,
    WIS: 12,
    CHA: 7,
  };
  const direWolfSavingThrowProficiencyList: (keyof AbilityScores)[] = [];
  const direWolfSkillProficiencies: Skill[] = [Skill.Perception, Skill.Stealth];
  const direWolfProficiencyBonus = 2;

  const direWolf = {
    name: "Dire Wolf",
    hitPoints: {
      current: 37,
      max: 37,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 14,
    abilityScores: direWolfAbilityScores,
    savingThrowProficiencyList: direWolfSavingThrowProficiencyList,
    skill: {
      proficiencies: direWolfSkillProficiencies,
      expertise: [],
    },
    proficiencyBonus: direWolfProficiencyBonus,
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Bite Attack",
            dice: "d20+5",
            description: "DC 13 STR save or knocked prone",
            items: [{ name: "Bite", dice: "2d6+3" }],
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
            title: "Walking 50ft.",
            description: "(10 squares)",
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Keen Hearing and Smell",
            description:
              "Advantage on Perception checks that rely on hearing or smell.",
          },
          {
            title: "Pack Tactics",
            description:
              "Advantage on attacks when at least one allie within 5 ft.",
          },
        ],
      },
    ],
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList.push(direWolf);
  };

  return {
    postCreatureCreation,
  };
};
