<script setup lang="ts">
import {type AbilityScores, type Creature, getModifier, Skill, TypeOfRest} from "../../scripts/cheatSheetTypes.ts";
import RoundCheatSheet from "./RoundCheatSheet.vue";
import {useStorage} from "@vueuse/core";
import type {MarkdownInstance} from "astro";
import SkillCheatSheet from "./SkillCheatSheet.vue";
import {getHideArmorClass} from "../../scripts/armorClassUtils.ts";
import {Spell} from "../../scripts/spellUtils.ts";
import SpellCheatSheet from "./SpellCheatSheet.vue";

defineProps<{
  allSpells: MarkdownInstance<Record<string, any>>[];
}>();

const NEX_LEVEL = 4;

const knownSpellNameList = [
  Spell.Thaumaturgy,
  Spell.AcidBurn,
  Spell.AcidSplash,
  Spell.BacterialBarrage,
  Spell.Bless,
  Spell.ChillTouch,
  Spell.Guidance,
  Spell.Light,
  Spell.Mending,
  Spell.Message,
  Spell.PoisonNeedle,
  Spell.PoisonSpray,
  Spell.Resistance,
  Spell.ShockingGrasp,
  Spell.SpareTheDying,
  Spell.AcidOrb,
  Spell.Alarm,
  Spell.CometShards,
  Spell.ComprehendLanguages,
  Spell.CorruptedCure,
  Spell.CreateOrDestroyWater,
  Spell.CureWounds,
  Spell.DetectEvilAndGood,
  Spell.DetectMagic,
  Spell.DetectPoisonAndDisease,
  Spell.Envenom,
  Spell.FalseLife,
  Spell.FindFamiliar,
  Spell.FeatherFall,
  Spell.FogCloud,
  Spell.Grease,
  Spell.HealingWord,
  Spell.Identify,
  Spell.IllusoryScript,
  Spell.Infect,
  Spell.InflictWounds,
  Spell.Jump,
  Spell.PurifyFoodAndDrink,
  Spell.Sleep,
  Spell.StreamOfConsumption,
  Spell.TashaSHideousLaughter,
  Spell.TenserSFloatingDisk,
  Spell.ToxicShield,
  Spell.UnseenServant,
  Spell.Aid,
  Spell.Biohazard,
  Spell.BlindnessDeafness,
  Spell.CausticGrip,
  Spell.ControlledMutation,
  Spell.EnhanceAbility,
  Spell.EnlargeReduce,
  Spell.GentleRepose,
  Spell.GraspingGhost,
  Spell.HoldPerson,
  Spell.Invigorate,
  Spell.LesserRestoration,
  Spell.MelfSAcidArrow,
  Spell.MistyStep,
  Spell.OcularNecrosis,
  Spell.ProtectionFromPoison,
  Spell.RayOfEnfeeblement,
  Spell.SeeInvisibility,
  Spell.Silence,
  Spell.SpiderClimb,
  Spell.Web,
]
const getProficiencyBonus = (level: number) => {
  if(level < 5) {
    return 2;
  } else if(level < 9) {
    return 3;
  } else if(level < 13) {
    return 4;
  } else if(level < 17) {
    return 5;
  } else {
    return 6;
  }
};

const getCantripsKnown = (level: number) => {
  if(level < 4) {
    return 3;
  } else if(level < 10) {
    return 4;
  } else {
    return 5;
  }
};

const getSpellsKnown = (level: number, intModifier: number) => level + intModifier;

const getSpellSlots = (level: number) => {
  if(level === 1) {
    return 1;
  } else if (level < 5) {
    return 2;
  } else if(level < 9){
    return 3;
  } else if(level < 13) {
    return 4;
  } else if(level < 17) {
    return 5;
  } else {
    return 6;
  }
}

const getSlotLevel = (level: number) => {
  if(level < 3) {
    return 1;
  } else if(level < 5) {
    return 2;
  } else if(level < 7) {
    return 3;
  } else if(level < 9) {
    return 4;
  } else  {
    return 5;
  }
}

const getTheoriesKnown = (level: number) => {
  if(level === 1) {
    return 0;
  } else {
    return Math.floor(level/ 2) + 1;
  }
};

const ABILITY_SCORES: AbilityScores = {
  STR: 8,
  DEX: 14,
  CON: 16,
  INT: 20,
  WIS: 10,
  CHA: 12
};

const MODIFIER: AbilityScores = {
  STR: getModifier(ABILITY_SCORES.STR),
  DEX: getModifier(ABILITY_SCORES.DEX),
  CON: getModifier(ABILITY_SCORES.CON),
  INT: getModifier(ABILITY_SCORES.INT),
  WIS: getModifier(ABILITY_SCORES.WIS),
  CHA: getModifier(ABILITY_SCORES.CHA)
};

const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[]= [
  "INT",
  "WIS"
];

const SKILL_PROFICIENCIES = [
  Skill.Arcana,
  Skill.Investigation,
  Skill.Perception,
  Skill.Survival
];

const SKILL_EXPERTIES: Skill[] = [];

