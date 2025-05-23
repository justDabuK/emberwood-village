import { Spell } from "../../../scripts/spellUtils.ts";
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../../scripts/cheatSheetTypes.ts";
import { getChainShirtArmorClass } from "../../../scripts/armorClassUtils.ts";
import { getProficiencyBonus } from "../../../scripts/getProficiencyBonus.ts";
import { useStorage } from "@vueuse/core";
import { owl } from "../../../scripts/familiars/owl.ts";

export const useNexCreatureList = () => {
  const NEX_LEVEL = 4;

  const knownSpellNameList = [
    // --- feat spells ---
    Spell.Bless, // fey touched
    Spell.MistyStep, // fey touched
    Spell.FindFamiliar, // lab assistant
    // --- reanimator spells ---
    Spell.ShockingGrasp,
    Spell.SpareTheDying,
    Spell.FalseLife,
    Spell.InflictWounds,
    Spell.GentleRepose,
    Spell.Invigorate,
    // --- Cantrips:  4 ---
    Spell.Guidance,
    Spell.PoisonNeedle,
    Spell.ChillTouch,
    Spell.Resistance,
    // --- known spells : 9 ---
    Spell.AcidOrb,
    Spell.Infect,
    Spell.StreamOfConsumption,
    Spell.HealingWord,
    Spell.GraspingGhost,
    Spell.ControlledMutation,
    Spell.Biohazard,
    Spell.CometShards,
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
  const feyTouchedBonus = 1;
  const medicalExpertBonus = 1;
  const tomeOfOccultDraconicPracticesBonus = 1;

  const ABILITY_SCORES: AbilityScores = {
    STR: 10,
    DEX: 12,
    CON: 15 + racialBonusPlus1,
    INT: 17 + racialBonusPlus2 + feyTouchedBonus,
    WIS: 13 + medicalExpertBonus,
    CHA: 8,
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
    "INT",
    "WIS",
  ];

  const SKILL_PROFICIENCIES: Skill[] = [
    Skill.Stealth,
    Skill.Arcana,
    Skill.Investigation,
    Skill.Perception,
  ];

  const SKILL_EXPERTISE: Skill[] = [];

  const corpseWroughtCreatureAbilityScores: AbilityScores = {
    STR: 18,
    DEX: 10,
    CON: 16,
    INT: 8,
    WIS: 12,
    CHA: 8,
  };
  const corpseWroughtCreatureSavingThrowProficiencyList: (keyof AbilityScores)[] =
    ["CON", "WIS"];
  const corpseWroughtCreatureSkillProficiencies: Skill[] = [Skill.Athletics];

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

  const defaultNexCreatureList: Creature[] = [
    {
      name: "Nex",
      characterLevel: NEX_LEVEL,
      hitPoints: {
        current: 8 + MODIFIER.CON + (5 + MODIFIER.CON) * (NEX_LEVEL - 1),
        max: 8 + MODIFIER.CON + (5 + MODIFIER.CON) * (NEX_LEVEL - 1),
        temporary: 0,
        hitDice: {
          flags: [...Array(NEX_LEVEL)].fill(false),
          description: "d8",
          typeOfRest: TypeOfRest.LONG,
        },
      },
      contamination: 0,
      exhaustion: 0,
      armorClass: getChainShirtArmorClass(MODIFIER.DEX),
      initiative: MODIFIER.DEX,
      abilityScores: ABILITY_SCORES,
      savingThrowProficiencyList: SAVING_THROW_PROFICIENCIES_LIST,
      proficiencyBonus: getProficiencyBonus(NEX_LEVEL),
      skill: {
        proficiencies: SKILL_PROFICIENCIES,
        expertise: SKILL_EXPERTISE,
      },
      inspiration: false,
      magic: {
        spellSlots: {
          [getSlotLevel(NEX_LEVEL)]: {
            flags: [...Array(getSpellSlots(NEX_LEVEL))].fill(false),
            max: getSpellSlots(NEX_LEVEL),
          },
        },
        refresh: TypeOfRest.SHORT,
        concentration: false,
        spellSaveDiceCheck:
          8 +
          MODIFIER.INT +
          getProficiencyBonus(NEX_LEVEL) +
          tomeOfOccultDraconicPracticesBonus,
        spellAttackModifier:
          MODIFIER.INT +
          getProficiencyBonus(NEX_LEVEL) +
          tomeOfOccultDraconicPracticesBonus,
      },
      sectionList: [
        {
          title: "Action",
          used: false,
          subsections: [
            {
              title: "Weapon Attack",
              dice: `d20+${MODIFIER.DEX + getProficiencyBonus(NEX_LEVEL)}`,
              items: [
                { name: "Crossbow light", dice: `1d8+${MODIFIER.DEX}` },
                { name: "Crossbow Hand", dice: `1d6+${MODIFIER.DEX}` },
                { name: "Dagger", dice: `1d4+${MODIFIER.DEX}` },
              ],
            },
            {
              title: "Spell casting",
              description: "See spell casting cheat sheet",
            },
            {
              title: "Bless",
              usages: {
                flags: [false],
                typeOfRest: TypeOfRest.LONG,
              },
              description: "for free, 1st level",
            },
          ],
        },
        {
          title: "Bonus Action",
          used: false,
          subsections: [
            {
              title: "Command Bernhard",
              description:
                "Bernhard needs a command, otherwise he will take the Dodge action",
            },
            {
              title: "Spell casting",
              description: "See spell casting cheat sheet",
            },
            {
              title: "Misty Step",
              usages: {
                flags: [false],
                typeOfRest: TypeOfRest.LONG,
              },
              description: "for free, 2nd level",
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
              title: "Fey Ancestry",
              description: "Advantage against getting charmed",
            },
            {
              title: "Makeshift meals",
              usages: {
                flags: [false],
                typeOfRest: TypeOfRest.LONG,
              },
              description: `${NEX_LEVEL} HP for ${getProficiencyBonus(NEX_LEVEL)} creatures during short rest, 1 per long rest`,
            },
            {
              title: "Medical Expert",
              description: `During a short rest, remove one exhaustion, disease, charmed, frightened, paralyzed, poisoned from up to six creatures. Up to 6 creatures get ${getProficiencyBonus(NEX_LEVEL)} extra hit dice during short rest.`,
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
              description: `When healing, add +${MODIFIER.INT} to the amount`,
            },
            {
              title: "Rapid Response",
              description: `No opportunity attack when healing`,
            },
          ],
        },
      ],
    },
    {
      name: "Bernadette",
      hitPoints: {
        current: 5 + 5 * NEX_LEVEL,
        max: 5 + 5 * NEX_LEVEL,
      },
      contamination: 0,
      exhaustion: 0,
      armorClass: 14 + getProficiencyBonus(NEX_LEVEL),
      abilityScores: corpseWroughtCreatureAbilityScores,
      savingThrowProficiencyList:
        corpseWroughtCreatureSavingThrowProficiencyList,
      skill: {
        proficiencies: corpseWroughtCreatureSkillProficiencies,
        expertise: [],
      },
      proficiencyBonus: getProficiencyBonus(NEX_LEVEL),
      sectionList: [
        {
          title: "Action",
          used: false,
          subsections: [
            {
              title: "Weapon Attack",
              dice: `d20+${getModifier(corpseWroughtCreatureAbilityScores.STR) + getProficiencyBonus(NEX_LEVEL)}`,
              items: [
                {
                  name: "Slam",
                  dice: `1d8+${getModifier(corpseWroughtCreatureAbilityScores.STR)}`,
                },
              ],
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
          ],
        },
        {
          title: "Features",
          subsections: [
            {
              title: "Lightning Absorption",
              description:
                "If hit by lightning damage, regain HP equal to the damage",
            },
            {
              title: "Damage Immunities",
              description: "poison, lightning",
            },
            {
              title: "Condition Immunities",
              description: "poisoned",
            },
            {
              title: "Darkvision",
              description: "60 ft. (12 squares)",
            },
          ],
        },
      ],
    },
    {
      ...owl,
      name: "Hedrick",
    },
  ];

  const creatureList = useStorage<Creature[]>(
    "nex-creature-list",
    defaultNexCreatureList,
  );
  const resetToDefault = () => {
    creatureList.value = defaultNexCreatureList;
  };

  const notesStorage = useStorage<string>("nex-notes", "");

  return {
    creatureList,
    knownSpellNameList,
    notesStorage,
    resetToDefault,
  };
};
