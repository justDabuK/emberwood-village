<script setup lang="ts">

import {ref} from "vue";
import type {Creature} from "../../scripts/cheatSheetTypes.ts";
import RoundCheatSheet from "./RoundCheatSheet.vue";

const nexLevel = 3;
const nexProficiencyBonus = 2;

const creatureList = ref<Creature[]>([
  {
    name: "Nex",
    healthPoints: {
      current: (5 + 3) * nexLevel,
      max: (5 + 3) * nexLevel,
    },
    armorClass: 14,
    sectionList: [
      {
        title: 'Action',
        used: false,
        subsections: [
          {
            title: 'Weapon Attack',
            dice: 'D20+3',
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
            dice: 'D20+3',
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
            description: `${nexLevel} HP for ${nexProficiencyBonus} creatures during short rest, 1 per long rest`
          }
        ]
      }
    ]
  },
  {
    name: 'Bernhard',
    healthPoints: {
      current: 5 +5 * nexLevel,
      max: 5 +5 * nexLevel,
    },
    armorClass: 14 + nexProficiencyBonus,
    sectionList: [
      {
        title: 'Action',
        used: false,
        subsections: [
          {
            title: 'Weapon Attack',
            dice: `D20+${4 + nexProficiencyBonus}`,
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
    healthPoints: {
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
            dice: 'D20+3',
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
