<script setup lang="ts">
import {computed, ref, watch} from "vue";
import Usages from "./Usages.vue";
import type {UsagesPerRest} from "../../scripts/cheatSheetTypes.ts";

const props = defineProps<{
  maxHealthPoints: number;
}>();

const hitPoints = defineModel<number>({required: true});
const temporaryHitPoints = defineModel<number>('temporaryHitPoints');
const hitDice = defineModel<UsagesPerRest>('hitDice');

watch(hitPoints, (newValue) => {
  if(newValue > props.maxHealthPoints) {
    hitPoints.value = props.maxHealthPoints;
  }
  if(newValue < 0) {
    hitPoints.value = 0;
  }
})

const healthPointDelta = ref(0);

const heal = () => {
  hitPoints.value += healthPointDelta.value;
  healthPointDelta.value = 0;
}

const damage = () => {
  if(temporaryHitPoints.value) {
    const remainingTemporaryHitPoints = temporaryHitPoints.value - healthPointDelta.value
    if(remainingTemporaryHitPoints < 0) {
      hitPoints.value += remainingTemporaryHitPoints;
      temporaryHitPoints.value = 0;
    } else {
      temporaryHitPoints.value = remainingTemporaryHitPoints;
    }
  } else {
    hitPoints.value -= healthPointDelta.value;
  }
  healthPointDelta.value = 0;
  console.log(`HP: ${hitPoints.value} | THP: ${temporaryHitPoints.value}`)
}

const healthPercentage = computed(() => {
  return (hitPoints.value / props.maxHealthPoints) * 100;
});
</script>

<template>
  <div class="card health-points" :style="`--health-percentage: ${healthPercentage}%`">
    <span class="health-points-title">HP</span>
    <div class="health-points-data">
      <div class="actual-points">
        <input v-model="hitPoints" type="number" />
        <span>/</span>
        <span>{{ maxHealthPoints }}</span>
      </div>
      <div class="delta">
        <input v-model="healthPointDelta" type="number" />
        <button class="heal-button" @click="heal">+</button>
        <button class="damage-button" @click="damage">-</button>
      </div>
    </div>
    <div v-if="temporaryHitPoints !== undefined" class="actual-points">
      <span>Temporary hit points</span>
      <input v-model="temporaryHitPoints" type="number">
    </div>
    <div v-if="hitDice" class="actual-points">
      <span>Hit dice</span>
      <Usages v-model="hitDice" />
    </div>
  </div>
</template>

<style scoped>
input {
  font:inherit;
  background-color: var(--body-bg);
  color: var(--text-color);
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  text-align: right;
  width: 100%;

  &:focus {
    outline: 1px solid var(--highlight-color);
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.health-points {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px;
  /* TODO: can I animate the change? */
  background-image: linear-gradient(darkgreen, darkgreen);
  background-size: var(--health-percentage) 100%;
  background-repeat: no-repeat;

  transition: background-size 500ms ease-in-out;

  button {
    background-color: var(--body-bg);
    color: var(--text-color);
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
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
    gap: 20px;

    .delta {
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }
}

.actual-points {
  display: flex;
  gap: 5px;
  align-items: center;
}

</style>