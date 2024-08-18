import type { AbilityScores, Creature } from "../cheatSheetTypes.ts";

export const useGiantToad = () => {
  const giantToadAbilityScores: AbilityScores = {
    STR: 15,
    DEX: 13,
    CON: 13,
    INT: 2,
    WIS: 10,
    CHA: 3,
  };
  const giantToadProficiencyBonus = 2;

  const giantToad: Creature = {
    name: "Giant Toad",
    hitPoints: {
      current: 39,
      max: 39,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 11,
    abilityScores: giantToadAbilityScores,
    savingThrowProficiencyList: [],
    skill: {
      proficiencies: [],
      expertise: [],
    },
    proficiencyBonus: giantToadProficiencyBonus,
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Bite Attack",
            dice: "d20+4",
            description: "target is grappled & restrained (escape DC 13)",
            items: [{ name: "Bite", dice: "1d10+2+1d10" }],
          },
          {
            title: "Swallow",
            dice: "d20+4",
            description:
              "on hit, target is additionally swallowed-> blinded & restrained, and takes 3d6 acid damage at the start of your turn",
            items: [{ name: "Bite", dice: "1d10+2+1d10" }],
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
            description: "See Attack",
          },
        ],
      },
      {
        title: "Movement",
        used: false,
        subsections: [
          {
            title: "Walking 20ft.",
            description: "(4 squares)",
          },
          {
            title: "Swimming 40ft.",
            description: "(8 squares)",
          },
          {
            title: "Long jump (standing leap)",
            description: "20 ft. (4 squares)",
          },
          {
            title: "High jump (standing leap)",
            description: "10 ft. (2 squares)",
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Amphibious",
            description: "breath air and water",
          },
          {
            title: "Darkvision",
            description: "30 ft. (6 squares)",
          },
        ],
      },
    ],
  };

  const postCreatureCreation = (creatureList: Creature[]) => {
    creatureList.push(giantToad);
  };

  return {
    postCreatureCreation,
  };
};
