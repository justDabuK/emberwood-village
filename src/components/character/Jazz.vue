<script setup lang="ts">
import RoundCheatSheet from "./RoundCheatSheet.vue";
import {type AbilityScores, type Creature, getModifier, Skill, TypeOfRest} from "../../scripts/cheatSheetTypes.ts";
import {useStorage} from "@vueuse/core";
import SkillCheatSheet from "./SkillCheatSheet.vue";
import {getUnarmoredDefenseArmorClass} from "../../scripts/armorClassUtils.ts";

const JAZZ_LEVEL = 4;
const JAZZ_PROFICIENCY_BONUS = 2;
const JAZZ_NUMBER_OF_RAGES = 3;
const JAZZ_RAGE_DAMAGE = 2;

const ABILITY_SCORES: AbilityScores = {
  STR: 19,
  DEX: 14,
  CON: 16,
  INT: 8,
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
  "STR",
  "CON"
];

const SKILL_PROFICIENCIES = [
    Skill.Athletics,
    Skill.Survival,
    Skill.Persuasion
]

const SKILL_EXPERTIES = [
  Skill.Intimidation
]

const breathWeaponDamageDiceNumber = () => {
  if(JAZZ_LEVEL < 5) {
    return 1;
  } else if (JAZZ_LEVEL < 11) {
    return 2;
  } else if (JAZZ_LEVEL < 17) {
    return 3;
  } else {
    return 4;
  }
};

const defaultJazzCreatureList = [
    {
      name: "Jazz",
      hitPoints: {
        current: (7 + MODIFIER.CON) * JAZZ_LEVEL,
        max: (7 + MODIFIER.CON) * JAZZ_LEVEL,
        temporary: 0,
        hitDice: {
          flags: [...Array(JAZZ_LEVEL)].fill(false),
          description: 'd12',
          typeOfRest: TypeOfRest.LONG,
        }
      },
      contamination: 0,
      exhaustion: 0,
      armorClass: getUnarmoredDefenseArmorClass(MODIFIER.DEX, MODIFIER.CON),
      inspiration: false,
      sectionList: [
        {
          title: 'Action',
          used: false,
          subsections: [
            {
              title: 'Weapon Attack',
              dice: `d20+${JAZZ_PROFICIENCY_BONUS + MODIFIER.STR}`,
              items: [
                {
                  name: 'any weapon',
                  dice: `1d12+${MODIFIER.STR}(+${MODIFIER.STR + JAZZ_RAGE_DAMAGE} R)`
                }
              ]
            },
            {
              title: "Breath Weapon",
              usages: {
                flags: [...Array(JAZZ_PROFICIENCY_BONUS)].fill(false),
                typeOfRest: TypeOfRest.LONG,
              },
              description: `15ft. cone, ${breathWeaponDamageDiceNumber()}d10 force damage, DEX save (DC ${8 + MODIFIER.CON + JAZZ_PROFICIENCY_BONUS}) for half`
            },
            {
              title: 'Dragon Fear',
              dice: `DC ${8 + JAZZ_PROFICIENCY_BONUS + MODIFIER.CHA} WIS save`,
              description: 'creatures within 30ft.(6 Felder), frightened for 1 minute if fail, can repeat save when taking damage'
            },
            {
              title: 'Coiling Grasp Tattoo',
              dice: 'DC 14 STR/DEX save',
              description: "3d6 force damage, grappled. Reach is 15 ft. (3 Felder)"
            },
            {
              title: "Pin down (from Grappler)",
              description: "restrain a creature you are grappling (everyone gets advantage on attacks against it & you, you and it have disadvantage on attack rolls)",
              dice: `d20+${JAZZ_PROFICIENCY_BONUS + MODIFIER.STR}`,
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
              dice: `d20+${JAZZ_PROFICIENCY_BONUS + MODIFIER.STR}`
            }
          ]
        },
        {
          title: 'Reckless Attack',
          used: false,
          subsections: [
            {
              title: 'Advantage on demand',
              description: "advantage on attack rolls, but attackers also have advantage against you. Use when you don't hit",
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
const resetToDefault = () => {
  creatureList.value = defaultJazzCreatureList;
};
const notesStorage = useStorage<string>('jazz-notes', "");
</script>

<template>
  <div class="cheat-sheet-list">
    <RoundCheatSheet v-model="creatureList" @reset-to-default="resetToDefault" class="round-cheat-sheet" />
    <div class="divider" />
    <SkillCheatSheet
        :modifiers="MODIFIER"
        :ability-scores="ABILITY_SCORES"
        :saving-throw-proficiency-list="SAVING_THROW_PROFICIENCIES_LIST"
        :skill-proficiency-list="SKILL_PROFICIENCIES"
        :skill-expertise-list="SKILL_EXPERTIES"
        :proficiency-bonus="JAZZ_PROFICIENCY_BONUS"
    />
    <div class="divider" />
    <textarea v-model="notesStorage" placeholder="Notes"></textarea>
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
