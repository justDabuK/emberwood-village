<script setup lang="ts">

import {type SpellSlots, TypeOfRest} from "../../scripts/cheatSheetTypes.ts";
import type {MarkdownInstance} from "astro";
import type {Spell} from "../../scripts/spellUtils.ts";
import SpellSchoolIcon from "./SpellSchoolIcon.vue";
import SpellRangeIcon from "./SpellRangeIcon.vue";
import {computed} from "vue";

const props = defineProps<{
  allSpells: MarkdownInstance<Record<string, any>>[];
  typeOfRest: TypeOfRest;
  knownSpellNameList: Spell[];
  spellsSaveDiceCheck: number;
  spellAttackModifier: number;
}>();

const spellSlots = defineModel<SpellSlots>("spellSlots", {required: true});
const concentration = defineModel<boolean>("concentration");
const currentSpellSlotLevel = computed(() => Object.keys(spellSlots.value)[0])

const knownSpellList = props.allSpells.filter((spell) => props.knownSpellNameList.includes(spell.frontmatter.title)).sort((a, b) => a.frontmatter.level - b.frontmatter.level);

const isBonusActionSpell = (spell: MarkdownInstance<Record<string, any>>) => spell.frontmatter.castingTime.includes('bonus');
const isReactionSpell = (spell: MarkdownInstance<Record<string, any>>) => spell.frontmatter.castingTime.includes('reaction');
const isActionSpell = (spell: MarkdownInstance<Record<string, any>>) => spell.frontmatter.castingTime.includes('action') && !isBonusActionSpell(spell) && !isReactionSpell(spell);
const isRitualSpell = (spell: MarkdownInstance<Record<string, any>>) => spell.frontmatter.ritual;

const bonusActionSpellList = knownSpellList.filter(isBonusActionSpell);
const actionSpellList = knownSpellList.filter(isActionSpell);
const reactionSpellList = knownSpellList.filter(isReactionSpell);
const ritualSpellList = knownSpellList.filter(isRitualSpell);
const remainingSpellList = knownSpellList.filter((spell) => !isBonusActionSpell(spell) && !isActionSpell(spell) && !isReactionSpell(spell) && !isRitualSpell(spell));

const spellSectionList = [
  {title: 'Action', spells: actionSpellList},
  {title: 'Bonus Action', spells: bonusActionSpellList},
  {title: 'Reaction', spells: reactionSpellList},
  {title: 'Ritual', spells: ritualSpellList},
  {title: 'Remaining', spells: remainingSpellList}
];

const getCostlyComponent = (components: string) => {
  const match = components.match(/\((.+)\)/);
  return match ? match[1] : "";
};

const isCostlySpell = (components: string) => {
  return components.includes('delerium') || components.includes('gold') || components.includes('gp') ;
};
</script>

<template>
  <div class="spell-cheat-sheet-container">
    <div class="spell-cheat-sheet-header">
      <div class="card">
        <h2>DC</h2>
        <h2>{{spellsSaveDiceCheck}}</h2>
      </div>
      <div class="card">
        <h2>ATK</h2>
        <h2>{{`+${spellAttackModifier}`}}</h2>
      </div>
      <div class="card">
        <h2>{{ `Spell Slots per ${typeOfRest}`}}</h2>
        <ul>
          <li v-for="(slot, level) in spellSlots" :key="level">
            {{ `${level}: ` }}
            <input v-if="slot" v-for="(_, index) in slot.flags" :key="index" type="checkbox" v-model="slot.flags[index]">
          </li>
        </ul>
      </div>
      <div class="card concentration">
        <h2>Concentration</h2>
        <input type="checkbox" v-model="concentration">
      </div>
    </div>
    <div class="spell-cheat-sheet-body">
      <div v-for="spellSection in spellSectionList" :key="spellSection.title" class="spell-section">
        <h2>{{spellSection.title}}</h2>
        <div class="spell-section-spell-list">
          <a v-for="spell in spellSection.spells" :key="spell.frontmatter.title" :href="spell.url" :class="['card', 'spell', spell.frontmatter.duration.includes('Concentration') ? 'concentration' : '', 'card', 'spell', spell.frontmatter.level === 0 ? 'cantrip' : '']">
            <SpellSchoolIcon class="spell-school-icon" :spell-school="spell.frontmatter.school"/>
            <SpellRangeIcon class="spell-range-icon" :range="spell.frontmatter.range"/>
            <p>{{ spell.frontmatter.title }}</p>
            <p v-if="spell.frontmatter.effect && spell.frontmatter.effect[currentSpellSlotLevel]">{{ spell.frontmatter.effect[currentSpellSlotLevel] }}</p>
            <p v-if="isCostlySpell(spell.frontmatter.components)" class="cost">
              {{ getCostlyComponent(spell.frontmatter.components) }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spell-cheat-sheet-container {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .spell-cheat-sheet-header {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }

  .spell-cheat-sheet-body {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(620px, 1fr));
    gap: 20px;

    .spell-section {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .spell-section-spell-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;

        .spell {
          position: relative;
          display: flex;
          flex-direction: column;
          text-align: center;
          color: var(--text-color);

          .spell-school-icon {
            position: absolute;
            top: 10px;
            left: 10px;
            height: 30px;
            width: 30px;
            color: var(--text-color-darker-1);
          }

          .spell-range-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            height: 30px;
            width: 30px;
            color: var(--text-color-darker-1);
          }

          .cost {
            border: 1px solid var(--text-color-darker-1);
            border-radius: 10px;
            padding: 5px;
          }
        }
      }
    }
  }

  --concentration-color: oklch(76.99% 0.08 226.91 / 0.2);
  --cantrip-color: oklch(40% 0.032 304.82 / 0.4);
  .concentration {
    background-color: var(--concentration-color);

    &.cantrip {
      background: linear-gradient(90deg, var(--cantrip-color), var(--concentration-color));
    }
  }

  .cantrip {
    background-color: var(--cantrip-color);
  }
}
</style>