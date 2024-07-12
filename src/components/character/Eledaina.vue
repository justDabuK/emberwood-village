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
  getLeatherArmorClass,
  getShieldArmorClass,
  getUnarmoredDefenseArmorClass,
} from "../../scripts/armorClassUtils.ts";
import { getFullCasterSpellSlots, Spell } from "../../scripts/spellUtils.ts";
import SpellCheatSheet from "./SpellCheatSheet/SpellCheatSheetContainer.vue";
import NoteSection from "./NoteSection.vue";
import type { CollectionEntry } from "astro:content";
import WizardSpellCheatSheet from "./SpellCheatSheet/WizardSpellCheatSheet.vue";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const LEVEL = 3;

const preparedSpellNameList = [
  // --- Cantrips:  2 ---
  Spell.ThornWhip,
  Spell.Druidcraft,
  // --- known spells : 6 ---
  Spell.Entangle,
  Spell.Thunderwave,
  Spell.CureWounds,
  Spell.FaerieFire,
  Spell.Moonbeam,
  Spell.WitherAndBloom,
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

const racialBonusPlus2 = 2;
const racialBonusPlus1 = 1;

const ABILITY_SCORES: AbilityScores = {
  STR: 8,
  DEX: 13 + racialBonusPlus1,
  CON: 14,
  INT: 12,
  WIS: 15 + racialBonusPlus2,
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
  Skill.Performance,
  Skill.Persuasion,
  Skill.Perception,
  Skill.Survival,
  Skill.Medicine,
  Skill.Religion,
];

const SKILL_EXPERTIES: Skill[] = [];

const defaultCreatureList: Creature[] = [
  {
    name: "Eledaina",
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
    armorClass: getShieldArmorClass(getLeatherArmorClass(MODIFIER.DEX)),
    initiative: MODIFIER.DEX,
    inspiration: false,
    magic: {
      spellSlots: getFullCasterSpellSlots(LEVEL),
      refresh: TypeOfRest.LONG,
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
            items: [
              { name: "Quarterstaff", dice: `1d6+${MODIFIER.STR}` },
              { name: "Unarmed Horn Strik", dice: `1d6+${MODIFIER.STR}` },
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
            title: "Combat wild shape",
            description: `Transform into a beast of CR 1 or lower. Stay in shape for ${Math.floor(LEVEL / 2)} hour(s)`,
            usages: {
              flags: [...Array(2)].fill(false),
              typeOfRest: TypeOfRest.SHORT,
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
            title: "Spell Opportunity Attack (Warcaster)",
            description: "Any single target spell with 1 action casting time",
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
            title: "Walking 35ft.",
            description: "(7 squares)",
          },
          {
            title: "Mirthful Leaps",
            description: "When jumping add 1d8 in feet to the distance",
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Magic Resistance",
            description: "Advantage against spell saving throws",
          },
          {
            title: "Warcaster",
            description: "Advantage on concentration checks",
          },
        ],
      },
    ],
  },
  {
    name: "Dire Wolf",
    hitPoints: {
      current: 37,
      max: 37,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 14,
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Bite Attack",
            dice: "d20+5",
            description: "DC 13 STR save or knocked prone",
            items: [{ name: "Bite", dice: "2d6+3" }],
          },
        ],
      },
      {
        title: "Bonus Action",
        used: false,
        subsections: [
          {
            title: "Combat wild shape",
            description: `Use spell slots for healing`,
            dice: "1d8*Lvl",
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
            title: "Walking 50ft.",
            description: "(10 squares)",
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Keen Hearing and Smell",
            description:
              "Advantage on Perception checks that rely on hearing or smell.",
          },
          {
            title: "Pack Tactics",
            description:
              "Advantage on attacks when at least one allie within 5 ft.",
          },
        ],
      },
    ],
  },
  {
    name: "Brown Bear",
    hitPoints: {
      current: 34,
      max: 34,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 11,
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Multiattack(one of each)",
            dice: "d20+6",
            items: [
              { name: "Bite", dice: "1d8+4" },
              { name: "Claw", dice: "2d6+4" },
            ],
          },
        ],
      },
      {
        title: "Bonus Action",
        used: false,
        subsections: [
          {
            title: "Combat wild shape",
            description: `Use spell slots for healing`,
            dice: "1d8*Lvl",
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
            title: "Walking 40ft.",
            description: "(8 squares)",
          },
          {
            title: "Climbing 30ft.",
            description: "(6 squares)",
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Keen Smell",
            description: "Advantage on Perception checks that rely on smell.",
          },
        ],
      },
    ],
  },
  {
    name: "Giant Spider",
    hitPoints: {
      current: 26,
      max: 26,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 14,
    sectionList: [
      {
        title: "Action",
        used: false,
        subsections: [
          {
            title: "Melee Attack",
            dice: "d20+5",
            description: "DC 11 CON save or 2d8 poison dmg(or half)",
            items: [{ name: "Bite", dice: "1d8+3" }],
          },
          {
            title: "Ranged Attack (Web)",
            dice: "d20+5",
            description:
              "target is restrained. Can use STR save as action to break free. Web has AC 10, 5 HP",
            items: [{ name: "Web (30/60 ft.)", dice: "DC 12" }],
          },
        ],
      },
      {
        title: "Bonus Action",
        used: false,
        subsections: [
          {
            title: "Combat wild shape",
            description: `Use spell slots for healing`,
            dice: "1d8*Lvl",
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
            description: "(6 squares)",
          },
          {
            title: "Climbing 30ft.",
            description: "(6 squares)",
          },
        ],
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Spider Climb",
            description: "Can climb difficult surfaces, including upside down",
          },
          {
            title: "Web Sense",
            description:
              "While in contact with a web, knows exact location of everything in contact with the web",
          },
          {
            title: "Web Walker",
            description: "Ignore movement restrictions caused by webbing",
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
    "- wooden shield (AC + 2)\n" +
    "- Quarterstaff\n" +
    "- Leather armor (AC = 11 + DEX)\n" +
    "- backpack\n" +
    "- bedroll\n" +
    "- mess kit\n" +
    "- tinderbox\n" +
    "- 10 torches\n" +
    "- 10 days of rations\n" +
    "- waterskin\n" +
    "- 50 ft. of hempen rope\n" +
    "- druidic focus\n" +
    "- scroll case\n" +
    "- winter blanket\n" +
    "- common clothes\n" +
    "- herbalism kit\n" +
    "- 5 gp",
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
    <SpellCheatSheet
      v-if="creatureList[0].magic"
      v-model:spell-slots="creatureList[0].magic.spellSlots"
      v-model:concentration="creatureList[0].magic.concentration"
      :all-spells="allSpells"
      :type-of-rest="creatureList[0].magic.refresh"
      :known-spell-name-list="preparedSpellNameList"
      :spells-save-dice-check="8 + MODIFIER.WIS + getProficiencyBonus(LEVEL)"
      :spell-attack-modifier="MODIFIER.WIS + getProficiencyBonus(LEVEL)"
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
