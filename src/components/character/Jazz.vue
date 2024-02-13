<script setup lang="ts">
import RoundCheatSheet from "./RoundCheatSheet.vue";
import type {Creature} from "../../scripts/cheatSheetTypes.ts";
import {ref} from "vue";

const JAZZ_LEVEL = 3;
const JAZZ_PROFICIENCY_BONUS = 2;

const creatureList = ref<Creature[]>([
    {
      name: "Jazz",
      healthPoints: {
        current: (7 + 3) * JAZZ_LEVEL,
        max: (7 + 3) * JAZZ_LEVEL,
      },
      armorClass: 15,
      sectionList: [
        {
          title: 'Action',
          used: false,
          subsections: [
            {
              title: 'Weapon Attack',
              dice: 'D20+6',
              items: [
                {
                  name: 'any weapon',
                  dice: '1d12+4(+6 R)'
                }
              ]
            },
            {
              title: "Breath Weapon",
              dice: "2/LS", // TODO: introduce checkbox for limited resources
              description: "15ft. cone, 1d10 force damage, DEX save (DC 13) for half"
            }
          ]
        },
        {
          title: 'Brute Strength',
          used: false,
          subsections: [
            {
              title: 'Grapple or Shove',
              description: 'when melee attack hits, can attempt to grapple or shove same creature',
              dice: 'D20+6'
            }
          ]
        },
        {
          title: 'Bonus Action',
          used: false,
          subsections: [
            {
              title: 'Rage',
              dice: '2/LS',
              description: 'resistance to bludgeoning, piercing, and slashing damage. +2 damage. Advantage on Strength ability checks & saving throws'
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
              title: 'Long Jump',
              description: '10ft. run-up, 36ft. jump'
            },
            {
              title: 'High Jump',
              description: '10ft. run-up, 14ft. jump'
            }
          ]
        },
        {
          title: 'Features',
          subsections: [
            {
              title: 'Psionic Mind',
              description: '30ft. telepathy'
            },
            {
              title: 'Draconic Resistance',
              description: 'resistance to force damage'
            },
            {
              title: 'Noble Confidence',
              description: `give 1d4 bonus to ability check, saving throw or attack roll, to ${JAZZ_PROFICIENCY_BONUS} allies per short rest`
            }
          ]
        }
      ]
    }
]);

</script>

<template>
  <RoundCheatSheet v-model="creatureList" />
</template>
