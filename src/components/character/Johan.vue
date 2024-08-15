<script setup lang="ts">
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  type Subsection,
  TypeOfRest,
} from "../../scripts/cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";
import { getLeatherArmorClass } from "../../scripts/armorClassUtils.ts";
import { getProficiencyBonus } from "../../scripts/getProficiencyBonus.ts";
import MartialCheatSheet from "./CheatSheet/MartialCheatSheet.vue";
import { getSneakAttackDice } from "../../scripts/getSneakAttackDice.ts";

const LEVEL = 4;

const racialBonusPlus2 = 2;
const racialBonusPlus1 = 1;

const ABILITY_SCORES: AbilityScores = {
  STR: 8,
  DEX: 15 + racialBonusPlus2,
  CON: 13 + racialBonusPlus1,
  INT: 12,
  WIS: 10,
  CHA: 14,
};

const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = ["DEX", "INT"];

const SKILL_PROFICIENCIES = [
  Skill.Acrobatics,
  Skill.SleightOfHand,
  Skill.ThievesTools,
  Skill.Stealth,
  Skill.Deception,
  Skill.Perception,
  Skill.Persuasion,
  Skill.Athletics,
  Skill.Survival,
];

const SKILL_EXPERTISE = [Skill.Stealth, Skill.ThievesTools];
const dualWielderArmorClassBonus = 1;

// --- elven accuracy ---
ABILITY_SCORES.DEX += 1;
const elvenAccuracySubsection: Subsection = {
  title: "Elven Accuracy",
  description:
    "when advantage on attack roll, reroll one damage die if you want to",
};
const defaultCreatureList: Creature[] = [
  {
    name: "Johan",
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
    armorClass:
      getLeatherArmorClass(getModifier(ABILITY_SCORES.DEX)) +
      dualWielderArmorClassBonus,
    initiative:
      getModifier(ABILITY_SCORES.DEX) + getModifier(ABILITY_SCORES.CHA),
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
            dice: `d20+${getModifier(ABILITY_SCORES.DEX) + getProficiencyBonus(LEVEL)}/+${getModifier(ABILITY_SCORES.DEX) + getProficiencyBonus(LEVEL) + 1}`,
            items: [
              {
                name: "Shortbow (80/ 320)",
                dice: `1d6+${getModifier(ABILITY_SCORES.DEX)}`,
              },
              {
                name: "+1 Rapier",
                dice: `1d8+${getModifier(ABILITY_SCORES.DEX) + 1}`,
              },
              {
                name: "Dagger",
                dice: `1d4+${getModifier(ABILITY_SCORES.DEX)}`,
              },
            ],
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
                dice: getSneakAttackDice(LEVEL),
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
            title: "Fey Ancestry",
            description:
              "Advantage on saving throws against being charmed, and magic can't put you to sleep",
          },
          {
            title: "Fancy Footwork",
            description:
              "no opportunity attacks from target when meleed before",
          },
          elvenAccuracySubsection,
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
    "- Rapier\n" +
    "- Shortbow and 20 arrows\n" +
    "- backpack\n" +
    "- bag of 1 000 ball bearing\n" +
    "- 10 ft. of string\n" +
    "- bell\n" +
    "- 5 candles\n" +
    "- crowbar\n" +
    "- hammer\n" +
    "- 10 pitons\n" +
    "- hooded lantern\n" +
    "- 2 flasks of oil\n" +
    "- 5 days rations\n" +
    "- tinderbox\n" +
    "- waterskin\n" +
    "- 50 ft. of hempen rope\n" +
    "- Leather Armor (11 + DEX)\n" +
    "- two daggers\n" +
    "- thieves' tools\n" +
    "- staff\n" +
    "- hunting trap\n" +
    "- trophy from an animal you killed\n" +
    "- traveler's clothes\n" +
    "- 10 gp",
);
</script>

<template>
  <MartialCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    @reset-to-default="resetToDefault"
  />
</template>
