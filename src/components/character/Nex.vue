<script setup lang="ts">

import {ref} from "vue";
import {type Creature, TypeOfRest} from "../../scripts/cheatSheetTypes.ts";
import RoundCheatSheet from "./RoundCheatSheet.vue";

const NEX_LEVEL = 3;
const NEX_PROFICIENCY_BONUS = 2;

const creatureList = ref<Creature[]>([
  {
    name: "Nex",
    hitPoints: {
      current: (5 + 3) * NEX_LEVEL,
      max: (5 + 3) * NEX_LEVEL,
      temporary: 0,
      hitDice: {
        flags: [...Array(NEX_LEVEL)].fill(false),
        description: 'd8',
        typeOfRest: TypeOfRest.LONG,
      }
    },
    armorClass: 14,
    sectionList: [
      {
        title: 'Action',
        used: false,
        subsections: [
          {
            title: 'Weapon Attack',
            dice: 'd20+3',
            items: [
              {name: 'Crossbow light', dice: '1d8+1'},
              {name: 'Crossbow Hand', dice: '1d6+1'},
              {name: 'Dagger', dice: '1d4+1'}
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
            title: 'Off-hand attack',
            dice: 'd20+3',
            items: [
              {name: 'Dagger', dice: '1d4'}
            ]
          },
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
            description: `${NEX_LEVEL} HP for ${NEX_PROFICIENCY_BONUS} creatures during short rest, 1 per long rest`
          }
        ]
      }
    ]
  },
  {
    name: 'Bernhard',
    hitPoints: {
      current: 5 +5 * NEX_LEVEL,
      max: 5 +5 * NEX_LEVEL,
    },
    armorClass: 14 + NEX_PROFICIENCY_BONUS,
    sectionList: [
      {
        title: 'Action',
        used: false,
        subsections: [
          {
            title: 'Weapon Attack',
            dice: `d20+${4 + NEX_PROFICIENCY_BONUS}`,
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
]);

</script>

<template>
  <RoundCheatSheet v-model="creatureList" class="cheat-sheet" />
</template>

<style scoped>
.cheat-sheet {
  border-bottom: 1px solid var(--text-color-darker-1);
}
</style>
