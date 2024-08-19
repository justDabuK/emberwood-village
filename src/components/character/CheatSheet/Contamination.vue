<script setup lang="ts">
import { computed } from "vue";

const contaminationLevel = defineModel<number>({ required: true });
const contaminationPercentage = computed(() => {
  return (contaminationLevel.value / 6) * 100;
});

const increase = () => {
  contaminationLevel.value = Math.min(contaminationLevel.value + 1, 6);
};

const reset = () => {
  contaminationLevel.value = 0;
};

const currentSymptom = computed(() => {
  const symptoms = [];

  if (contaminationLevel.value == 1) {
    symptoms.push("No symptoms. Yet.");
  }
  if (contaminationLevel.value >= 2) {
    symptoms.push("Hit points regained by expending hit dice halved.");
  }
  if (contaminationLevel.value >= 3) {
    symptoms.push("No hit points regained at the end of a long rest.");
  }
  if (contaminationLevel.value >= 4) {
    symptoms.push("Damage dealt by weapon attacks and spells halved.");
  }
  if (contaminationLevel.value >= 5) {
    symptoms.push("Incapacitated.");
  }
  if (contaminationLevel.value >= 6) {
    symptoms.push("Monstrous Transformation.");
  }
  return symptoms;
});
</script>

<template>
  <div
    class="card contamination"
    :style="`--contamination-percentage: ${contaminationPercentage}%`"
  >
    <span class="contamination-title">Contamination</span>
    <div class="contamination-data">
      <button class="reset-button" @click="reset">0</button>
      <span>{{ contaminationLevel }}</span>
      <button class="increase-button" @click="increase">+</button>
    </div>
    <ul>
      <li v-for="symptom in currentSymptom" :key="symptom">{{ symptom }}</li>
    </ul>
  </div>
</template>

<style scoped>
.contamination {
  grid-column: 1;
  grid-row: 3;
  display: flex;
  flex-direction: column;
  gap: var(--size-24);
  padding: var(--size-8);
  background-image: linear-gradient(125deg, rebeccapurple 20%, teal);
  background-size: var(--contamination-percentage) 100%;
  background-repeat: no-repeat;
  transition: background-size 500ms ease-in-out;

  .contamination-title {
    color: var(--text-color-darker-1);
  }

  .contamination-data {
    flex-grow: 1;
    display: grid;
    grid-template-columns: auto 1fr auto;
    place-items: center;

    span {
      font-size: 2em;
    }

    button {
      background-color: var(--body-bg);
      color: var(--text-color);
      border: none;
      border-radius: var(--size-4);
      padding: var(--size-8) var(--size-16);
      cursor: pointer;
    }

    .reset-button {
      background-color: green;
    }

    .increase-button {
      background-color: rebeccapurple;
    }
  }

  ul {
    padding: 0 var(--size-16);
  }
}
</style>
