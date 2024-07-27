<script setup lang="ts">
import RoundCheatSheet from "./CheatSheet/RoundCheatSheet.vue";
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../scripts/cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";
import { getUnarmoredDefenseArmorClass } from "../../scripts/armorClassUtils.ts";
import NoteSection from "./CheatSheet/NoteSection.vue";
import { getProficiencyBonus } from "../../scripts/getProficiencyBonus.ts";

const LEVEL = 3;
const PROFICIENCY_BONUS = 2;
const NUMBER_OF_RAGES = 3;
const RAGE_DAMAGE = 2;

const racialPlus1_1 = 1;
const racialPlus1_2 = 1;
const chefConBonus = 1;
const slasherStrOrDexBonus = 1;

const ABILITY_SCORES: AbilityScores = {
  STR: 15 + racialPlus1_1,
  DEX: 13 + slasherStrOrDexBonus,
  CON: 14 + chefConBonus + racialPlus1_2,
  INT: 10,
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
  Skill.Perception,
  Skill.Survival,
  Skill.Acrobatics,
  Skill.Athletics,
  Skill.Survival,
];

const SKILL_EXPERTISE: Skill[] = [];

const defaultCreatureList: Creature[] = [
  {
    name: "Barb",
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
            dice: `d20+${PROFICIENCY_BONUS + MODIFIER.STR}`,
            items: [
              {
                name: "Greataxe",
                dice: `1d12++${MODIFIER.STR}(+${MODIFIER.STR + RAGE_DAMAGE} R)`,
              },
              {
                name: "Javelin (30/120 ft.)",
                dice: `1d6+${MODIFIER.STR}(+${MODIFIER.STR + RAGE_DAMAGE} R)`,
              },
              {
                name: "Handaxe (20/60 ft.)",
                dice: `1d6+${MODIFIER.STR}(+${MODIFIER.STR + RAGE_DAMAGE} R)`,
              },
            ],
          },
          {
            title: "Magical Awareness",
            description: "spell and which school or magic item radar (60 ft.)",
            usages: {
              flags: [...Array(PROFICIENCY_BONUS)].fill(false),
              typeOfRest: TypeOfRest.LONG,
            },
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
            title: "Wild Magic Rage",
            usages: {
              flags: [...Array(NUMBER_OF_RAGES)].fill(false),
              typeOfRest: TypeOfRest.LONG,
            },
            description:
              "resistance to bludgeoning, piercing, and slashing damage. +2 damage. Advantage on Strength ability checks & saving throws",
          },
          {
            title: "End Rage",
            description:
              "(also happens automatically if unconscious, not attacked or no damage taken sind last turn)",
          },
          {
            title: "(wild magic effect)",
            description: "available if you rolled 'right'",
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
            title: "Chef short rest healing",
            description: "30ft. telepathy",
          },
          {
            title: "Chef daily treats",
            description: `give out ${PROFICIENCY_BONUS} temporary hit points per treat`,
            usages: {
              flags: [...Array(PROFICIENCY_BONUS)].fill(false),
              typeOfRest: TypeOfRest.LONG,
            },
          },
          {
            title: "Danger Sense",
            description:
              "Advantage on DEX saving throws if not blinded, deafened or incapacitated",
          },
          {
            title: "Slasher",
            description:
              "when slashing damage then reduce targets movement by 10 ft. when crit then target disadvantaged on attacks until your next turn",
          },
        ],
      },
      {
        title: "Wild magic surge",
        dice: `DC ${8 + PROFICIENCY_BONUS + MODIFIER.CON}`,
        description: "roll a d8 and see your extra effect",
        table: {
          headers: ["d8", "effect"],
          rows: [
            {
              content: [
                "1",
                "Shadowy tendrils lash around you. Each creature of your choice that you can see within 30 feet of you must succeed on a Constitution saving throw or take 1d12 necrotic damage. You also gain 1d12 temporary hit points.",
              ],
            },
            {
              content: [
                "2",
                "You teleport up to 30 feet to an unoccupied space you can see. Until your rage ends, you can use this effect again on each of your turns as a bonus action.",
              ],
            },
            {
              content: [
                "3",
                "An intangible spirit, which looks like a flumph or a pixie (your choice), appears within 5 feet of one creature of your choice that you can see within 30 feet of you. At the end of the current turn, the spirit explodes, and each creature within 5 feet of it must succeed on a Dexterity saving throw or take 1d6 force damage. Until your rage ends, you can use this effect again, summoning another spirit, on each of your turns as a bonus action.",
              ],
            },
            {
              content: [
                "4",
                "Magic infuses one weapon of your choice that you are holding. Until your rage ends, the weapon's damage type changes to force, and it gains the light and thrown properties, with a normal range of 20 feet and a long range of 60 feet. If the weapon leaves your hand, the weapon reappears in your hand at the end of the current turn.",
              ],
            },
            {
              content: [
                "5",
                "Whenever a creature hits you with an attack roll before your rage ends, that creature takes 1d6 force damage, as magic lashes out in retribution.",
              ],
            },
            {
              content: [
                "6",
                "Until your rage ends, you are surrounded by multi colored, protective lights; you gain a +1 bonus to AC, and while within 10 feet of you, your allies gain the same bonus.",
              ],
            },
            {
              content: [
                "7",
                "Flowers and vines temporarily grow around you. Until your rage ends, the ground within 15 feet of you is difficult terrain for your enemies.",
              ],
            },
            {
              content: [
                "8",
                "A bolt of light shoots from your chest. Another creature of your choice that you can see within 30 feet of you must succeed on a Constitution saving throw or take 1d6 radiant damage and be blinded until the start of your next turn. Until your rage ends, you can use this effect again on each of your turns as a bonus action.",
              ],
            },
          ],
        },
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
    "- greataxe\n" +
    "- two handaxes\n" +
    "- backpack\n" +
    "- bedroll\n" +
    "- mess kit\n" +
    "- tinderbox\n" +
    "- 10 torches\n" +
    "- 10 days of rations\n" +
    "- waterskin\n" +
    "- 50 ft. of hempen rope\n" +
    "- 4 javelins\n" +
    "- insignia of rank\n" +
    "- trophy taken from a fallen enemy (schleife from dumme Kuh)\n" +
    "- playing card set\n" +
    "- common clothes\n" +
    "- 10 gp",
);
</script>

<template>
  <div class="cheat-sheet-list">
    <RoundCheatSheet
      v-model="creatureList"
      @reset-to-default="resetToDefault"
      class="round-cheat-sheet"
    />
    <div class="divider" />
    <NoteSection v-model="notesStorage" />
  </div>
</template>

<style scoped>
.cheat-sheet-list {
  display: flex;
  flex-direction: column;
  gap: var(--size-24);

  .divider {
    border-bottom: var(--size-1) solid var(--text-color-darker-1);
  }
}
</style>
