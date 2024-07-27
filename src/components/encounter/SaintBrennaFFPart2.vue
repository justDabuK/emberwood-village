<script setup lang="ts">
import type { Creature } from "../../scripts/cheatSheetTypes.ts";
import { useJyzznCreatureList } from "../character/useJyzznCreatureList.ts";
import { useRemmiCreatureList } from "../character/useRemmiCreatureList.ts";
import type { CollectionEntry } from "astro:content";
import { useNexCreatureList } from "../character/useNexCreatureList.ts";
import { type Component, ref } from "vue";
import MartialCheatSheet from "../character/CheatSheet/MartialCheatSheet.vue";
import ApothecaryCheatSheet from "../character/CheatSheet/ApothecaryCheatSheet.vue";

defineProps<{
  allSpells: CollectionEntry<"spells">[];
}>();

const { creatureList: nexCreatureList, knownSpellNameList } =
  useNexCreatureList();
const { creatureList: jyzznCreatureList } = useJyzznCreatureList();
const { creatureList: remmiCreatureList } = useRemmiCreatureList();

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
];

const activeCreatureComponentMap = ref<CreatureComponentMap>();
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
          v-for="creatureComponentMap in creatureEncounterList"
          :key="creatureComponentMap.creatureList[0].name"
          :class="
            activeCreatureComponentMap !== undefined &&
            activeCreatureComponentMap.creatureList[0].name ===
              creatureComponentMap.creatureList[0].name
              ? 'active'
              : ''
          "
          @click="activeCreatureComponentMap = creatureComponentMap"
        >
          <td>{{ creatureComponentMap.creatureList[0].name }}</td>
          <td>{{ 0 }}</td>
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
}
</style>
