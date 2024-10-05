<script setup lang="ts">
import type { CollectionEntry } from "astro:content";
import { useLiliaCreatureList } from "./useLiliaCreatureList.ts";
import SpellCasterCheatSheet from "../CheatSheet/SpellCasterCheatSheet.vue";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList, notesStorage, knownSpellNameList, resetToDefault } =
  useLiliaCreatureList();
</script>

<template>
  <SpellCasterCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    :all-spells="allSpells"
    :known-spell-name-list="knownSpellNameList"
    jack-of-all-trades
    @reset-to-default="resetToDefault"
  />
</template>

<style scoped></style>
