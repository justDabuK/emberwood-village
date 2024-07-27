import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../scripts/cheatSheetTypes.ts";
import { getStuddedLeatherArmorClass } from "../../scripts/armorClassUtils.ts";
import { getProficiencyBonus } from "../../scripts/getProficiencyBonus.ts";
import { useStorage } from "@vueuse/core";

export const useRemmiCreatureList = () => {
  const LEVEL = 4;
  const PROFICIENCY_BONUS = 2;
  const getSneakAttackDice = () => {
    if (LEVEL < 3) {
      return "1d6";
    } else if (LEVEL < 5) {
      return "2d6";
    } else if (LEVEL < 7) {
      return "3d6";
    } else if (LEVEL < 9) {
      return "4d6";
    } else if (LEVEL < 11) {
      return "5d6";
    } else if (LEVEL < 13) {
      return "6d6";
    } else if (LEVEL < 15) {
      return "7d6";
    } else if (LEVEL < 17) {
      return "8d6";
    } else if (LEVEL < 19) {
      return "9d6";
    } else {
      return "10d6";
    }
  };

  const racialBonusPlus2 = 2;
  const racialBonusPlus1 = 1;
  const actorBonus = 1;

  const ABILITY_SCORES: AbilityScores = {
    STR: 8,
    DEX: 17 + racialBonusPlus2,
    CON: 13,
    INT: 12,
    WIS: 10,
    CHA: 15 + racialBonusPlus1 + actorBonus,
  };

  const MODIFIER: AbilityScores = {
    STR: getModifier(ABILITY_SCORES.STR),
    DEX: getModifier(ABILITY_SCORES.DEX),
    CON: getModifier(ABILITY_SCORES.CON),
    INT: getModifier(ABILITY_SCORES.INT),
    WIS: getModifier(ABILITY_SCORES.WIS),
    CHA: getModifier(ABILITY_SCORES.CHA),
  };

  const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = [
    "DEX",
    "INT",
  ];

  const SKILL_PROFICIENCIES = [
    Skill.Athletics,
    Skill.Acrobatics,
    Skill.Stealth,
    Skill.ThievesTools,
    Skill.History,
    Skill.Perception,
    Skill.Performance,
  ];

  const SKILL_EXPERTISE = [Skill.Deception, Skill.Persuasion];

  const dualWielderArmorclassBonus = 1;

  const defaultCreatureList: Creature[] = [
    {
      name: "Remmi",
      characterLevel: LEVEL,
      hitPoints: {
        current: 8 + MODIFIER.CON + (5 + MODIFIER.CON) * (LEVEL - 1),
        max: 8 + MODIFIER.CON + (5 + MODIFIER.CON) * (LEVEL - 1),
        temporary: 0,
        hitDice: {
          flags: [...Array(LEVEL)].fill(false),
          description: "d8",
          typeOfRest: TypeOfRest.LONG,
        },
      },
      contamination: 0,
      exhaustion: 0,
      armorClass:
        getStuddedLeatherArmorClass(MODIFIER.DEX) + dualWielderArmorclassBonus,
      initiative: MODIFIER.DEX + MODIFIER.CHA,
      abilityScores: ABILITY_SCORES,
      savingThrowProficiencyList: SAVING_THROW_PROFICIENCIES_LIST,
      skill: {
        proficiencies: SKILL_PROFICIENCIES,
        expertise: SKILL_EXPERTISE,
      },
      proficiencyBonus: getProficiencyBonus(LEVEL),
      inspiration: false,
      sectionList: [
        {
          title: "Action",
          used: false,
          subsections: [
            {
              title: "2 Weapon Attacks (Dual Wielder)",
              dice: `d20+${MODIFIER.DEX + PROFICIENCY_BONUS}`,
              items: [
                { name: "Schimmel Pimmel", dice: `1d8+1d8+${MODIFIER.DEX}` },
                { name: "Shortsword", dice: `1d6+${MODIFIER.DEX}` },
              ],
            },
            {
              title: "Hat of Disguise",
              description: "Disguise Self at will as an action",
            },
          ],
        },
        {
          title: "Sneak Attack",
          used: false,
          subsections: [
            {
              title: "Sneak Attack",
              description:
                "if advantage, OR ally within 5ft. of target OR no one within 5ft. of you AND no disadvantage",
              items: [
                {
                  name: "Damage",
                  dice: getSneakAttackDice(),
                },
              ],
            },
          ],
        },
        {
          title: "Bonus Action",
          used: false,
          subsections: [
            {
              title: "Cunning Action",
              description: "Dash, Disengage, or Hide",
            },
            {
              title: "Activate Schimmel Pimmel",
              description: "see Schimmel Pimmel section",
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
              description: "(6 Felder)",
            },
            {
              title: "Climbing 30ft.",
              description: "(6 Felder)",
            },
            {
              title: "Feline Agility",
              usages: {
                flags: [false],
              },
              description:
                "Double movement speed for one turn, reactivates if 0 movement on 1 turn",
            },
          ],
        },
        {
          title: "Features",
          subsections: [
            {
              title: "Actor",
              description:
                "Advantage on Deception & Performance if impersonating",
            },
            {
              title: "Noble Confidence",
              usages: {
                flags: [...Array(PROFICIENCY_BONUS)].fill(false),
                typeOfRest: TypeOfRest.SHORT,
              },
              description: `give 1d4 bonus to ability check, saving throw or attack roll, to ${PROFICIENCY_BONUS} allies per short rest`,
            },
            {
              title: "Fancy Footwork",
              description:
                "no opportunity attacks from target when meleed before",
            },
          ],
        },
        {
          title: "Schimmel Pimmel",
          description:
            "You can use a bonus action to speak its name, causing it to set its appareance for 1 minute. Roll a d6 to determine the effect",
          subsections: [
            {
              title: "The sword taketh and the sword giveth",
              usages: {
                flags: [...Array(3)].fill(false),
                typeOfRest: TypeOfRest.LONG,
              },
              description:
                "When you hit a creature with an attack roll using the sword, you can expend 1 charge to regain a number of hit points equal to the extra damage the sword dealt. The sword regains 1d3 expended charges daily at dawn.",
            },
          ],
          table: {
            headers: ["d6", "effect"],
            rows: [
              {
                content: [
                  "1",
                  "The sword takes the form of a green emerald and deals an extra 1d8 psychic damage",
                ],
                backgroundColor: "darkgreen",
              },
              {
                content: [
                  "2",
                  "The sword takes the form of a yellow topaz and deals an extra 1d8 necrotic damage",
                ],
                backgroundColor: "darkgoldenrod",
              },
              {
                content: [
                  "3",
                  "The sword takes the form of a purple amathyst and deals an extra 1d8 force damage",
                ],
                backgroundColor: "purple",
              },
              {
                content: [
                  "4",
                  "The sword takes the form of a white crystal and deals an extra 1d8 radiant damage",
                ],
                backgroundColor: "grey",
              },
              {
                content: [
                  "5",
                  "The sword takes the form of a blue saphire and deals an extra 1d8 thunder damage",
                ],
                backgroundColor: "darkblue",
              },
              {
                content: [
                  "6",
                  "The sword takes on two forms. Roll on this table twice more. There’s no limit to how many additional colors the sword can take on in this manner",
                ],
                backgroundColor:
                  "linear-gradient(45deg, darkgreen, darkgoldenrod, purple, grey, darkblue)",
              },
            ],
          },
        },
      ],
    },
  ];

  const creatureList = useStorage<Creature[]>(
    "remi-creature-list",
    defaultCreatureList,
  );

  const resetToDefault = () => {
    creatureList.value = defaultCreatureList;
  };
  const notesStorage = useStorage<string>("remi-notes", "");

  return {
    creatureList,
    notesStorage,
    resetToDefault,
  };
};
