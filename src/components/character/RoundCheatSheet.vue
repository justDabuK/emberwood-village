<script setup lang="ts">
import type {Creature, Section} from "../../scripts/cheatSheetTypes.ts";
import CreatureSection from "./CreatureSection.vue";

const emit = defineEmits<{
  (evt: 'resetToDefault'): void;
}>();

const creatureList = defineModel<Creature[]>({required: true});
const resetSection = (section: Section) => {
  if(section.used !== undefined) {
    section.used = false
  }
}

const resetUsed = () => {
  creatureList.value.forEach((creature) => creature.sectionList.forEach(resetSection));
}
</script>

<template>
  <div class="cheat-sheet">
    <div class="cheat-sheet-headline">
      <button class="secondary" @click="emit('resetToDefault')">Long Rest</button>
      <button @click="resetUsed">New round</button>
    </div>

    <CreatureSection v-for="(creature, index) in creatureList" :key="creature.name" v-model="creatureList[index]"/>
  </div>
</template>

<style scoped>
.cheat-sheet {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 30px;

  .cheat-sheet-headline {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;

    button {
      cursor: pointer;
      background-color: var(--button-color);
      color: var(--text-color);
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font: inherit;
      box-shadow:
          inset 0 1px 0 oklch(70% 0.08 226.91),
          0 1px 3px oklch(0 0 0 / 20%);

      &:hover {
        background-color: var(--button-color-hover);
      }

      &:active {
        background-color: var(--button-color-active);
        box-shadow:
            inset 0 2px 20px oklch(0 0 0 / 10%),
            0 2px 0 oklch(100% 0 0 / 15%);
      }

      &.secondary {
        background-color: transparent;
        border: 1px solid var(--text-color);

        &:hover {
          background-color: oklch(60% 0.08 226.91 / 25%);
        }

        &:active {
          background-color: oklch(60% 0.08 226.91 / 50%);
        }
      }
    }
  }
}
</style>