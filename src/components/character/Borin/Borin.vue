<script setup lang="ts">
import type { CollectionEntry } from "astro:content";
import { useBorinCreatureList } from "./useBorinCreatureList.ts";
import SpellCasterCheatSheet from "../CheatSheet/SpellCasterCheatSheet.vue";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList, notesStorage, preparedSpellNameList, resetToDefault } =
  useBorinCreatureList();
</script>

<template>
  <SpellCasterCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    :all-spells="allSpells"
    :known-spell-name-list="preparedSpellNameList"
    @reset-to-default="resetToDefault"
  />
</template>

<style scoped></style>
