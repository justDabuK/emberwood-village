<script setup lang="ts">
import NoteSection from "./NoteSection.vue";
import RoundCheatSheet from "./RoundCheatSheet.vue";
import SpellCheatSheet from "./SpellCheatSheet/SpellCheatSheetContainer.vue";
import type { Creature } from "../../../scripts/cheatSheetTypes.ts";
import type { CollectionEntry } from "astro:content";
import type { Spell } from "../../../scripts/spellUtils.ts";
import CreatureSection from "./CreatureSection.vue";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
  knownSpellNameList: Spell[];
  jackOfAllTrades?: boolean;
}>();

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
      :jackOfAllTrades
      @reset-to-default="emit('resetToDefault')"
    />
    <div class="divider" />
    <SpellCheatSheet
      v-if="creatureList[0].magic && creatureList[0].characterLevel"
      v-model:spell-slots="creatureList[0].magic.spellSlots"
      v-model:concentration="creatureList[0].magic.concentration"
      :all-spells="allSpells"
      :type-of-rest="creatureList[0].magic.refresh"
      :known-spell-name-list="knownSpellNameList"
      :spells-save-dice-check="creatureList[0].magic.spellSaveDiceCheck"
      :spell-attack-modifier="creatureList[0].magic.spellAttackModifier"
      :caster-level="creatureList[0].characterLevel"
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
}
</style>
