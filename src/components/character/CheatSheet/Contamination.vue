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
  switch (contaminationLevel.value) {
    case 1:
      return "No symptoms. Yet.";
    case 2:
      return "Hit points regained by expending hit dice halved.";
    case 3:
      return "No hit points regained at the end of a long rest.";
    case 4:
      return "Damage dealt by weapon attacks and spells halved.";
    case 5:
      return "Incapacitated.";
    case 6:
      return "Monstrous Transformation!";
    case 0:
    default:
      return "";
  }
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
    <span>{{ currentSymptom }}</span>
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
}
</style>
