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
import { getUnarmoredDefenseArmorClass } from "../../scripts/armorClassUtils.ts";
import NoteSection from "./NoteSection.vue";
import { getProficiencyBonus } from "../../scripts/getProficiencyBonus.ts";

const LEVEL = 3;
const PROFICIENCY_BONUS = 2;

const racialBonusPlus2 = 2;
const racialBonusPlus1 = 1;

const ABILITY_SCORES: AbilityScores = {
  STR: 15 + racialBonusPlus2,
  DEX: 13,
  CON: 12,
  INT: 10,
  WIS: 14,
  CHA: 8 + racialBonusPlus1,
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
  Skill.Insight,
  Skill.Medicine,
  Skill.Arcana,
  Skill.History,
  Skill.Acrobatics,
  Skill.Athletics,
];

const SKILL_EXPERTISE: Skill[] = [];
const dragonbornBaseSpeed = 30;
const unarmoredMovementBonus = 10;
const martialArtsDamageDie = "1d4";

const breathWeaponDamageDiceNumber = () => {
  if (LEVEL < 5) {
    return 2;
  } else if (LEVEL < 11) {
    return 3;
  } else if (LEVEL < 17) {
    return 4;
  } else {
    return 5;
  }
};

const defaultCreatureList: Creature[] = [
  {
    name: "Otagg",
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
            dice: `d20+${Math.max(MODIFIER.DEX, MODIFIER.STR) + PROFICIENCY_BONUS}`,
            items: [
              {
                name: "Shortsword",
                dice: `1d6+${Math.max(MODIFIER.DEX, MODIFIER.STR)}`,
              },
              {
                name: "Unarmed Strike",
                dice: `${martialArtsDamageDie}+${Math.max(MODIFIER.DEX, MODIFIER.STR)}`,
              },
              {
                name: "Dart (20/60 ft.)",
                dice: `1d4+${Math.max(MODIFIER.DEX, MODIFIER.STR)}`,
              },
            ],
          },
          {
            title: "Breath Weapon",
            usages: {
              flags: [...Array(1)].fill(false),
              typeOfRest: TypeOfRest.SHORT,
            },
            description: `DC ${8 + MODIFIER.CON + PROFICIENCY_BONUS} DEX save`,
            items: [
              {
                name: "Fire (15 ft. cone)",
                dice: `${breathWeaponDamageDiceNumber()}d6`,
              },
            ],
          },
          {
            title: "Hand of Healing | 1 Ki",
            items: [
              {
                name: "Healing for",
                dice: `${martialArtsDamageDie}+${MODIFIER.WIS}`,
              },
            ],
          },
          {
            title: "Healer's Kit",
            description: "Heal creature 1 per short rest",
            usages: {
              flags: [...Array(10)].fill(false),
            },
            items: [
              {
                name: "Healing for",
                dice: `1d6 + 4 + HD`,
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
            title: "Martial Arts",
            description: "free unarmed strike if you attacked before",
          },
          {
            title: "Flurry of Blows | 1 Ki",
            description:
              "after attack action, two unarmed strikes as bonus action. Optionally one of them is hand of Healing",
          },
          {
            title: "Patient Defense | 1 Ki",
            description: "Dodge (attacks against you have disadvantage)",
          },
          {
            title: "Step of the Wind | 1 Ki",
            description: "Disengage or Dash & jump distance is doubled",
          },
        ],
      },
      {
        title: "Hands of Mercy",
        used: false,
        subsections: [
          {
            title: "Hand of Harm | 1 Ki",
            description: "Improved unarmed strike",
            items: [
              {
                name: "Extra necrotic damage ",
                dice: `${martialArtsDamageDie}+${MODIFIER.WIS}`,
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
          {
            title: "Deflect Missiles",
            description: `deflect ranged weapon attack, reduce damage by 1d10 + ${MODIFIER.DEX + LEVEL}. If damaged reduced to 0, you catched the missile. If catched see below`,
            dice: `d20 + ${Math.max(MODIFIER.DEX, MODIFIER.STR) + PROFICIENCY_BONUS}`,
            items: [
              {
                name: "Throw back (20/60 ft.) | 1 Ki",
                dice: `${martialArtsDamageDie} + ${Math.max(MODIFIER.DEX, MODIFIER.STR)}`,
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
            title: `Walking ${dragonbornBaseSpeed + unarmoredMovementBonus} ft.`,
            description: `(${Math.floor((dragonbornBaseSpeed + unarmoredMovementBonus) / 5)} squares)`,
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Draconic Resistance",
            description: "Fire damage resistance",
          },
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
            title: "Healer",
            description: "When stabilizing, stabalize to 1 HP (instead of 0)",
          },
          {
            title: "Researcher",
            description:
              "When recalling lore and you don't know, you at least know where to find that information",
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
    "- Shortsword\n" +
    "- backpack\n" +
    "- bedroll\n" +
    "- mess kit\n" +
    "- tinderbox\n" +
    "- 10 torches\n" +
    "- 10 rations\n" +
    "- waterskin\n" +
    "- 50 ft. of hempen rope\n" +
    "- 10 darts\n" +
    "- healer's kit\n" +
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
      :skill-expertise-list="SKILL_EXPERTISE"
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
  gap: var(--size-24);

  .divider {
    border-bottom: var(--size-1) solid var(--text-color-darker-1);
  }
}
</style>
