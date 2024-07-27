<script setup lang="ts">
import MartialCheatSheet from "./CheatSheet/MartialCheatSheet.vue";
import { useRemmiCreatureList } from "./useRemmiCreatureList.ts";

const { creatureList, notesStorage, resetToDefault } = useRemmiCreatureList();
</script>

<template>
  <MartialCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    @reset-to-default="resetToDefault"
  />
</template>
