import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
} from "../cheatSheetTypes.ts";

const owlAbilityScores: AbilityScores = {
  STR: 3,
  DEX: 13,
  CON: 8,
  INT: 2,
  WIS: 12,
  CHA: 7,
};

const owlSavingThrowProficiencyList: (keyof AbilityScores)[] = [];
const owlSkillProficiencies: Skill[] = [Skill.Perception, Skill.Stealth];
const owlProficiencyBonus = 2;

export const owl: Creature = {
  name: "Owl",
  hitPoints: {
    current: 1,
    max: 1,
  },
  contamination: 0,
  exhaustion: 0,
  armorClass: 11,
  abilityScores: owlAbilityScores,
  savingThrowProficiencyList: owlSavingThrowProficiencyList,
  skill: {
    proficiencies: owlSkillProficiencies,
    expertise: [],
  },
  proficiencyBonus: owlProficiencyBonus,
  sectionList: [
    {
      title: "Action",
      used: false,
      subsections: [
        {
          title: "Help",
          description: "Give advantage to next attacker",
        },
        {
          title: "Weapon Attack",
          dice: `d20+${getModifier(owlAbilityScores.DEX) + owlProficiencyBonus}`,
          items: [{ name: "Talons", dice: "1" }],
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
          title: "Walking 5ft.",
          description: "(1 Feld)",
        },
        {
          title: "Flying 60ft.",
          description: "(12 Felder)",
        },
      ],
    },
    {
      title: "Features",
      subsections: [
        {
          title: "Flyby",
          description: "No opportunity attacks while flying",
        },
        {
          title: "Keen Hearing and Sight",
          description: "Advantage on perception checks when hearing or seeing",
        },
        {
          title: "Darkvision",
          description: "120 ft. (24 squares)",
        },
      ],
    },
  ],
};
