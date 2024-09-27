<script setup lang="ts">
import type { CollectionEntry } from "astro:content";
import { useStorage } from "@vueuse/core";
import BasicEncounter from "./BasicEncounter.vue";
import type { CreatureComponentMap } from "./creautureComponentMap.ts";
import SpellCasterCheatSheet from "../character/CheatSheet/SpellCasterCheatSheet.vue";
import { ref } from "vue";
import { usePumpkinFiend } from "../../scripts/monsters/usePumpkinFiend.ts";

const encounterId = "pumpkin-fiends";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList: twistedPumpkin, knownSpellNameList } =
  usePumpkinFiend("Pumpkin Fiend 1");

const creatureEncounterList: CreatureComponentMap[] = [
  {
    creatureList: twistedPumpkin.value,
    component: SpellCasterCheatSheet,
    knownSpellNameList,
  },
];

const creatureInitiativeMap = useStorage(`${encounterId}-initiative-map`, {
  [twistedPumpkin.value[0].name]: undefined,
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
