<script setup lang="ts">
import NoteSection from "./NoteSection.vue";
import RoundCheatSheet from "./RoundCheatSheet.vue";
import type { Creature } from "../../../scripts/cheatSheetTypes.ts";

const creatureList = defineModel<Creature[]>({ required: true });
const notesStorage = defineModel<string>("notesStorage");

const emit = defineEmits<{
  (evt: "resetToDefault"): void;
}>();
</script>

<template>
  <div class="cheat-sheet-list">
    <RoundCheatSheet
      v-model="creatureList"
      @reset-to-default="emit('resetToDefault')"
      class="round-cheat-sheet"
    />
    <div class="divider" />
    <NoteSection v-if="notesStorage !== undefined" v-model="notesStorage" />
  </div>
</template>

<style scoped>
.cheat-sheet-list {
  display: flex;
  flex-direction: column;
  gap: var(--size-24);

  .divider {
    border-bottom: var(--size-1) solid var(--text-color-darker-1);
  }
}
</style>
