<script setup lang="ts">
import type {Creature} from "../../scripts/cheatSheetTypes.ts";
import {ref} from "vue";
import RoundCheatSheet from "./RoundCheatSheet.vue";

const REMI_LEVEL = 3;
const REMI_PROFICIENCY_BONUS = 2;

const creatureList = ref<Creature[]>([
  {
    name: "Remi",
    healthPoints: {
      current: (5 + 1) * REMI_LEVEL,
      max: (5 + 1) * REMI_LEVEL,
    },
    armorClass: 14,
    sectionList: [
      {
        title: 'Action',
        used: false,
        subsections: [
          {
            title: 'Weapon Attack',
            dice: 'D20+6',
            items: [
              {name: 'Shortsword', dice: '1d6+4'},
            ]
          },
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
                  dice: '2d6',
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
            title: 'Off-hand Attack',
            dice: 'D20+6',
            items: [
              {name: 'Shortsword', dice: '1d6'},
            ]
          },
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
            description: `give 1d4 bonus to ability check, saving throw or attack roll, to ${REMI_PROFICIENCY_BONUS} allies per short rest`
          }
        ]
      }
    ]
  }
])
</script>

<template>
  <RoundCheatSheet v-model="creatureList" />
</template>