<script setup lang="ts">

import {type SpellSlots, TypeOfRest} from "../../scripts/cheatSheetTypes.ts";
import type {MarkdownInstance} from "astro";
import type {Spell} from "../../scripts/spellUtils.ts";
import AbjurationIcon from "../../icons/abjuration.svg";
import SpellSchoolIcon from "./SpellSchoolIcon.vue";
import SpellRangeIcon from "./SpellRangeIcon.vue";

const props = defineProps<{
  allSpells: MarkdownInstance<Record<string, any>>[];
  typeOfRest: TypeOfRest;
  knownSpellNameList: Spell[];
  spellsSaveDiceCheck: number;
  spellAttackModifier: number;
}>();

const spellSlots = defineModel<SpellSlots>("spellSlots");
const concentration = defineModel<boolean>("concentration");

const knownSpellList = props.allSpells.filter((spell) => props.knownSpellNameList.includes(spell.frontmatter.title));

const getCostlyComponent = (components: string) => {
  const match = components.match(/\((.+)\)/);
  return match ? match[1] : "";
};

const isCostlySpell = (components: string) => {
  return components.includes('delerium') || components.includes('gold') ;
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
      <a v-for="spell in knownSpellList" :key="spell.frontmatter.title" :href="spell.url" :class="['card', 'spell', spell.frontmatter.duration.includes('Concentration') ? 'concentration' : '']">
        <SpellSchoolIcon class="spell-school-icon" :spell-school="spell.frontmatter.school"/>
        <SpellRangeIcon class="spell-range-icon" :range="spell.frontmatter.range"/>
        <p>{{ spell.frontmatter.title }}</p>
        <p v-if="isCostlySpell(spell.frontmatter.components)">
          {{ getCostlyComponent(spell.frontmatter.components) }}
        </p>
      </a>
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
    }
  }

  .concentration {
    background-color: oklch(76.99% 0.08 226.91 / 0.2);
  }
}
</style>