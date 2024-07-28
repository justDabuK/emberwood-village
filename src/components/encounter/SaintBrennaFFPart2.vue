<script setup lang="ts">
import type { Creature } from "../../scripts/cheatSheetTypes.ts";
import { useJyzznCreatureList } from "../character/Jyzzn/useJyzznCreatureList.ts";
import { useRemmiCreatureList } from "../character/Remmi/useRemmiCreatureList.ts";
import type { CollectionEntry } from "astro:content";
import { useNexCreatureList } from "../character/Nex/useNexCreatureList.ts";
import { type Component, computed, ref } from "vue";
import MartialCheatSheet from "../character/CheatSheet/MartialCheatSheet.vue";
import ApothecaryCheatSheet from "../character/CheatSheet/ApothecaryCheatSheet.vue";
import { useCultist } from "../../scripts/monsters/useCultist.ts";
import { useStorage } from "@vueuse/core";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList: nexCreatureList, knownSpellNameList } =
  useNexCreatureList();
const { creatureList: jyzznCreatureList } = useJyzznCreatureList();
const { creatureList: remmiCreatureList } = useRemmiCreatureList();
const { creatureList: henkerCreatureList } = useCultist("Henker");
const { creatureList: nonneCreatureList } = useCultist("Nonne");

type CreatureComponentMap = {
  creatureList: Creature[];
  component: Component;
  knownSpellNameList?: string[];
};

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

const creatureInitiativeMap = useStorage("saintBrennaFFPart2-initiative-map", {
  [jyzznCreatureList.value[0].name]: undefined,
  [remmiCreatureList.value[0].name]: undefined,
  [nexCreatureList.value[0].name]: undefined,
  [henkerCreatureList.value[0].name]: undefined,
  [nonneCreatureList.value[0].name]: undefined,
});

const compareCreatureComponentMap = (
  a: CreatureComponentMap,
  b: CreatureComponentMap,
) => {
  const aInitiative = creatureInitiativeMap.value[a.creatureList[0].name];
  const bInitiative = creatureInitiativeMap.value[b.creatureList[0].name];

  if (aInitiative === undefined || bInitiative === undefined) {
    return 0;
  }

  return bInitiative - aInitiative;
};

const sortedCreatureEncounterList = computed(() =>
  creatureEncounterList.sort(compareCreatureComponentMap),
);

const activeCreatureComponentMap = ref<CreatureComponentMap>();

const isBloodied = (creature: Creature) =>
  creature.hitPoints.current <= creature.hitPoints.max / 2;

const isDead = (creature: Creature) => creature.hitPoints.current <= 0;
</script>

<template>
  <div class="encounter-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Initiative</th>
          <th>HP</th>
          <th>AC</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="creatureComponentMap in sortedCreatureEncounterList"
          :key="creatureComponentMap.creatureList[0].name"
          :class="{
            active:
              activeCreatureComponentMap !== undefined &&
              activeCreatureComponentMap.creatureList[0].name ===
                creatureComponentMap.creatureList[0].name,
            bloodied: isBloodied(creatureComponentMap.creatureList[0]),
            dead: isDead(creatureComponentMap.creatureList[0]),
          }"
          @click="activeCreatureComponentMap = creatureComponentMap"
        >
          <td>{{ creatureComponentMap.creatureList[0].name }}</td>
          <td>
            <input
              type="number"
              v-model="
                creatureInitiativeMap[creatureComponentMap.creatureList[0].name]
              "
              :placeholder="`?+${creatureComponentMap.creatureList[0].initiative}`"
            />
          </td>
          <td>{{ creatureComponentMap.creatureList[0].hitPoints.current }}</td>
          <td>{{ creatureComponentMap.creatureList[0].armorClass }}</td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="activeCreatureComponentMap !== undefined"
      class="creature-preview"
    >
      <component
        :is="activeCreatureComponentMap.component"
        v-model="activeCreatureComponentMap.creatureList"
        :all-spells="allSpells"
        :known-spell-name-list="activeCreatureComponentMap.knownSpellNameList"
      />
    </div>
  </div>
</template>

<style scoped>
.encounter-container {
  display: flex;
  overflow: auto;

  table {
    flex: 1;
    overflow: auto;
    height: max-content;

    tr {
      &:hover {
        background-color: var(--map-link-bg);
      }

      &.active {
        background: var(--map-link-bg-hover);
        color: var(--body-bg);
      }

      &.bloodied {
        background: var(--action-color);
        color: var(--text-color);
      }

      &.dead {
        background: var(--body-bg);
        color: var(--text-color-darker-1);
      }
    }

    td:hover {
      background-color: var(--map-link-bg);
    }
  }

  .creature-preview {
    border-left: 1px solid var(--text-color);
    margin-left: var(--size-16);
    padding-left: var(--size-16);
    flex: 1;
    overflow: auto;
  }

  input {
    font: inherit;
    background-color: var(--body-bg);
    color: var(--text-color);
    border: none;
    border-radius: var(--size-8);
    padding: var(--size-4) var(--size-8);
    text-align: right;
    width: 100%;
    box-shadow:
      inset 0 var(--size-2) var(--size-24) oklch(0 0 0 / 10%),
      0 var(--size-2) 0 oklch(100% 0 0 / 15%);

    &:focus {
      outline: var(--size-1) solid var(--highlight-color);
    }
  }
}
</style>
