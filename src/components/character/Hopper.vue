<script setup lang="ts">
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../scripts/cheatSheetTypes.ts";
import RoundCheatSheet from "./CheatSheet/RoundCheatSheet.vue";
import { useStorage } from "@vueuse/core";
import { getUnarmoredDefenseArmorClass } from "../../scripts/armorClassUtils.ts";
import NoteSection from "./CheatSheet/NoteSection.vue";
import { getProficiencyBonus } from "../../scripts/getProficiencyBonus.ts";
import MartialCheatSheet from "./CheatSheet/MartialCheatSheet.vue";

const LEVEL = 3;
const PROFICIENCY_BONUS = 2;

const racialBonusPlus2 = 2;
const racialBonusPlus1 = 1;

const ABILITY_SCORES: AbilityScores = {
  STR: 12,
  DEX: 15 + racialBonusPlus2,
  CON: 13 + racialBonusPlus1,
  INT: 10,
  WIS: 14,
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

const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = ["STR", "DEX"];

const SKILL_PROFICIENCIES = [
  Skill.Perception,
  Skill.Acrobatics,
  Skill.Stealth,
  Skill.Medicine,
  Skill.Religion,
];

const SKILL_EXPERTISE: Skill[] = [];
const harengonBaseSpeed = 30;
const unarmoredMovementBonus = 10;
const mobileMovementBonus = 10;
const monkWeaponDamageDie = "1d4";

const defaultCreatureList: Creature[] = [
  {
    name: "Hopper",
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
    armorClass: getUnarmoredDefenseArmorClass(MODIFIER.DEX, MODIFIER.WIS),
    initiative: MODIFIER.DEX + PROFICIENCY_BONUS,
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
            dice: `d20+${MODIFIER.DEX + PROFICIENCY_BONUS}`,
            items: [
              { name: "Quarterstaff (10 ft.)", dice: `1d8+${MODIFIER.DEX}` },
              {
                name: "Unarmed Strike",
                dice: `${monkWeaponDamageDie}+${MODIFIER.DEX}`,
              },
              { name: "Dart (20/60 ft.)", dice: `1d4+${MODIFIER.DEX}` },
            ],
          },
        ],
      },
      {
        title: "Bonus Action",
        used: false,
        subsections: [
          {
            title: "Martial Arts",
            description: "free unarmed strike if you attacked before",
          },
          {
            title: "Flurry of Blows | 1 Ki",
            description:
              "after attack action, two unarmed strikes as bonus action",
          },
          {
            title: "Patient Defense | 1 Ki",
            description: "Dodge (attacks against you have disadvantage)",
          },
          {
            title: "Serpent Spring | 1 Ki",
            description:
              "Disengage or Dash, jump distance is tippled for the turn (long: 36 ft./ 7 squares, high: 15 ft. /3 squares), advantage on next melee attack",
          },
          {
            title: "Rabbit Hop",
            description:
              "jump 10 ft. (2 squares) without provoking oppertunity attacks",
            usages: {
              flags: [...Array(PROFICIENCY_BONUS)].fill(false),
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
            title: "Lucky Footwork",
            description: "add a d4 to a failed DEX saving throw",
          },
          {
            title: "Deflect Missiles",
            description: `deflect ranged weapon attack, reduce damage by 1d10 + ${MODIFIER.DEX + LEVEL}. If damaged reducedto 0, you catched the missile. If catched see below`,
            dice: `d20 + ${MODIFIER.DEX + PROFICIENCY_BONUS}`,
            items: [
              {
                name: "Throw back (20/60 ft.) | 1 Ki",
                dice: `${monkWeaponDamageDie} + ${MODIFIER.DEX}`,
              },
            ],
          },
        ],
      },
      {
        title: "Movement",
        used: false,
        subsections: [
          {
            title: `Walking ${harengonBaseSpeed + unarmoredMovementBonus + mobileMovementBonus} ft.`,
            description: "(10 squares)",
          },
          {
            title: "Long Jump",
            description: `10ft.(2 squares) run-up, ${ABILITY_SCORES.STR * 2}ft. (${Math.floor((ABILITY_SCORES.STR * 2) / 5)} squares) jump`,
          },
          {
            title: "High Jump",
            description: `10ft.(2 squares) run-up, ${(3 + MODIFIER.STR) * 2}ft. (${Math.floor(((3 + MODIFIER.STR) * 2) / 5)} squares) jump`,
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Ki points",
            description:
              "Some of your actions or bonus actions require Ki points. Check the checkboxes when you use any of them.",
            usages: {
              flags: [...Array(LEVEL)].fill(false),
              typeOfRest: TypeOfRest.LONG,
            },
          },
          {
            title: "Mobile",
            description:
              "no opportunity attacks from target when meleed before. Ignore difficult terrain when dashing.",
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
    "- Quarterstaff\n" +
    "- backpack\n" +
    "- bedroll\n" +
    "- mess kit\n" +
    "- tinderbox\n" +
    "- 10 torches\n" +
    "- 10 rations\n" +
    "- waterskin\n" +
    "- 50 ft. of hempen rope\n" +
    "- 10 darts\n" +
    "- scroll case full of notes of your studies and prayers\n" +
    "- winter blanket\n" +
    "- common clothes\n" +
    "- herbalism kit\n" +
    "- 5 gp",
);
</script>

<template>
  <MartialCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    @reset-to-default="resetToDefault"
  />
</template>
