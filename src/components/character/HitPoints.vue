<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Usages from "./Usages.vue";
import type { UsagesPerRest } from "../../scripts/cheatSheetTypes.ts";

const props = defineProps<{
  maxHitPoints: number;
}>();

const hitPoints = defineModel<number>({ required: true });
const temporaryHitPoints = defineModel<number>("temporaryHitPoints");
const hitDice = defineModel<UsagesPerRest>("hitDice");

watch(hitPoints, (newValue) => {
  if (newValue > props.maxHitPoints) {
    hitPoints.value = props.maxHitPoints;
  }
  if (newValue < 0) {
    hitPoints.value = 0;
  }
});

const hitPointDelta = ref(1);

const heal = () => {
  hitPoints.value += hitPointDelta.value;
  hitPointDelta.value = 1;
};

const damage = () => {
  if (temporaryHitPoints.value) {
    const remainingTemporaryHitPoints =
      temporaryHitPoints.value - hitPointDelta.value;
    if (remainingTemporaryHitPoints < 0) {
      hitPoints.value += remainingTemporaryHitPoints;
      temporaryHitPoints.value = 0;
    } else {
      temporaryHitPoints.value = remainingTemporaryHitPoints;
    }
  } else {
    hitPoints.value -= hitPointDelta.value;
  }
  hitPointDelta.value = 1;
};

const healthPercentage = computed(() => {
  return (hitPoints.value / props.maxHitPoints) * 100;
});

const temporaryHitPointPercentage = computed(() => {
  return temporaryHitPoints.value
    ? (temporaryHitPoints.value / props.maxHitPoints) * 100
    : 0;
});
</script>

<template>
  <div
    class="card health-points"
    :style="`--health-percentage: ${healthPercentage}%; --thp-percentage: ${temporaryHitPointPercentage}%`"
  >
    <span class="health-points-title">HP</span>
    <div class="health-points-data">
      <div class="actual-points">
        <input v-model="hitPoints" type="number" />
        <span>/</span>
        <span>{{ maxHitPoints }}</span>
      </div>
      <div class="delta">
        <input v-model="hitPointDelta" type="number" />
        <button class="heal-button" @click="heal">+</button>
        <button class="damage-button" @click="damage">-</button>
      </div>
    </div>
    <div v-if="temporaryHitPoints !== undefined" class="actual-points">
      <span>Temporary hit points</span>
      <input v-model="temporaryHitPoints" type="number" />
    </div>
    <div v-if="hitDice" class="actual-points">
      <span>Hit dice</span>
      <Usages v-model="hitDice" />
    </div>
  </div>
</template>

<style scoped>
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.health-points {
  grid-row: 1;
  grid-column: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--size-24);
  padding: var(--size-8);
  /* TODO: can I animate the temporary hit points as well? */
  background-image: linear-gradient(
    90deg,
    darkgoldenrod var(--thp-percentage),
    darkgreen 0
  );
  background-size: var(--health-percentage) 100%;
  background-repeat: no-repeat;
  box-shadow:
    inset 0 var(--size-1) 0 oklch(100% 0 0 / 15%),
    0 var(--size-1) var(--size-4) oklch(0 0 0 / 10%);

  transition: background-size 500ms ease-in-out;

  button {
    background-color: var(--body-bg);
    color: var(--text-color);
    border: none;
    border-radius: var(--size-4);
    padding: var(--size-8) var(--size-16);
    cursor: pointer;
  }

  .heal-button {
    background-color: green;
  }

  .damage-button {
    background-color: darkred;
  }

  .health-points-title {
    color: oklch(93.52% 0.032 304.82 / 0.5);
  }

  .health-points-data {
    display: flex;
    gap: var(--size-24);

    .delta {
      display: flex;
      gap: var(--size-4);
      align-items: center;
    }
  }
}

.actual-points {
  display: flex;
  gap: var(--size-4);
  align-items: center;
  justify-content: space-between;
}
</style>
