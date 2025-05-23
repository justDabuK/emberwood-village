import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../../scripts/cheatSheetTypes.ts";
import { getUnarmoredDefenseArmorClass } from "../../../scripts/armorClassUtils.ts";
import { getProficiencyBonus } from "../../../scripts/getProficiencyBonus.ts";
import { useStorage } from "@vueuse/core";

export const useJyzznCreatureList = () => {
  const LEVEL = 4;
  const JAZZ_PROFICIENCY_BONUS = 2;
  const JAZZ_NUMBER_OF_RAGES = 3;
  const JAZZ_RAGE_DAMAGE = 2;

  const RACIAL_PLUS_2 = 2;
  const RACIAL_PLUS_1 = 1;
  const DRAGON_FEAR_PLUS_1 = 1;

  const ABILITY_SCORES: AbilityScores = {
    STR: 17 + RACIAL_PLUS_2,
    DEX: 13 + RACIAL_PLUS_1,
    CON: 15 + DRAGON_FEAR_PLUS_1,
    INT: 8,
    WIS: 10,
    CHA: 12,
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
    "STR",
    "CON",
  ];

  const SKILL_PROFICIENCIES = [
    Skill.Athletics,
    Skill.Survival,
    Skill.Persuasion,
    Skill.Intimidation,
  ];

  const SKILL_EXPERTISE: Skill[] = [];

  const breathWeaponDamageDiceNumber = () => {
    if (LEVEL < 5) {
      return 1;
    } else if (LEVEL < 11) {
      return 2;
    } else if (LEVEL < 17) {
      return 3;
    } else {
      return 4;
    }
  };

  const contaminatedFuryExtraDamage = () => {
    if (LEVEL < 10) {
      return "1d8";
    } else if (LEVEL < 14) {
      return "2d8";
    } else {
      return "3d8";
    }
  };

  const defaultJazzCreatureList: Creature[] = [
    {
      name: "Jyzzn",
      characterLevel: LEVEL,
      hitPoints: {
        current: 12 + MODIFIER.CON + (7 + MODIFIER.CON) * (LEVEL - 1),
        max: 12 + MODIFIER.CON + (7 + MODIFIER.CON) * (LEVEL - 1),
        temporary: 0,
        hitDice: {
          flags: [...Array(LEVEL)].fill(false),
          description: "d12",
          typeOfRest: TypeOfRest.LONG,
        },
      },
      contamination: 0,
      exhaustion: 0,
      armorClass: getUnarmoredDefenseArmorClass(MODIFIER.DEX, MODIFIER.CON),
      initiative: MODIFIER.DEX,
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
              title: "Weapon Attack",
              dice: `d20+${JAZZ_PROFICIENCY_BONUS + MODIFIER.STR}/+${JAZZ_PROFICIENCY_BONUS + MODIFIER.STR + 1}`,
              items: [
                {
                  name: "Twillight (Maul)",
                  dice: `2d6+${MODIFIER.STR + 1}(+${contaminatedFuryExtraDamage()}+${MODIFIER.STR + JAZZ_RAGE_DAMAGE + 1} R)`,
                },
                {
                  name: "Greataxe",
                  dice: `1d12+${MODIFIER.STR}(+${contaminatedFuryExtraDamage()}+${MODIFIER.STR + JAZZ_RAGE_DAMAGE} R)`,
                },
                {
                  name: "Javelin (30/120 ft.)",
                  dice: `1d6+${MODIFIER.STR}(+${contaminatedFuryExtraDamage()}+${MODIFIER.STR + JAZZ_RAGE_DAMAGE} R)`,
                },
                {
                  name: "Handaxe (20/60 ft.)",
                  dice: `1d6+${MODIFIER.STR}(+${contaminatedFuryExtraDamage()}+${MODIFIER.STR + JAZZ_RAGE_DAMAGE} R)`,
                },
              ],
            },
            {
              title: "Breath Weapon",
              usages: {
                flags: [...Array(JAZZ_PROFICIENCY_BONUS)].fill(false),
                typeOfRest: TypeOfRest.LONG,
              },
              items: [
                {
                  name: "Octarine Breath Weapon (15 ft.)",
                  dice: `DC ${8 + MODIFIER.CON + JAZZ_PROFICIENCY_BONUS} DEX save`,
                },
                {
                  name: "Dragon Fear (30 ft.)",
                  dice: `DC ${8 + JAZZ_PROFICIENCY_BONUS + MODIFIER.CHA} WIS save`,
                },
              ],
            },
            {
              title: "Coiling Grasp Tattoo",
              dice: "DC 14 STR/DEX save",
              description:
                "3d6 force damage, grappled. Reach is 15 ft. (3 Felder)",
            },
            {
              title: "Pin down (from Grappler)",
              description:
                "restrain a creature you are grappling (everyone gets advantage on attacks against it & you, you and it have disadvantage on attack rolls)",
              dice: `d20+${JAZZ_PROFICIENCY_BONUS + MODIFIER.STR}`,
            },
          ],
        },
        {
          title: "Contaminated Fury",
          used: false,
          subsections: [
            {
              title: "Per contamination level ->",
              description:
                "gain level of contamination, deal an extra 2d8 necrotic damage for each level ",
              dice: "+2d8 dmg",
            },
          ],
        },
        {
          title: "Reckless Attack",
          used: false,
          subsections: [
            {
              title: "Advantage on demand",
              description:
                "advantage on attack rolls, but attackers also have advantage against you. Use when you don't hit",
            },
          ],
        },
        {
          title: "Bonus Action",
          used: false,
          subsections: [
            {
              title: "Rage",
              usages: {
                flags: [...Array(JAZZ_NUMBER_OF_RAGES)].fill(false),
                typeOfRest: TypeOfRest.LONG,
              },
              description:
                "resistance to bludgeoning, piercing, and slashing damage. +2 damage. Advantage on Strength ability checks & saving throws",
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
              title: "Long Jump",
              description: `10ft.(2 Felder) run-up, ${ABILITY_SCORES.STR}ft. (${Math.floor(ABILITY_SCORES.STR / 5)} Felder) jump`,
            },
            {
              title: "High Jump",
              description: `10ft.(2 Felder) run-up, ${3 + MODIFIER.STR}ft. (${Math.floor((3 + MODIFIER.STR) / 5)} Felder) jump`,
            },
          ],
        },
        {
          title: "Features",
          subsections: [
            {
              title: "Psionic Mind",
              description: "30ft. telepathy",
            },
            {
              title: "Draconic Resistance",
              description: "resistance to force damage",
            },
            {
              title: "Noble Confidence",
              usages: {
                flags: [...Array(JAZZ_PROFICIENCY_BONUS)].fill(false),
                typeOfRest: TypeOfRest.SHORT,
              },
              description: `give 1d4 bonus to ability check, saving throw or attack roll to an ally (during a short rest)`,
            },
            {
              title: "Innured to Corruption",
              description:
                "If a spell removes your contamination, the caster doesn't need material components. You don't gain exhaustion from getting rid of contamination",
            },
            {
              title: "Grappler",
              description:
                "advantage on attack rolls against creatures you are grappling",
            },
          ],
        },
        {
          title: "Octarine Breath Weapon",
          subsections: [
            {
              title: "15ft. cone",
              dice: `DEX save DC ${8 + MODIFIER.CON + JAZZ_PROFICIENCY_BONUS}`,
            },
          ],
          description:
            "You breathe a cone of prismatic rays. Each ray is a different color and has a different power and purpose. Roll a d6 for every target effected by the breath weapon to determine wich color ray effects it",
          table: {
            headers: ["d6", "effect"],
            rows: [
              {
                content: [
                  "1",
                  `The target takes ${breathWeaponDamageDiceNumber()}d10 psychic damage on a failed save, or half as much damage on a success`,
                ],
                backgroundColor: "darkgreen",
              },
              {
                content: [
                  "2",
                  `The target takes ${breathWeaponDamageDiceNumber()}d10 necrotic damage on a failed save, or half as much damage on a success`,
                ],
                backgroundColor: "darkgoldenrod",
              },
              {
                content: [
                  "3",
                  `The target takes ${breathWeaponDamageDiceNumber()}d10 force damage on a failed save, or half as much damage on a success`,
                ],
                backgroundColor: "purple",
              },
              {
                content: [
                  "4",
                  `The target takes ${breathWeaponDamageDiceNumber()}d10 radiant damage on a failed save, or half as much damage on a success`,
                ],
                backgroundColor: "grey",
              },
              {
                content: [
                  "5",
                  `The target takes ${breathWeaponDamageDiceNumber()}d10 thunder damage on a failed save, or half as much damage on a success`,
                ],
                backgroundColor: "darkblue",
              },
              {
                content: [
                  "6",
                  "The target is struck by an additional ray. Roll on this table twice more. There’s no limit to how many additional rays can strike a single creature in this manner",
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
    "jazz-creature-list",
    defaultJazzCreatureList,
  );
  const resetToDefault = () => {
    creatureList.value = defaultJazzCreatureList;
  };
  const notesStorage = useStorage<string>("jazz-notes", "");

  return {
    creatureList,
    notesStorage,
    resetToDefault,
  };
};
