<script setup lang="ts">
import type { CollectionEntry } from "astro:content";
import { useStorage } from "@vueuse/core";
import BasicEncounter from "./BasicEncounter.vue";
import type { CreatureComponentMap } from "./creautureComponentMap.ts";
import SpellCasterCheatSheet from "../character/CheatSheet/SpellCasterCheatSheet.vue";
import { ref } from "vue";
import { useSlashingPumpkin } from "../../scripts/monsters/useSlashingPumpkin.ts";

const encounterId = "slashing-pumpkin";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList: slashingPumpkin, knownSpellNameList } =
  useSlashingPumpkin("Slashing Pumpkin", {});

const creatureEncounterList: CreatureComponentMap[] = [
  {
    creatureList: slashingPumpkin.value,
    component: SpellCasterCheatSheet,
    knownSpellNameList,
  },
];

const creatureInitiativeMap = useStorage(`${encounterId}-initiative-map`, {
  [slashingPumpkin.value[0].name]: undefined,
});

const activeCreatureComponentMap = ref<CreatureComponentMap>();
</script>

<template>
  <BasicEncounter
    v-model:creature-initiative-map="creatureInitiativeMap"
    v-model:active-creature-component-map="activeCreatureComponentMap"
    :creatureEncounterList
    :allSpells
  />
</template>

<style scoped></style>
