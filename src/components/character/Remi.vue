<script setup lang="ts">
import {type AbilityScores, type Creature, getModifier, Skill, TypeOfRest} from "../../scripts/cheatSheetTypes.ts";
import {ref} from "vue";
import RoundCheatSheet from "./RoundCheatSheet.vue";
import {useStorage} from "@vueuse/core";
import SkillCheatSheet from "./SkillCheatSheet.vue";
import {getStuddedLeatherArmorClass} from "../../scripts/armorClassUtils.ts";

const REMI_LEVEL = 4;
const REMI_PROFICIENCY_BONUS = 2;
const getSneakAttackDice = () => {
  if(REMI_LEVEL < 3) {
    return '1d6';
  } else if (REMI_LEVEL < 5) {
    return '2d6';
  } else if (REMI_LEVEL < 7) {
    return '3d6';
  } else if (REMI_LEVEL < 9) {
    return '4d6';
  } else if (REMI_LEVEL < 11) {
    return '5d6';
  } else if (REMI_LEVEL < 13) {
    return '6d6';
  } else if (REMI_LEVEL < 15) {
    return '7d6';
  } else if (REMI_LEVEL < 17) {
    return '8d6';
  } else if (REMI_LEVEL < 19) {
    return '9d6';
  } else {
    return '10d6';
  }
};

const ABILITY_SCORES: AbilityScores = {
  STR: 8,
  DEX: 19,
  CON: 13,
  INT: 12,
  WIS: 10,
  CHA: 17
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
  "DEX",
  "INT"
];

const SKILL_PROFICIENCIES = [
  Skill.Athletics,
  Skill.Acrobatics,
  Skill.Stealth,
  Skill.ThievesTools,
  Skill.History,
  Skill.Perception,
  Skill.Performance
]

const SKILL_EXPERTIES = [
  Skill.Deception,
  Skill.Persuasion
]

const dualWielderArmorclassBonus = 1;


const defaultRemiCreatureList = [
  {
    name: "Remi",
    hitPoints: {
      current: (5 + MODIFIER.CON) * REMI_LEVEL,
      max: (5 + MODIFIER.CON) * REMI_LEVEL,
      temporary: 0,
      hitDice: {
        flags: [...Array(REMI_LEVEL)].fill(false),
        description: 'd8',
        typeOfRest: TypeOfRest.LONG,
      }
    },
    contamination: 0,
    exhaustion: 0,
    armorClass: getStuddedLeatherArmorClass(MODIFIER.DEX) + dualWielderArmorclassBonus,
    inspiration: false,
    sectionList: [
      {
        title: 'Action',
        used: false,
        subsections: [
          {
            title: '2 Weapon Attacks (Dual Wielder)',
            dice: `d20+${MODIFIER.DEX + REMI_PROFICIENCY_BONUS}`,
            items: [
              {name: 'Shortsword', dice: `1d6+${MODIFIER.DEX}`},
            ]
          },
          {
            title: 'Hat of Disguise',
            description: 'Disguise Self at will as an action'
          }
        ]
      },
      {
        title: 'Sneak Attack',
        used: false,
        subsections: [
          {
            title: 'Sneak Attack',
            description: 'if advantage, OR ally within 5ft. of target OR no one within 5ft. of you AND no disadvantage',
            items: [
                {
                  name: 'Damage',
                  dice: getSneakAttackDice(),
                }
            ]
          }
        ]
      },
      {
        title: 'Bonus Action',
        used: false,
        subsections: [
          {
            title: 'Cunning Action',
            description: 'Dash, Disengage, or Hide'
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
          {
            title: 'Climbing 30ft.',
            description: '(6 Felder)'
          },
          {
            title: 'Feline Agility',
            description: 'Double movement speed for one turn, reactivates if 0 movement on 1 turn'
          }
        ]
      },
      {
        title: 'Features',
        subsections: [
          {
            title: 'Actor',
            description: 'Advantage on Deception & Performance if impersonating'
          },
          {
            title: 'Noble Confidence',
            usages: {
              flags: [...Array(REMI_PROFICIENCY_BONUS)].fill(false),
              typeOfRest: TypeOfRest.SHORT
            },
            description: `give 1d4 bonus to ability check, saving throw or attack roll, to ${REMI_PROFICIENCY_BONUS} allies per short rest`
          },{
          title: 'Fancy Footwork',
            description: 'no opportunity attacks from target when meleed before'
          }
        ]
      }
    ]
  }
];

const creatureList = useStorage<Creature[]>('remi-creature-list', defaultRemiCreatureList);

const resetToDefault = () => {
  creatureList.value = defaultRemiCreatureList;
};
</script>

<template>
  <div class="cheat-sheet-list">
    <RoundCheatSheet v-model="creatureList" @reset-to-default="resetToDefault"/>
    <div class="divider" />
    <SkillCheatSheet
        :modifiers="MODIFIER"
        :ability-scores="ABILITY_SCORES"
        :saving-throw-proficiency-list="SAVING_THROW_PROFICIENCIES_LIST"
        :skill-proficiency-list="SKILL_PROFICIENCIES"
        :skill-expertise-list="SKILL_EXPERTIES"
        :proficiency-bonus="REMI_PROFICIENCY_BONUS"
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
