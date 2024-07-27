<script setup lang="ts">
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../scripts/cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";
import {
  getChainMailArmorClass,
  getShieldArmorClass,
} from "../../scripts/armorClassUtils.ts";
import {
  getEldritchKnightSpellSlots,
  Spell,
} from "../../scripts/spellUtils.ts";
import type { CollectionEntry } from "astro:content";
import { getProficiencyBonus } from "../../scripts/getProficiencyBonus.ts";
import SpellCasterCheatSheet from "./CheatSheet/SpellCasterCheatSheet.vue";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const LEVEL = 3;
const PROFICIENCY_BONUS = 2;

const racialBonusPlus2 = 2;
const racialBonusPlus1 = 1;

const ABILITY_SCORES: AbilityScores = {
  STR: 15 + racialBonusPlus2,
  DEX: 10,
  CON: 14,
  INT: 13 + racialBonusPlus1,
  WIS: 12,
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

const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = ["STR", "CON"];

const SKILL_PROFICIENCIES = [
  Skill.Athletics,
  Skill.Intimidation,
  Skill.Perception,
  Skill.Insight,
];

const SKILL_EXPERTISE: Skill[] = [];

const knownSpellNameList = [
  // --- tiefling spells ---
  Spell.Thaumaturgy,
  Spell.HellishRebuke,
  // ---cantrips: 2 ---
  Spell.BoomingBlade,
  Spell.GreenFlameBlade,
  // ---spells known: 3 ---
  Spell.Shield,
  Spell.SilveryBarbs,
  Spell.BurningHands,
];

const defenseFightingStyleArmorClassBonus = 1;

const defaultCreatureList: Creature[] = [
  {
    name: "Mordred",
    characterLevel: LEVEL,
    hitPoints: {
      current: 10 + MODIFIER.CON + (6 + MODIFIER.CON) * (LEVEL - 1),
      max: 10 + MODIFIER.CON + (6 + MODIFIER.CON) * (LEVEL - 1),
      temporary: 0,
      hitDice: {
        flags: [...Array(LEVEL)].fill(false),
        description: "d10",
        typeOfRest: TypeOfRest.LONG,
      },
    },
    magic: {
      spellSlots: getEldritchKnightSpellSlots(LEVEL),
      refresh: TypeOfRest.LONG,
      concentration: false,
      spellSaveDiceCheck: 8 + MODIFIER.INT + getProficiencyBonus(LEVEL),
      spellAttackModifier: MODIFIER.INT + getProficiencyBonus(LEVEL),
    },
    contamination: 0,
    exhaustion: 0,
    armorClass:
      getShieldArmorClass(getChainMailArmorClass()) +
      defenseFightingStyleArmorClassBonus,
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
            dice: `d20+${MODIFIER.STR + PROFICIENCY_BONUS}`,
            items: [
              { name: "Longsword", dice: `1d8+${MODIFIER.STR}` },
              { name: "Handaxe", dice: `1d6+${MODIFIER.STR}` },
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
            title: "Second Wind",
            description: `regain 1d10 + ${LEVEL} hit points`,
            usages: {
              flags: [false],
              typeOfRest: TypeOfRest.SHORT,
            },
          },
          {
            title: "Weapon Bond",
            description: "Summon Longsword or handaxe to your hand",
          },
          {
            title: "Spell casting",
            description: "See spell casting cheat sheet",
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
            title: "Spell Opportunity Attack (Warcaster)",
            description: "Any single target spell with 1 action casting time",
          },
          {
            title: "Spell casting",
            description: "See spell casting cheat sheet",
          },
          {
            title: "Infernal Legacy",
            description: "Hellish Rebuke for free",
            usages: {
              flags: [false],
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
            title: `Walking 30 ft.`,
            description: "(10 squares)",
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Hellish Resistance",
            description: "Resistant to fire damage (half damage)",
          },
          {
            title: "Weapon Bond",
            description:
              "You can not be disarmed except if you are incapacitated",
          },
          {
            title: "Warcaster",
            description: "Advantage on concentration checks",
          },
        ],
      },
      {
        title: "Action Surge",
        subsections: [
          {
            title: "Extra action",
            usages: {
              flags: [...Array(1)].fill(false),
              typeOfRest: TypeOfRest.SHORT,
            },
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
  "Equipment:\n" +
    "\n" +
    "- chain mail (AC 16)\n" +
    "- Longsword\n" +
    "- Shield (AC + 2)\n" +
    "- 2 handaxes\n" +
    "- backpack\n" +
    "- crowbar\n" +
    "- hammer\n" +
    "- 10 pitons\n" +
    "- 10 torches\n" +
    "- tinderbox\n" +
    "- 10 days of rations\n" +
    "- waterskin\n" +
    "- 50 ft. of hempen rope\n" +
    "- Insignia of rank\n" +
    "- trophy taken from fallen enemy (dagger, broken blade, piece of banner)\n" +
    "- bone dice set or playing card set\n" +
    "- common clothes\n" +
    "- 10 gp",
);
</script>

<template>
  <SpellCasterCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    :all-spells="allSpells"
    :known-spell-name-list="knownSpellNameList"
    @reset-to-default="resetToDefault"
  />
</template>
