import {
  type AbilityScores,
  type Creature,
  Skill,
} from "../cheatSheetTypes.ts";

export const useGiantSpider = () => {
  const giantSpiderAbilityScores: AbilityScores = {
    STR: 14,
    DEX: 16,
    CON: 12,
    INT: 2,
    WIS: 11,
    CHA: 4,
  };
  const giantSpiderSavingThrowProficiencyList: (keyof AbilityScores)[] = [];
  const giantSpiderSkillProficiencies: Skill[] = [Skill.Stealth];
  const giantSpiderProficiencyBonus = 2;

  const giantSpider = {
    name: "Giant Spider",
    hitPoints: {
      current: 26,
      max: 26,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 14,
    abilityScores: giantSpiderAbilityScores,
    savingThrowProficiencyList: giantSpiderSavingThrowProficiencyList,
    skill: {
      proficiencies: giantSpiderSkillProficiencies,
      expertise: [],
    },
    proficiencyBonus: giantSpiderProficiencyBonus,
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Melee Attack",
            dice: "d20+5",
            description: "DC 11 CON save or 2d8 poison dmg(or half)",
            items: [{ name: "Bite", dice: "1d8+3" }],
          },
          {
            title: "Ranged Attack (Web)",
            dice: "d20+5",
            description:
              "target is restrained. Can use STR save as action to break free. Web has AC 10, 5 HP",
            items: [{ name: "Web (30/60 ft.)", dice: "DC 12" }],
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
            title: "Walking 30ft.",
            description: "(6 squares)",
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
            title: "Spider Climb",
            description: "Can climb difficult surfaces, including upside down",
          },
          {
            title: "Web Sense",
            description:
              "While in contact with a web, knows exact location of everything in contact with the web",
          },
          {
            title: "Web Walker",
            description: "Ignore movement restrictions caused by webbing",
          },
          {
            title: "Blindsight",
            description: "10 ft. (2 squares)",
          },
          {
            title: "Darkvision",
            description: "60 ft. (12 squares)",
          },
        ],
      },
    ],
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList.push(giantSpider);
  };

  return {
    postCreatureCreation,
  };
};
