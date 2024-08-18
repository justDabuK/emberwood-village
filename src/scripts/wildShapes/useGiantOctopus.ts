import {
  type AbilityScores,
  type Creature,
  Skill,
  TypeOfRest,
} from "../cheatSheetTypes.ts";

export const useGiantOctopus = () => {
  const giantOctopusAbilityScores: AbilityScores = {
    STR: 17,
    DEX: 13,
    CON: 13,
    INT: 4,
    WIS: 10,
    CHA: 4,
  };
  const giantOctopusProficiencyBonus = 2;

  const giantOctopus: Creature = {
    name: "Giant Octopus",
    hitPoints: {
      current: 52,
      max: 52,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 11,
    abilityScores: giantOctopusAbilityScores,
    savingThrowProficiencyList: [],
    skill: {
      proficiencies: [Skill.Perception, Skill.Stealth],
      expertise: [],
    },
    proficiencyBonus: giantOctopusProficiencyBonus,
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Tentacles ",
            dice: "d20+5",
            description: "target is grappled & restrained (escape DC 16)",
            items: [{ name: "Tentacle (15ft.)", dice: "2d6+3" }],
          },
          {
            title: "Ink Cloud",
            usages: {
              flags: [false],
              typeOfRest: TypeOfRest.SHORT,
            },
            description:
              "if underwater, 20 ft. cloud. Area is heavily obscured for 1 minute",
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
          {
            title: "Dash",
            description: `If Ink Cloud as action`,
          },
        ],
      },
      {
        title: "Reaction",
        used: false,
        subsections: [
          {
            title: "Opportunity Attack",
            description: "See Attack",
          },
        ],
      },
      {
        title: "Movement",
        used: false,
        subsections: [
          {
            title: "Walking 10ft.",
            description: "(2 squares)",
          },
          {
            title: "Swimming 60ft.",
            description: "(10 squares)",
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Water Breathing",
            description: "can only breath under water",
          },
          {
            title: "Hold Breath",
            description: "can hold breath out of water for 1 hour",
          },
          {
            title: "Underwater Camouflage",
            description: "advantage on Stealth checks while underwater",
          },
        ],
      },
    ],
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList.push(giantOctopus);
  };

  return {
    postCreatureCreation,
  };
};
