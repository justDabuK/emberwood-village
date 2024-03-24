<script setup lang="ts">
import {computed} from "vue";

const contaminationLevel = defineModel<number>({required: true});
const contaminationPercentage = computed(() => {
  return (contaminationLevel.value / 6) * 100;
});

const increase = () => {
  contaminationLevel.value = Math.min(contaminationLevel.value + 1, 6);
}

const reset = () => {
  contaminationLevel.value = 0;
}
</script>

<template>
  <div class="card contamination" :style="`--contamination-percentage: ${contaminationPercentage}%`">
    <span class="contamination-title">Contamination</span>
    <div class="contamination-data">
      <button class="reset-button" @click="reset">0</button>
      <span>{{contaminationLevel}}</span>
      <button class="increase-button" @click="increase">+</button>
    </div>
  </div>
</template>

<style scoped>
.contamination {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px;
  background-image: linear-gradient(125deg, rebeccapurple 20%, teal);
  background-size: var(--contamination-percentage) 100%;
  background-repeat: no-repeat;
  transition: background-size 500ms ease-in-out;


  .contamination-title {
    color: var(--text-color-darker-1);
  }

  .contamination-data {
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
      border-radius: 5px;
      padding: 10px 15px;
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