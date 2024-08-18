<script setup lang="ts">
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../scripts/cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";
import { getUnarmoredDefenseArmorClass } from "../../scripts/armorClassUtils.ts";
import { getFullCasterSpellSlots, Spell } from "../../scripts/spellUtils.ts";
import type { CollectionEntry } from "astro:content";
import { getProficiencyBonus } from "../../scripts/getProficiencyBonus.ts";
import WizardCheatSheet from "./CheatSheet/WizardCheatSheet.vue";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const LEVEL = 4;

const spellBookSpellNameList = [
  // --- spellbook spells : 10 ---
  Spell.BurningHands,
  Spell.MagicMissile,
  Spell.Shield,
  Spell.TashaSCausticBrew,
  Spell.Thunderwave,
  Spell.ScorchingRay,
  Spell.Web,
  Spell.Identify,
  Spell.DetectMagic,
  Spell.EarthTremor,
  Spell.Invisibility,
  Spell.Pyrotechnics,
];

const preparedSpellNameList = [
  // --- Cantrips:  4 ---
  Spell.FireBolt,
  Spell.MageHand,
  Spell.MinorIllusion,
  Spell.RayOfFrost,
  // --- known spells : 9 ---
  Spell.BurningHands,
  Spell.MagicMissile,
  Spell.Shield,
  Spell.Thunderwave,
  Spell.ScorchingRay,
  Spell.Web,
  Spell.EarthTremor,
  Spell.Invisibility,
  Spell.Pyrotechnics,
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

const getNumberOfPreparedSpells = (level: number, intModifier: number) =>
  level + intModifier;

const racialBonusPlus2 = 2;
const racialBonusPlus1 = 1;
const giftFromGemDragonBonus = 1;

const ABILITY_SCORES: AbilityScores = {
  STR: 8,
  DEX: 13 + racialBonusPlus1,
  CON: 14,
  INT: 15 + racialBonusPlus2 + giftFromGemDragonBonus,
  WIS: 12,
  CHA: 10,
};

const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = ["INT", "WIS"];

const SKILL_PROFICIENCIES = [
  Skill.Medicine,
  Skill.Investigation,
  Skill.Arcana,
  Skill.History,
];

const SKILL_EXPERTISE: Skill[] = [];

// --- Lvl 4 ---
const level4AbilityScoreIncrease = 2;
ABILITY_SCORES.INT += level4AbilityScoreIncrease;

const defaultCreatureList: Creature[] = [
  {
    name: "Zara",
    characterLevel: LEVEL,
    hitPoints: {
      current:
        6 +
        getModifier(ABILITY_SCORES.CON) +
        (4 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1),
      max:
        6 +
        getModifier(ABILITY_SCORES.CON) +
        (4 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1),
      temporary: 0,
      hitDice: {
        flags: [...Array(LEVEL)].fill(false),
        description: "d6",
        typeOfRest: TypeOfRest.LONG,
      },
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: getUnarmoredDefenseArmorClass(getModifier(ABILITY_SCORES.DEX)),
    initiative: getModifier(ABILITY_SCORES.DEX),
    abilityScores: ABILITY_SCORES,
    savingThrowProficiencyList: SAVING_THROW_PROFICIENCIES_LIST,
    skill: {
      proficiencies: SKILL_PROFICIENCIES,
      expertise: SKILL_EXPERTISE,
    },
    proficiencyBonus: getProficiencyBonus(LEVEL),
    inspiration: false,
    magic: {
      spellSlots: getFullCasterSpellSlots(LEVEL),
      refresh: TypeOfRest.LONG,
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
            dice: `d20+${getModifier(ABILITY_SCORES.STR) + getProficiencyBonus(LEVEL)}`,
            items: [
              {
                name: "Quarterstaff",
                dice: `1d6+${getModifier(ABILITY_SCORES.STR)}`,
              },
            ],
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
            title: "Draconic Cry",
            description:
              "Allies have advantage against enemies within 10 ft.(2 squares) of you",
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
          {
            title: "Spell casting",
            description: "See spell casting cheat sheet",
          },
          {
            title: "Telekinetic Reprisal",
            description: `when taken damage from creature withing 10 ft. then DC ${8 + getProficiencyBonus(LEVEL) + getModifier(ABILITY_SCORES.INT)} for 2d8 force damage and push for 10 ft. (2 squares)`,
            usages: {
              flags: [...Array(getProficiencyBonus(LEVEL))].fill(false),
              typeOfRest: TypeOfRest.LONG,
            },
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
            title: "Arcane Recovery",
            description: `recover up to ${Math.ceil(LEVEL / 2)} spell slots during short rest`,
            usages: {
              flags: [false],
              typeOfRest: TypeOfRest.LONG,
            },
          },
          {
            title: "Sculpt Spells",
            description: `choose up to 1 + spell level creatures that automatically succeed saving throws against your spell and take no damage`,
          },
          {
            title: "Evocation Savant",
            description: `gold and time spent for copying evocation spells is halved`,
          },
        ],
      },
    ],
  },
];

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
    "\n" +
    "- quarterstaff\n" +
    "- component puch OR arcane focus\n" +
    "- backpack\n" +
    "- bedroll\n" +
    "- mess kit\n" +
    "- tinderbox\n" +
    "- torches\n" +
    "- 10 day rations\n" +
    "- waterskin\n" +
    "- 50 ft. of hempen rope\n" +
    "- spellbook\n" +
    "- bottle of black ink\n" +
    "- quill\n" +
    "- small knife\n" +
    "- letter from dead colleague posing a question you have not yet been able to answer\n" +
    "- common clothes\n" +
    "- 10 gp",
);
</script>

<template>
  <WizardCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    :all-spells="allSpells"
    :spell-book-spell-name-list="spellBookSpellNameList"
    :prepared-spell-name-list="preparedSpellNameList"
    @reset-to-default="resetToDefault"
  />
</template>
