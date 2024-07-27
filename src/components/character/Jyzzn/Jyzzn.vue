<script setup lang="ts">
import MartialCheatSheet from "../CheatSheet/MartialCheatSheet.vue";
import { useJyzznCreatureList } from "./useJyzznCreatureList.ts";

const { creatureList, notesStorage, resetToDefault } = useJyzznCreatureList();
</script>

<template>
  <MartialCheatSheet
    v-model="creatureList"
    v-model:notes-storage="notesStorage"
    @reset-to-default="resetToDefault"
  />
</template>
