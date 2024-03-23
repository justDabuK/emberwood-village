<script setup lang="ts">
import RoundCheatSheet from "./RoundCheatSheet.vue";
import {type Creature, TypeOfRest} from "../../scripts/cheatSheetTypes.ts";
import {ref} from "vue";
import {useStorage} from "@vueuse/core";

const JAZZ_LEVEL = 3;
const JAZZ_PROFICIENCY_BONUS = 2;
const JAZZ_NUMBER_OF_RAGES = 3;
const JAZZ_RAGE_DAMAGE = 2;

const defaultJazzCreatureList = [
    {
      name: "Jazz",
      hitPoints: {
        current: (7 + 3) * JAZZ_LEVEL,
        max: (7 + 3) * JAZZ_LEVEL,
        temporary: 0,
        hitDice: {
          flags: [...Array(JAZZ_LEVEL)].fill(false),
          description: 'd12',
          typeOfRest: TypeOfRest.LONG,
        }
      },
      armorClass: 15,
      sectionList: [
        {
          title: 'Action',
          used: false,
          subsections: [
            {
              title: 'Weapon Attack',
              dice: 'd20+6',
              items: [
                {
                  name: 'any weapon',
                  dice: `1d12+4(+${4 + JAZZ_RAGE_DAMAGE} R)`
                }
              ]
            },
            {
              title: "Breath Weapon",
              usages: {
                flags: [false, false],
                typeOfRest: TypeOfRest.LONG,
              },
              description: "15ft. cone, 1d10 force damage, DEX save (DC 13) for half"
            },
            {
              title: 'Coiling Grasp Tattoo',
              dice: 'DC 14 STR/DEX save',
              description: "3d6 force damage, grappled. Reach is 15 ft. (3 Felder)"
            },
            {
              title: "Pin down (from Grappler)",
              description: "restrain a creature you are grappling (everyone gets advantage on attacks against it & you, you and it have disadvantage on attack rolls)",
              dice: 'd20+6',
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
              dice: 'd20+6'
            }
          ]
        },
        {
          title: 'Reckless Attack',
          used: false,
          subsections: [
            {
              title: 'Advantage on demand',
              description: 'advantage on attack rolls, but attackers also have advantage against you',
            }
          ],
        },
        {
          title: 'Bonus Action',
          used: false,
          subsections: [
            {
              title: 'Rage',
              usages: {
                flags: [...Array(JAZZ_NUMBER_OF_RAGES)].fill(false),
                typeOfRest: TypeOfRest.LONG
              },
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
              description: '10ft.(2 Felder) run-up, 36ft. (7 Felder) jump'
            },
            {
              title: 'High Jump',
              description: '10ft.(2 Felder) run-up, 14ft. (2 Felder) jump'
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
              usages: {
                flags: [...Array(JAZZ_PROFICIENCY_BONUS)].fill(false),
                typeOfRest: TypeOfRest.SHORT
              },
              description: `give 1d4 bonus to ability check, saving throw or attack roll to an ally (during a short rest)`
            },
            {
              title: 'Grappler',
              description: 'advantage on attack rolls against creatures you are grappling'
            }
          ]
        }
      ]
    }
];

const creatureList = useStorage<Creature[]>('jazz-creature-list', defaultJazzCreatureList);

</script>

<template>
  <RoundCheatSheet v-model="creatureList" />
</template>
