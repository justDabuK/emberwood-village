<script setup lang="ts">
import type { CollectionEntry } from "astro:content";
import { useAshlinCreatureList } from "./useAshlinCreatureList.ts";
import SpellCasterCheatSheet from "../CheatSheet/SpellCasterCheatSheet.vue";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList, notesStorage, preparedSpellNameList, resetToDefault } =
  useAshlinCreatureList();
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
