<script setup lang="ts">
import type {Creature, Section} from "../../scripts/cheatSheetTypes.ts";
import CreatureSection from "./CreatureSection.vue";

const creatureList = defineModel<Creature[]>({required: true});
const resetSection = (section: Section) => {
  if(section.used !== undefined) {
    section.used = false
  }
}

const reset = () => {
  creatureList.value.forEach((creature) => creature.sectionList.forEach(resetSection));
}
</script>

<template>
  <div class="cheat-sheet">
    <div class="cheat-sheet-headline">
      <span>Round cheat sheet</span>
      <button @click="reset">New round</button>
    </div>

    <CreatureSection v-for="(creature, index) in creatureList" :key="creature.name" v-model="creatureList[index]"/>
  </div>
</template>

<style scoped>
.cheat-sheet {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 30px;
  padding-bottom: 20px;

  .cheat-sheet-headline {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      cursor: pointer;
      background-color: var(--button-color);
      color: var(--text-color);
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font: inherit;

      &:hover {
        background-color: var(--button-color-hover);
      }

      &:active {
        background-color: var(--button-color-active);
      }
    }
  }
}
</style>