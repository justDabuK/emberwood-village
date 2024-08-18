import { Spell } from "../../../scripts/spellUtils.ts";
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../../scripts/cheatSheetTypes.ts";
import { getHideArmorClass } from "../../../scripts/armorClassUtils.ts";
import { getProficiencyBonus } from "../../../scripts/getProficiencyBonus.ts";
import { useStorage } from "@vueuse/core";
import { useTelepathic } from "../../../scripts/feats/telepathic.ts";
import { owl } from "../../../scripts/familiars/owl.ts";
import { useAbilityScoreImprovement } from "../../../scripts/feats/abilityScoreImprovement.ts";
import { useMageborn } from "../../../scripts/backgrounds/useMageborn.ts";

export const useBenedyktCreatureList = () => {
  const LEVEL = 4;

  const knownSpellNameList = [
    // --- feat spells ---
    Spell.FindFamiliar, // lab assistant
    // --- mutagenist spells ---
    Spell.Jump,
    Spell.ToxicShield,
    Spell.AlterSelf,
    Spell.EnhanceAbility,
    // --- Cantrips:  4 ---
    Spell.ShockingGrasp,
    Spell.PoisonNeedle,
    Spell.SpareTheDying,
    Spell.Thaumaturgy,
    // --- known spells : 9 ---
    Spell.HealingWord,
    Spell.Identify,
    Spell.Infect,
    Spell.StreamOfConsumption,
    Spell.UnseenServant,
    Spell.CausticGrip,
    Spell.EnlargeReduce,
    Spell.HoldPerson,
    Spell.WitherAndBloom,
  ];

  const getCantripsKnown = (level: number) => {
    if (level < 4) {
      return 3;
    } else if (level < 10) {
      return 4;
    } else {
      return 5;
    }
  };

  const getSpellsKnown = (level: number, intModifier: number) =>
    level + intModifier;

  const getSpellSlots = (level: number) => {
    if (level === 1) {
      return 1;
    } else if (level < 5) {
      return 2;
    } else if (level < 9) {
      return 3;
    } else if (level < 13) {
      return 4;
    } else if (level < 17) {
      return 5;
    } else {
      return 6;
    }
  };

  const getSlotLevel = (level: number) => {
    if (level < 3) {
      return 1;
    } else if (level < 5) {
      return 2;
    } else if (level < 7) {
      return 3;
    } else if (level < 9) {
      return 4;
    } else {
      return 5;
    }
  };

  const getTheoriesKnown = (level: number) => {
    if (level === 1) {
      return 0;
    } else {
      return Math.floor(level / 2) + 1;
    }
  };

  const racialBonusPlus2 = 2;
  const racialBonusPlus1 = 1;

  const ABILITY_SCORES: AbilityScores = {
    STR: 8,
    DEX: 12,
    CON: 14,
    INT: 15 + racialBonusPlus2,
    WIS: 13 + racialBonusPlus1,
    CHA: 10,
  };

  const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = [
    "INT",
    "WIS",
  ];

  const SKILL_PROFICIENCIES: Skill[] = [
    Skill.History, // apothecary
    Skill.Investigation, // apothecary
    Skill.Nature, // mutagenist
    Skill.Arcana, // mageborn
    Skill.Perception, // mageborn
    // TODO: add tool proficiencies
  ];

  const SKILL_EXPERTISE: Skill[] = [
    Skill.Insight, // bedside manners
    Skill.Persuasion, // bedside manners
  ];

  // --- pre creation stuff ---
  const {
    preCreatureCreation: applyMagebornPreCreation,
    postCreatureCreation: applyMagebornPostCreation,
  } = useMageborn(Skill.Arcana, Skill.Perception); // background
  const {
    preCreatureCreation: applyTelepathicPreCreation,
    postCreatureCreation: applyTelepathicPostCreation,
  } = useTelepathic("INT"); // beginner feat
  const { preCreatureCreation: applyASI } = useAbilityScoreImprovement(
    "INT",
    "INT",
  ); // 4th level

  applyMagebornPreCreation(SKILL_PROFICIENCIES);
  applyTelepathicPreCreation(ABILITY_SCORES, knownSpellNameList);
  applyASI(ABILITY_SCORES); // 4th level

  const benedykt: Creature = {
    name: "Benedykt",
    characterLevel: LEVEL,
    hitPoints: {
      current:
        8 +
        getModifier(ABILITY_SCORES.CON) +
        (5 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1),
      max:
        8 +
        getModifier(ABILITY_SCORES.CON) +
        (5 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1),
      temporary: 0,
      hitDice: {
        flags: [...Array(LEVEL)].fill(false),
        description: "d8",
        typeOfRest: TypeOfRest.LONG,
      },
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: getHideArmorClass(getModifier(ABILITY_SCORES.DEX)),
    initiative: getModifier(ABILITY_SCORES.DEX),
    abilityScores: ABILITY_SCORES,
    savingThrowProficiencyList: SAVING_THROW_PROFICIENCIES_LIST,
    proficiencyBonus: getProficiencyBonus(LEVEL),
    skill: {
      proficiencies: SKILL_PROFICIENCIES,
      expertise: SKILL_EXPERTISE,
    },
    inspiration: false,
    magic: {
      spellSlots: {
        [getSlotLevel(LEVEL)]: {
          flags: [...Array(getSpellSlots(LEVEL))].fill(false),
          max: getSpellSlots(LEVEL),
        },
      },
      refresh: TypeOfRest.SHORT,
      concentration: false,
      spellSaveDiceCheck:
        8 + getModifier(ABILITY_SCORES.INT) + getProficiencyBonus(LEVEL),
      spellAttackModifier:
        getModifier(ABILITY_SCORES.INT) + getProficiencyBonus(LEVEL),
    },
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Weapon Attack",
            dice: `d20+${getModifier(ABILITY_SCORES.DEX) + getProficiencyBonus(LEVEL)}`,
            items: [
              {
                name: "Shortsword",
                dice: `1d6+${getModifier(ABILITY_SCORES.DEX)}`,
              },
              {
                name: "Crossbow light (80/320ft.)",
                dice: `1d8+${getModifier(ABILITY_SCORES.DEX)}`,
              },
              {
                name: "Handaxe (20/60ft.)",
                dice: `1d6+${getModifier(ABILITY_SCORES.DEX)}`,
              },
              {
                name: "Dagger",
                dice: `1d4+${getModifier(ABILITY_SCORES.DEX)}`,
              },
            ],
          },
          {
            title: "Healer's kit",
            usages: {
              flags: [...Array(10)].fill(false),
            },
            description: "stabilize creature",
          },
          {
            title: "Spell casting",
            description: "See spell casting cheat sheet",
          },
        ],
      },
      {
        title: "Bonus Action",
        used: false,
        subsections: [
          {
            title: "Spell casting",
            description: "See spell casting cheat sheet",
          },
          {
            title: "Adrenaline Rush",
            description: `dash & ${getProficiencyBonus(LEVEL)} THP`,
            usages: {
              flags: [...Array(getProficiencyBonus(LEVEL))].fill(false),
              typeOfRest: TypeOfRest.LONG,
            },
          },
          {
            title: "Transmogrifying Elixir",
            description: "see Big Ben",
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
          {
            title: "Spell casting",
            description: "See spell casting cheat sheet",
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
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Darkvision",
            description: "60 ft. (12 squares)",
          },
          {
            title: "Powerful Build",
            description:
              "One size larger when determinig carrying capacity and weight I can push, drag or lift",
          },
          {
            title: "Relentless Endurance",
            description: "when reduced to 0 HP instead 1 HP",
            usages: {
              flags: [false],
              typeOfRest: TypeOfRest.LONG,
            },
          },
          {
            title: "Languages",
            description: "Common, Draconic, Elvish, Dwarvish, Orc",
          },
        ],
      },
      {
        title: "Esoteric Theories",
        subsections: [
          {
            title: "Laboratory Assistant",
            description: "You know Find Familiar",
          },
          {
            title: "Pharmacology",
            description: `When healing, add +${getModifier(ABILITY_SCORES.INT)} to the amount`,
          },
          {
            title: "Bedside Manner",
            description: `Expertise in Insight & Persuasion`,
          },
        ],
      },
    ],
  };

  const defaultCreatureList: Creature[] = [
    benedykt,
    {
      ...benedykt,
      name: "Big Ben",
      hitPoints: {
        current:
          8 +
          getModifier(ABILITY_SCORES.CON) +
          (5 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1),
        max:
          8 +
          getModifier(ABILITY_SCORES.CON) +
          (5 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1),
        temporary: 5 * LEVEL,
        hitDice: {
          flags: [...Array(LEVEL)].fill(false),
          description: "d8",
          typeOfRest: TypeOfRest.LONG,
        },
      },
      armorClass: 13 + getSlotLevel(LEVEL),
      abilityScores: {
        ...ABILITY_SCORES,
        STR: ABILITY_SCORES.INT,
        INT: ABILITY_SCORES.STR,
      },
      sectionList: [
        {
          title: "Action",
          used: false,
          subsections: [
            {
              title: "Weapon Attack",
              dice: `d20+${getModifier(ABILITY_SCORES.INT) + getProficiencyBonus(LEVEL)}`,
              items: [
                {
                  name: "Meaty Fist",
                  dice: `1d10+${getModifier(ABILITY_SCORES.INT) + LEVEL}`,
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
              title: "Adrenaline Rush",
              description: `dash & ${getProficiencyBonus(LEVEL)} THP`,
              usages: {
                flags: [...Array(getProficiencyBonus(LEVEL))].fill(false),
                typeOfRest: TypeOfRest.LONG,
              },
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
              title: `Walking ${30 + 5 * getSlotLevel(LEVEL)}ft.`,
              description: `(${Math.floor((30 + 5 * getSlotLevel(LEVEL)) / 5)} squares)`,
            },
            {
              title: "Long Jump",
              description: `10 ft. run-up, ${ABILITY_SCORES.INT * 2}ft. (${Math.floor((ABILITY_SCORES.INT * 2) / 5)} squares) jump`,
            },
            {
              title: "High Jump",
              description: `10ft.(2 squares) run-up, ${(3 + getModifier(ABILITY_SCORES.INT)) * 2}ft. (${Math.floor(((3 + getModifier(ABILITY_SCORES.INT)) * 2) / 5)} squares) jump`,
            },
          ],
        },
        {
          title: "Features",
          subsections: [
            {
              title: "Darkvision",
              description: "120 ft. (24 squares)",
            },
            {
              title: "Auto healing",
              description: `regain ${getSlotLevel(LEVEL)} HP at start of turn`,
            },
            {
              title: "Powerful Build",
              description:
                "One size larger when determinig carrying capacity and weight I can push, drag or lift",
            },
            {
              title: "Relentless Endurance",
              description: "when reduced to 0 HP instead 1 HP",
              usages: {
                flags: [false],
                typeOfRest: TypeOfRest.LONG,
              },
            },
            {
              title: "Languages",
              description: "Common, Draconic, Elvish, Dwarvish, Orc",
            },
          ],
        },
      ],
    },
    {
      ...owl,
      name: "Lil' Ben",
    },
  ];

  // --- post creation stuff ---
  applyMagebornPostCreation(defaultCreatureList);
  applyTelepathicPostCreation(defaultCreatureList);

  const creatureList = useStorage<Creature[]>(
    `${defaultCreatureList[0].name}-creature-list`,
    defaultCreatureList,
  );
  const resetToDefault = () => {
    creatureList.value = defaultCreatureList;
  };

  const notesStorage = useStorage<string>(
    `${defaultCreatureList[0].name}-notes`,
    "Equipment: \n" +
      "- light crossbow and 20 bolts\n" +
      "- shortsword\n" +
      "- component pouch\n" +
      "- backpack\n" +
      "- book of lore\n" +
      "- bottle of ink\n" +
      "- ink pen\n" +
      "- 10 sheets of parchment\n" +
      "- bag of sand\n" +
      "- small knife\n" +
      "- hide armor (12 + DEX (max 2))\n" +
      "- handaxe\n" +
      "- 2 daggers\n" +
      "- healer's kit\n" +
      "    - 10 uses\n" +
      "    - action to stabilize creature\n" +
      "- a gnarled wand made of wood\n" +
      "- duster jacket\n" +
      "- satchel for material components and potions\n" +
      "- amulet or other trinket of importance to me (something related to sister?)",
  );

  return {
    creatureList,
    knownSpellNameList,
    notesStorage,
    resetToDefault,
  };
};
