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
import { getLeatherArmorClass } from "../../scripts/armorClassUtils.ts";
import NoteSection from "./NoteSection.vue";
import { getProficiencyBonus } from "../../scripts/getProficiencyBonus.ts";

const LEVEL = 3;
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

const ABILITY_SCORES: AbilityScores = {
  STR: 8,
  DEX: 15 + racialBonusPlus2,
  CON: 13 + racialBonusPlus1,
  INT: 12,
  WIS: 10,
  CHA: 14,
};

const MODIFIER: AbilityScores = {
  STR: getModifier(ABILITY_SCORES.STR),
  DEX: getModifier(ABILITY_SCORES.DEX),
  CON: getModifier(ABILITY_SCORES.CON),
  INT: getModifier(ABILITY_SCORES.INT),
  WIS: getModifier(ABILITY_SCORES.WIS),
  CHA: getModifier(ABILITY_SCORES.CHA),
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

const defaultCreatureList: Creature[] = [
  {
    name: "Johan",
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
    armorClass: getLeatherArmorClass(MODIFIER.DEX) + dualWielderArmorClassBonus,
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
            dice: `d20+${MODIFIER.DEX + PROFICIENCY_BONUS}/+${MODIFIER.DEX + PROFICIENCY_BONUS + 1}`,
            items: [
              { name: "Shortbow (80/ 320)", dice: `1d6+${MODIFIER.DEX}` },
              { name: "Rapier", dice: `1d8+${MODIFIER.DEX + 1}` },
              { name: "Dagger", dice: `1d4+${MODIFIER.DEX}` },
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
  <div class="cheat-sheet-list">
    <RoundCheatSheet
      v-model="creatureList"
      @reset-to-default="resetToDefault"
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
