<script setup lang="ts">

import {type SpellSlots, TypeOfRest} from "../../scripts/cheatSheetTypes.ts";
import type {MarkdownInstance} from "astro";
import type {Spell} from "../../scripts/spellUtils.ts";

defineProps<{
  allSpells: MarkdownInstance<Record<string, any>>[];
  typeOfRest: TypeOfRest;
  knownSpellNameList: Spell[];
}>();

const spellSlots = defineModel<SpellSlots>("spellSlots");
const concentration = defineModel<boolean>("concentration");

</script>

<template>
  <div class="spell-cheat-sheet-container">
    <div class="card">
      <h2>{{ `Spell Slots per ${typeOfRest}`}}</h2>
      <ul>
        <li v-for="(slot, level) in spellSlots" :key="level">
          {{ `${level}: ` }}
          <input v-if="slot" v-for="(_, index) in slot.flags" :key="index" type="checkbox" v-model="slot.flags[index]">
        </li>
      </ul>
    </div>
    <div class="card">
      <h2>Concentration</h2>
      <input type="checkbox" v-model="concentration">
    </div>
    <template v-for="spell in allSpells" :key="spell.frontmatter.title">
      <div v-if="knownSpellNameList.includes(spell.frontmatter.title)" class="card">
        <h2>{{ spell.frontmatter.title }}</h2>
        <p>{{ spell.frontmatter.level }}</p>
        <p>{{ spell.frontmatter.school }}</p>
        <p>{{ spell.frontmatter.castingTime }}</p>
        <p>{{ spell.frontmatter.range }}</p>
        <p>{{ spell.frontmatter.components }}</p>
        <p>{{ spell.frontmatter.duration }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.spell-cheat-sheet-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>