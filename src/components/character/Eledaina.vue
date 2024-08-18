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
import {
  getLeatherArmorClass,
  getShieldArmorClass,
} from "../../scripts/armorClassUtils.ts";
import { getFullCasterSpellSlots, Spell } from "../../scripts/spellUtils.ts";
import type { CollectionEntry } from "astro:content";
import SpellCasterCheatSheet from "./CheatSheet/SpellCasterCheatSheet.vue";

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

// --- 4th level ---
const telepathicAbilityScoreIncrease = 1;
ABILITY_SCORES.WIS += telepathicAbilityScoreIncrease;
const telepathicFeatureSubsection: Subsection = {
  title: "Telepathic",
  description:
    "speak telepathically in any language you know to any creature you can see within 60ft. (20 squares)",
};
const telepathicActionSubsection: Subsection = {
  title: "Detect Thoughts",
  usages: {
    flags: [false],
    typeOfRest: TypeOfRest.LONG,
  },
  description: "for free, 2nd level",
};
preparedSpellNameList.push(Spell.DetectThoughts);

// --- direWolf --
const direWolfAbilityScores: AbilityScores = {
  STR: 17,
  DEX: 15,
  CON: 15,
  INT: 3,
  WIS: 12,
  CHA: 7,
};
const direWolfSavingThrowProficiencyList: (keyof AbilityScores)[] = [];
const direWolfSkillProficiencies: Skill[] = [Skill.Perception, Skill.Stealth];
const direWolfProficiencyBonus = 2;

// --- brown bear ---
const brownBearAbilityScores: AbilityScores = {
  STR: 19,
  DEX: 10,
  CON: 16,
  INT: 2,
  WIS: 13,
  CHA: 7,
};
const brownBearSavingThrowProficiencyList: (keyof AbilityScores)[] = [];
const brownBearSkillProficiencies: Skill[] = [Skill.Perception];
const brownBearProficiencyBonus = 2;

// --- giant spider ---
const giantSpiderAbilityScores: AbilityScores = {
  STR: 14,
  DEX: 16,
  CON: 12,
  INT: 2,
  WIS: 11,
  CHA: 4,
};
const giantSpiderSavingThrowProficiencyList: (keyof AbilityScores)[] = [];
const giantSpiderSkillProficiencies: Skill[] = [Skill.Stealth];
const giantSpiderProficiencyBonus = 2;

// --- giant toad ---
const giantToadAbilityScores: AbilityScores = {
  STR: 15,
  DEX: 13,
  CON: 13,
  INT: 2,
  WIS: 10,
  CHA: 3,
};
const giantToadProficiencyBonus = 2;

const giantToad: Creature = {
  name: "Giant Toad",
  hitPoints: {
    current: 39,
    max: 39,
  },
  contamination: 0,
  exhaustion: 0,
  armorClass: 11,
  abilityScores: giantToadAbilityScores,
  savingThrowProficiencyList: [],
  skill: {
    proficiencies: [],
    expertise: [],
  },
  proficiencyBonus: giantToadProficiencyBonus,
  sectionList: [
    {
      title: "Action",
      used: false,
      subsections: [
        {
          title: "Bite Attack",
          dice: "d20+4",
          description: "target is grappled & restrained (escape DC 13)",
          items: [{ name: "Bite", dice: "1d10+2+1d10" }],
        },
        {
          title: "Swallow",
          dice: "d20+4",
          description:
            "on hit, target is additionally swallowed-> blinded & restrained, and takes 3d6 acid damage at the start of your turn",
          items: [{ name: "Bite", dice: "1d10+2+1d10" }],
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
          description: "See Attack",
        },
      ],
    },
    {
      title: "Movement",
      used: false,
      subsections: [
        {
          title: "Walking 20ft.",
          description: "(4 squares)",
        },
        {
          title: "Swimming 40ft.",
          description: "(8 squares)",
        },
        {
          title: "Long jump (standing leap)",
          description: "20 ft. (4 squares)",
        },
        {
          title: "High jump (standing leap)",
          description: "10 ft. (2 squares)",
        },
      ],
    },
    {
      title: "Features",
      subsections: [
        {
          title: "Amphibious",
          description: "breath air and water",
        },
        {
          title: "Darkvision",
          description: "30 ft. (6 squares)",
        },
      ],
    },
  ],
};

