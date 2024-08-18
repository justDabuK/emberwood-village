<script setup lang="ts">
import type { CollectionEntry } from "astro:content";
import ApothecaryCheatSheet from "../CheatSheet/ApothecaryCheatSheet.vue";
import { useBenedyktCreatureList } from "./useBenedyktCreatureList.ts";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList, notesStorage, knownSpellNameList, resetToDefault } =
  useBenedyktCreatureList();
</script>

<template>
  <ApothecaryCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    :all-spells="allSpells"
    :known-spell-name-list="knownSpellNameList"
    @reset-to-default="resetToDefault"
  />
</template>

<style scoped></style>
