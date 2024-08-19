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
  getLeatherArmorClass,
  getShieldArmorClass,
} from "../../scripts/armorClassUtils.ts";
import { getFullCasterSpellSlots, Spell } from "../../scripts/spellUtils.ts";
import type { CollectionEntry } from "astro:content";
import SpellCasterCheatSheet from "./CheatSheet/SpellCasterCheatSheet.vue";
import { useTelepathic } from "../../scripts/feats/telepathic.ts";
import { useDireWolf } from "../../scripts/wildShapes/useDireWolf.ts";
import { useGiantToad } from "../../scripts/wildShapes/useGiantToad.ts";
import { useGiantOctopus } from "../../scripts/wildShapes/useGiantOctopus.ts";
import { useBrownBear } from "../../scripts/wildShapes/useBrownBear.ts";
import { useGiantSpider } from "../../scripts/wildShapes/useGiantSpider.ts";
import { useWarCaster } from "../../scripts/feats/warCaster.ts";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const LEVEL = 4;

const preparedSpellNameList = [
  // --- Cantrips:  2 ---
  Spell.ThornWhip,
  Spell.Druidcraft,
  // --- known spells : 8 ---
  Spell.Entangle,
  Spell.Thunderwave,
  Spell.CureWounds,
  Spell.FaerieFire,
  Spell.Moonbeam,
  Spell.WitherAndBloom,
  Spell.DetectPoisonAndDisease,
  Spell.PurifyFoodAndDrink,
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

const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = ["INT", "WIS"];

const SKILL_PROFICIENCIES = [
  Skill.Performance,
  Skill.Persuasion,
  Skill.Perception,
  Skill.Survival,
  Skill.Medicine,
  Skill.Religion,
];

const SKILL_EXPERTISE: Skill[] = [];

// --- pre creation stuff ---
const { postCreatureCreation: applyWarCasterPostCreation } = useWarCaster(); // beginner feat
const {
  preCreatureCreation: applyTelepathicPreCreation,
  postCreatureCreation: applyTelepathicPostCreation,
} = useTelepathic("WIS"); // 4th level
// 4th level
applyTelepathicPreCreation(ABILITY_SCORES, preparedSpellNameList);

const defaultCreatureList: Creature[] = [
  {
    name: "Eledaina",
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
    armorClass: getShieldArmorClass(
      getLeatherArmorClass(getModifier(ABILITY_SCORES.DEX)),
    ),
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
        8 + getModifier(ABILITY_SCORES.WIS) + getProficiencyBonus(LEVEL),
      spellAttackModifier:
        getModifier(ABILITY_SCORES.WIS) + getProficiencyBonus(LEVEL),
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
              {
                name: "Unarmed Horn Strik",
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
        ],
      },
    ],
  },
];

// --- post creation stuff ---
applyWarCasterPostCreation(defaultCreatureList);
applyTelepathicPostCreation(defaultCreatureList);

const { postCreatureCreation: addDireWolf } = useDireWolf();
const { postCreatureCreation: addBrownBear } = useBrownBear();
const { postCreatureCreation: addGiantSpider } = useGiantSpider();
const { postCreatureCreation: addGiantToad } = useGiantToad();
const { postCreatureCreation: addGiantOctopus } = useGiantOctopus();

addDireWolf(defaultCreatureList);
addBrownBear(defaultCreatureList);
addGiantSpider(defaultCreatureList);
addGiantToad(defaultCreatureList);
addGiantOctopus(defaultCreatureList);

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
  <SpellCasterCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    :all-spells="allSpells"
    :known-spell-name-list="preparedSpellNameList"
    @reset-to-default="resetToDefault"
  />
</template>
