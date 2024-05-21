<script setup lang="ts">
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../scripts/cheatSheetTypes.ts";
import RoundCheatSheet from "./RoundCheatSheet.vue";
import { useStorage } from "@vueuse/core";
import SkillCheatSheet from "./SkillCheatSheet.vue";
import {
  getChainMailArmorClass,
  getStuddedLeatherArmorClass,
  getUnarmoredDefenseArmorClass,
} from "../../scripts/armorClassUtils.ts";
import NoteSection from "./NoteSection.vue";

const LEVEL = 3;
const PROFICIENCY_BONUS = 2;

const racialBonusPlus2 = 2;
const racialBonusPlus1 = 1;

const ABILITY_SCORES: AbilityScores = {
  STR: 15 + racialBonusPlus1,
  DEX: 12,
  CON: 14 + racialBonusPlus2,
  INT: 8,
  WIS: 13,
  CHA: 10,
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
  Skill.Survival,
];

const SKILL_EXPERTIES = [];

const defaultCreatureList: Creature[] = [
  {
    name: "Mustafa",
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
    contamination: 0,
    exhaustion: 0,
    armorClass: getChainMailArmorClass(),
    initiative: MODIFIER.DEX + PROFICIENCY_BONUS,
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
              { name: "Maul", dice: `2d6+${MODIFIER.STR}` },
              { name: "Greatsword", dice: `2d6+${MODIFIER.STR}` },
              { name: "Handaxe", dice: `1d6+${MODIFIER.STR}` },
              { name: "Horns", dice: `1d6+${MODIFIER.STR}` },
            ],
          },
          {
            title: "Echo Weapon Attack",
            dice: `d20+${MODIFIER.STR + PROFICIENCY_BONUS}`,
            description: "same as above but originates from echo location",
          },
        ],
      },
      {
        title: "Bonus Action",
        used: false,
        subsections: [
          {
            title: "Goring Rush",
            description: "after Dash and movement of 20 ft., Horns attack",
          },
          {
            title: "Hammering Horns",
            description: `As part of attack, attempt to push creature for 10 ft.`,
            dice: `DC ${8 + PROFICIENCY_BONUS + MODIFIER.STR}`,
          },
          {
            title: "Second Wind",
            description: `regain 1d10 + ${LEVEL} hit points`,
            usages: {
              flags: [false],
              typeOfRest: TypeOfRest.SHORT,
            },
          },
          {
            title: "Manifest Echo",
            description: `Manifest echo within 15 ft. of you (AC ${14 + PROFICIENCY_BONUS}, HP 1, immune to all conditions, my saving throws, speed 30 ft.)`,
          },
          {
            title: "Dismiss Echo",
            description: `let echo vanish`,
          },
          {
            title: "Echo teleport",
            description:
              "Switch places with echo at cost of 15 ft. of movement (distance doesn't matter)",
          },
          {
            title: "Great weapon master",
            description: "extra attack when crit or killed a creature",
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
            title: "Echo Opportunity Attack",
            description: "See Weapon Attack (originates from echo location)",
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
            title: "Labyrinthine Recall",
            description:
              "You always know where north is. Advantage on checks for navigating or tracking.",
          },
          {
            title: "Great Weapon Fighting",
            description:
              "Reroll 1 or 2 on damage when attacking with two-handed weapon",
          },
          {
            title: "Great Weapon Master",
            description: "take -5 penalty to attack roll to get +10 damage",
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
      {
        title: "Unleash Incarnation",
        description: "when attack, extra attack with echo (for rest of turn)",
        subsections: [
          {
            title: "Extra attack",
            usages: {
              flags: [...Array(MODIFIER.CON)].fill(false),
              typeOfRest: TypeOfRest.LONG,
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
    "- Maul, Greatsword\n" +
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
  <div class="cheat-sheet-list">
    <RoundCheatSheet
      v-model="creatureList"
      @reset-to-default="resetToDefault"
    />
    <div class="divider" />
    <SkillCheatSheet
      :modifiers="MODIFIER"
      :ability-scores="ABILITY_SCORES"
      :saving-throw-proficiency-list="SAVING_THROW_PROFICIENCIES_LIST"
      :skill-proficiency-list="SKILL_PROFICIENCIES"
      :skill-expertise-list="SKILL_EXPERTIES"
      :proficiency-bonus="PROFICIENCY_BONUS"
    />
    <div class="divider" />
    <NoteSection v-model="notesStorage" />
  </div>
</template>

<style scoped>
.cheat-sheet-list {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .divider {
    border-bottom: 1px solid var(--text-color-darker-1);
  }
}
</style>
