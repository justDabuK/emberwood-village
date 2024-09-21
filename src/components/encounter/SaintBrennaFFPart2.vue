<script setup lang="ts">
import { useJyzznCreatureList } from "../character/Jyzzn/useJyzznCreatureList.ts";
import { useRemmiCreatureList } from "../character/Remmi/useRemmiCreatureList.ts";
import type { CollectionEntry } from "astro:content";
import { useNexCreatureList } from "../character/Nex/useNexCreatureList.ts";
import { ref } from "vue";
import MartialCheatSheet from "../character/CheatSheet/MartialCheatSheet.vue";
import ApothecaryCheatSheet from "../character/CheatSheet/ApothecaryCheatSheet.vue";
import { useCultist } from "../../scripts/monsters/useCultist.ts";
import { useStorage } from "@vueuse/core";
import BasicEncounter from "./BasicEncounter.vue";
import type { CreatureComponentMap } from "./creautureComponentMap.ts";

const encounterId = "saintBrennaFFPart2";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList: nexCreatureList, knownSpellNameList } =
  useNexCreatureList();
const { creatureList: jyzznCreatureList } = useJyzznCreatureList();
const { creatureList: remmiCreatureList } = useRemmiCreatureList();
const { creatureList: henkerCreatureList } = useCultist("Henker");
const { creatureList: nonneCreatureList } = useCultist("Nonne");

const creatureEncounterList: CreatureComponentMap[] = [
  { creatureList: jyzznCreatureList.value, component: MartialCheatSheet },
  { creatureList: remmiCreatureList.value, component: MartialCheatSheet },
  {
    creatureList: nexCreatureList.value,
    component: ApothecaryCheatSheet,
    knownSpellNameList,
  },
  { creatureList: henkerCreatureList.value, component: MartialCheatSheet },
  { creatureList: nonneCreatureList.value, component: MartialCheatSheet },
];

const creatureInitiativeMap = useStorage(`${encounterId}-initiative-map`, {
  [jyzznCreatureList.value[0].name]: undefined,
  [remmiCreatureList.value[0].name]: undefined,
  [nexCreatureList.value[0].name]: undefined,
  [henkerCreatureList.value[0].name]: undefined,
  [nonneCreatureList.value[0].name]: undefined,
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
