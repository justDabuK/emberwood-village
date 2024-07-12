<script setup lang="ts">
import type { Creature, Section } from "../../scripts/cheatSheetTypes.ts";
import CreatureSection from "./CreatureSection.vue";
import { computed } from "vue";
import InspirationToggleButton from "./InspirationToggleButton.vue";

const emit = defineEmits<{
  (evt: "resetToDefault"): void;
}>();

const creatureList = defineModel<Creature[]>({ required: true });
const resetSection = (section: Section) => {
  if (section.used !== undefined) {
    section.used = false;
  }
};

const resetUsed = () => {
  creatureList.value.forEach((creature) =>
    creature.sectionList.forEach(resetSection),
  );
};

const inspiration = computed<boolean | undefined>({
  get: () => creatureList.value[0].inspiration,
  set: (value: boolean | undefined) =>
    (creatureList.value[0].inspiration = value),
});
</script>

<template>
  <div class="cheat-sheet">
    <div class="cheat-sheet-headline">
      <InspirationToggleButton
        v-if="inspiration !== undefined"
        v-model="inspiration"
      />
      <button class="secondary" @click="emit('resetToDefault')">
        Long Rest
      </button>
      <button @click="resetUsed">New round</button>
    </div>

    <CreatureSection
      v-for="(creature, index) in creatureList"
      :key="creature.name"
      v-model="creatureList[index]"
    />
  </div>
</template>

<style scoped>
.cheat-sheet {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: var(--size-24);

  .cheat-sheet-headline {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--size-8);

    button {
      cursor: pointer;
      background-color: var(--button-color);
      color: var(--text-color);
      border: none;
      border-radius: var(--size-4);
      padding: var(--size-8) var(--size-24);
      font: inherit;
      box-shadow:
        inset 0 var(--size-1) 0 oklch(70% 0.08 226.91),
        0 var(--size-1) var(--size-4) oklch(0 0 0 / 20%);

      &:hover {
        background-color: var(--button-color-hover);
      }

      &:active {
        background-color: var(--button-color-active);
        box-shadow:
          inset 0 var(--size-2) var(--size-24) oklch(0 0 0 / 10%),
          0 var(--size-2) 0 oklch(100% 0 0 / 15%);
      }

      &.secondary {
        background-color: transparent;
        border: var(--size-1) solid var(--text-color);

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