// --- giant Octopus ---
const giantOctopusAbilityScores: AbilityScores = {
  STR: 17,
  DEX: 13,
  CON: 13,
  INT: 4,
  WIS: 10,
  CHA: 4,
};
const giantOctopusProficiencyBonus = 2;

const giantOctopus: Creature = {
  name: "Giant Octopus",
  hitPoints: {
    current: 52,
    max: 52,
  },
  contamination: 0,
  exhaustion: 0,
  armorClass: 11,
  abilityScores: giantOctopusAbilityScores,
  savingThrowProficiencyList: [],
  skill: {
    proficiencies: [Skill.Perception, Skill.Stealth],
    expertise: [],
  },
  proficiencyBonus: giantOctopusProficiencyBonus,
  sectionList: [
    {
      title: "Action",
      used: false,
      subsections: [
        {
          title: "Tentacles ",
          dice: "d20+5",
          description: "target is grappled & restrained (escape DC 16)",
          items: [{ name: "Tentacle (15ft.)", dice: "2d6+3" }],
        },
        {
          title: "Ink Cloud",
          usages: {
            flags: [false],
            typeOfRest: TypeOfRest.SHORT,
          },
          description:
            "if underwater, 20 ft. cloud. Area is heavily obscured for 1 minute",
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
        {
          title: "Dash",
          description: `If Ink Cloud as action`,
        },
      ],
    },
    {
      title: "Reaction",
      used: false,
      subsections: [
        {
          title: "Opportunity Attack",
          description: "See Attack",
        },
      ],
    },
    {
      title: "Movement",
      used: false,
      subsections: [
        {
          title: "Walking 10ft.",
          description: "(2 squares)",
        },
        {
          title: "Swimming 60ft.",
          description: "(10 squares)",
        },
      ],
    },
    {
      title: "Features",
      subsections: [
        {
          title: "Water Breathing",
          description: "can only breath under water",
        },
        {
          title: "Hold Breath",
          description: "can hold breath out of water for 1 hour",
        },
        {
          title: "Underwater Camouflage",
          description: "advantage on Stealth checks while underwater",
        },
      ],
    },
  ],
};

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
          telepathicActionSubsection,
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
          telepathicFeatureSubsection,
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
    abilityScores: direWolfAbilityScores,
    savingThrowProficiencyList: direWolfSavingThrowProficiencyList,
    skill: {
      proficiencies: direWolfSkillProficiencies,
      expertise: [],
    },
    proficiencyBonus: direWolfProficiencyBonus,
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
    abilityScores: brownBearAbilityScores,
    savingThrowProficiencyList: brownBearSavingThrowProficiencyList,
    skill: {
      proficiencies: brownBearSkillProficiencies,
      expertise: [],
    },
    proficiencyBonus: brownBearProficiencyBonus,
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
    abilityScores: giantSpiderAbilityScores,
    savingThrowProficiencyList: giantSpiderSavingThrowProficiencyList,
    skill: {
      proficiencies: giantSpiderSkillProficiencies,
      expertise: [],
    },
    proficiencyBonus: giantSpiderProficiencyBonus,
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
          {
            title: "Blindsight",
            description: "10 ft. (2 squares)",
          },
          {
            title: "Darkvision",
            description: "60 ft. (12 squares)",
          },
        ],
      },
    ],
  },
  giantToad,
  giantOctopus,
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
  <SpellCasterCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    :all-spells="allSpells"
    :known-spell-name-list="preparedSpellNameList"
    @reset-to-default="resetToDefault"
  />
</template>
