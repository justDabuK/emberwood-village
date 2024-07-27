<script setup lang="ts">
import { getProficiencyBonus } from "../../../scripts/getProficiencyBonus.ts";
import type { Creature } from "../../../scripts/cheatSheetTypes.ts";
import type { CollectionEntry } from "astro:content";
import RoundCheatSheet from "./RoundCheatSheet.vue";
import ApothecarySpellCheatSheetContainer from "./SpellCheatSheet/ApothecarySpellCheatSheetContainer.vue";
import NoteSection from "./NoteSection.vue";
import type { Spell } from "../../../scripts/spellUtils.ts";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
  knownSpellNameList: Spell[];
  spellsSaveDiceCheck: number;
  spellAttackModifier: number;
  casterLevel:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20;
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
      @reset-to-default="emit('resetToDefault')"
    />
    <div class="divider" />
    <ApothecarySpellCheatSheetContainer
      v-if="creatureList[0].magic"
      v-model:spell-slots="creatureList[0].magic.spellSlots"
      v-model:concentration="creatureList[0].magic.concentration"
      :all-spells="allSpells"
      :type-of-rest="creatureList[0].magic.refresh"
      :known-spell-name-list="knownSpellNameList"
      :spells-save-dice-check="spellsSaveDiceCheck"
      :spell-attack-modifier="spellAttackModifier"
      :caster-level="casterLevel"
    />
    <div class="divider" />
    <NoteSection v-model="notesStorage" />
  </div>
</template>

<style scoped>
.cheat-sheet-list {
  display: flex;
  flex-direction: column;
  gap: var(--size-24);
}
</style>
