<script setup lang="ts">
import type { CollectionEntry } from "astro:content";
import { useStorage } from "@vueuse/core";
import BasicEncounter from "./BasicEncounter.vue";
import type { CreatureComponentMap } from "./creautureComponentMap.ts";
import { usePumpkinder } from "../../scripts/monsters/usePumpkinder.ts";
import SpellCasterCheatSheet from "../character/CheatSheet/SpellCasterCheatSheet.vue";
import { ref } from "vue";

const encounterId = "pumpkinder";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList: pumpkind1CreatureList, knownSpellNameList } =
  usePumpkinder("Pumpkind 1");

const creatureEncounterList: CreatureComponentMap[] = [
  {
    creatureList: pumpkind1CreatureList.value,
    component: SpellCasterCheatSheet,
    knownSpellNameList,
  },
];

const creatureInitiativeMap = useStorage(`${encounterId}-initiative-map`, {
  [pumpkind1CreatureList.value[0].name]: undefined,
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