const defaultNexCreatureList: Creature[] = [
  {
    name: "Nex",
    hitPoints: {
      current: (5 + MODIFIER.CON) * NEX_LEVEL,
      max: (5 + MODIFIER.CON) * NEX_LEVEL,
      temporary: 0,
      hitDice: {
        flags: [...Array(NEX_LEVEL)].fill(false),
        description: 'd8',
        typeOfRest: TypeOfRest.LONG,
      }
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: getHideArmorClass(MODIFIER.DEX),
    magic: {
      spellSlots: {
        [getSlotLevel(NEX_LEVEL)]: {
          flags: [...Array(getSpellSlots(NEX_LEVEL))].fill(false),
          max: getSpellSlots(NEX_LEVEL),
        },
      },
      refresh: TypeOfRest.SHORT,
      concentration: false,
    },
    sectionList: [
      {
        title: 'Action',
        used: false,
        subsections: [
          {
            title: 'Weapon Attack',
            dice: `d20+${MODIFIER.DEX + getProficiencyBonus(NEX_LEVEL)}`,
            items: [
              {name: 'Crossbow light', dice: `1d8+${MODIFIER.DEX}`},
              {name: 'Crossbow Hand', dice: `1d6+${MODIFIER.DEX}`},
              {name: 'Dagger', dice: `1d4+${MODIFIER.DEX}`},
            ]
          },
          {
            title: 'Spell casting',
            description: 'See spell casting cheat sheet'
          }
        ]
      },
      {
        title: 'Bonus Action',
        used: false,
        subsections: [
          {
            title: 'Command Bernhard',
            description: 'Bernhard needs a command, otherwise he will take the Dodge action'
          },
          {
            title: 'Spell casting',
            description: 'See spell casting cheat sheet'
          }
        ]
      },
      {
        title: 'Reaction',
        used: false,
        subsections: [
          {
            title: 'Opportunity Attack',
            description: 'See Weapon Attack'
          },
          {
            title: 'Spell casting',
            description: 'See spell casting cheat sheet'
          }
        ]
      },
      {
        title: 'Movement',
        used: false,
        subsections: [
          {
            title: 'Walking 30ft.',
            description: '(6 Felder)'
          },
        ]
      },
      {
        title: "Features",
        subsections: [
          {
            title: "Fey Ancestry",
            description: "Advantage against getting charmed"
          },
          {
            title: "Makeshift meals",
            usages: {
              flags: [false],
              typeOfRest: TypeOfRest.LONG,
            },
            description: `${NEX_LEVEL} HP for ${getProficiencyBonus(NEX_LEVEL)} creatures during short rest, 1 per long rest`
          }
        ]
      }
    ]
  },
  {
    name: 'Bernhard',
    hitPoints: {
      current: 5 + 5 * NEX_LEVEL,
      max: 5 + 5 * NEX_LEVEL,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 14 + getProficiencyBonus(NEX_LEVEL),
    sectionList: [
      {
        title: 'Action',
        used: false,
        subsections: [
          {
            title: 'Weapon Attack',
            dice: `d20+${4 + getProficiencyBonus(NEX_LEVEL)}`,
            items: [
              {name: 'Slam', dice: '1d8+4'},
            ]
          },
        ]
      },
      {
        title: 'Reaction',
        used: false,
        subsections: [
          {
            title: 'Opportunity Attack',
            description: 'See Weapon Attack'
          },
        ]
      },
      {
        title: 'Movement',
        used: false,
        subsections: [
          {
            title: 'Walking 30ft.',
            description: '(6 Felder)'
          },
        ]
      },
      {
        title: 'Features',
        subsections: [
          {
            title: 'Lightning Absorption',
            description: 'If hit by lightning damage, regain HP equal to the damage'
          }
        ]
      }
    ]
  },
  {
    name: 'Hedrick',
    hitPoints: {
      current: 1,
      max: 1,
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: 11,
    sectionList: [
      {
        title: 'Action',
        used: false,
        subsections: [
          {
            title: 'Help',
            description: 'Give advantage to next attacker'
          },
          {
            title: 'Weapon Attack',
            dice: 'd20+3',
            items: [
              {name: 'Talons', dice: '1'},
            ]
          },
        ]
      },
      {
        title: 'Reaction',
        used: false,
        subsections: [
          {
            title: 'Opportunity Attack',
            description: 'See Weapon Attack'
          },
        ]
      },
      {
        title: 'Movement',
        used: false,
        subsections: [
          {
            title: 'Walking 5ft.',
            description: '(1 Feld)'
          },
          {
            title: 'Flying 60ft.',
            description: '(12 Felder)'
          },
        ]
      },
      {
        title: 'Features',
        subsections: [
          {
            title: 'Flyby',
            description: 'No opportunity attacks while flying'
          },
          {
            title: 'Keen Hearing and Sight',
            description: 'Advantage on perception checks when hearing or seeing'
          }
        ]
      }
    ]
  }
];

const creatureList = useStorage<Creature[]>('nex-creature-list', defaultNexCreatureList);
const resetToDefault = () => {
  creatureList.value = defaultNexCreatureList;
};
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
        :proficiency-bonus="getProficiencyBonus(NEX_LEVEL)"
    />
    <div class="divider" />
    <SpellCheatSheet
        v-if="creatureList[0].magic"
        v-model:spell-slots="creatureList[0].magic.spellSlots"
        v-model:concentration="creatureList[0].magic.concentration"
        :all-spells="allSpells"
        :type-of-rest="creatureList[0].magic.refresh"
        :known-spell-name-list="knownSpellNameList"
        :spells-save-dice-check="8 + MODIFIER.INT + getProficiencyBonus(NEX_LEVEL)"
        :spell-attack-modifier="MODIFIER.INT + getProficiencyBonus(NEX_LEVEL)"
    />
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
