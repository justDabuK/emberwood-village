<script setup lang="ts">
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  type SpellSlots,
  TypeOfRest,
} from "../../scripts/cheatSheetTypes.ts";
import RoundCheatSheet from "./RoundCheatSheet.vue";
import { useStorage } from "@vueuse/core";
import SkillCheatSheet from "./SkillCheatSheet.vue";
import {
  getChainShirtArmorClass,
  getUnarmoredDefenseArmorClass,
} from "../../scripts/armorClassUtils.ts";
import { getWizardSpellSlots, Spell } from "../../scripts/spellUtils.ts";
import SpellCheatSheet from "./SpellCheatSheet.vue";
import NoteSection from "./NoteSection.vue";
import type { CollectionEntry } from "astro:content";
import WizardSpellCheatSheet from "./WizardSpellCheatSheet.vue";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const LEVEL = 3;

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
];

const preparedSpellNameList = [
  // --- Cantrips:  4 ---
  Spell.FireBolt,
  Spell.MageHand,
  Spell.MinorIllusion,
  Spell.RayOfFrost,
  // --- known spells : 7 ---
  Spell.BurningHands,
  Spell.MagicMissile,
  Spell.Shield,
  Spell.TashaSCausticBrew,
  Spell.Thunderwave,
  Spell.ScorchingRay,
  Spell.Web,
];

const getProficiencyBonus = (level: number) => {
  if (level < 5) {
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

const MODIFIER: AbilityScores = {
  STR: getModifier(ABILITY_SCORES.STR),
  DEX: getModifier(ABILITY_SCORES.DEX),
  CON: getModifier(ABILITY_SCORES.CON),
  INT: getModifier(ABILITY_SCORES.INT),
  WIS: getModifier(ABILITY_SCORES.WIS),
  CHA: getModifier(ABILITY_SCORES.CHA),
};

const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = ["INT", "WIS"];

const SKILL_PROFICIENCIES = [
  Skill.Medicine,
  Skill.Investigation,
  Skill.Arcana,
  Skill.History,
];

const SKILL_EXPERTIES: Skill[] = [];

const defaultCreatureList: Creature[] = [
  {
    name: "Zara",
    hitPoints: {
      current: 6 + MODIFIER.CON + (4 + MODIFIER.CON) * (LEVEL - 1),
      max: 6 + MODIFIER.CON + (4 + MODIFIER.CON) * (LEVEL - 1),
      temporary: 0,
      hitDice: {
        flags: [...Array(LEVEL)].fill(false),
        description: "d6",
        typeOfRest: TypeOfRest.LONG,
      },
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: getUnarmoredDefenseArmorClass(MODIFIER.DEX),
    initiative: MODIFIER.DEX,
    inspiration: false,
    magic: {
      spellSlots: getWizardSpellSlots(LEVEL),
      refresh: TypeOfRest.SHORT,
      concentration: false,
    },
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Weapon Attack",
            dice: `d20+${MODIFIER.STR + getProficiencyBonus(LEVEL)}`,
            items: [{ name: "Quarterstaff", dice: `1d6+${MODIFIER.STR}` }],
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
            description: `when taken damage from creature withing 10 ft. then DC ${8 + getProficiencyBonus(LEVEL) + MODIFIER.INT} for 2d8 force damage and push for 10 ft. (2 squares)`,
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
      :proficiency-bonus="getProficiencyBonus(LEVEL)"
    />
    <div class="divider" />
    <WizardSpellCheatSheet
      v-if="creatureList[0].magic"
      v-model:spell-slots="creatureList[0].magic.spellSlots"
      v-model:concentration="creatureList[0].magic.concentration"
      :all-spells="allSpells"
      :type-of-rest="creatureList[0].magic.refresh"
      :spell-book-spell-name-list="spellBookSpellNameList"
      :prepared-spell-name-list="preparedSpellNameList"
      :spells-save-dice-check="8 + MODIFIER.INT + getProficiencyBonus(LEVEL)"
      :spell-attack-modifier="MODIFIER.INT + getProficiencyBonus(LEVEL)"
      :caster-level="LEVEL"
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
}
</style>
