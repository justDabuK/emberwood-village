<script setup lang="ts">
import {computed, ref, watch} from "vue";

const props = defineProps<{
  maxHealthPoints: number;
}>();

const model = defineModel<number>({required: true});

watch(model, (newValue) => {
  if(newValue > props.maxHealthPoints) {
    model.value = props.maxHealthPoints;
  }
  if(newValue < 0) {
    model.value = 0;
  }
})

const healthPointDelta = ref(0);

const heal = () => {
  model.value += healthPointDelta.value;
  healthPointDelta.value = 0;
}

const damage = () => {
  model.value -= healthPointDelta.value;
  healthPointDelta.value = 0;
}

const healthPercentage = computed(() => {
  return (model.value / props.maxHealthPoints) * 100;
});
</script>

<template>
  <div class="card health-points" :style="`--health-percentage: ${healthPercentage}%`">
    <span class="health-points-title">HP</span>
    <div class="health-points-data">
      <div class="actual-points">
        <input v-model="model" type="number" />
        <span>/</span>
        <span>{{ maxHealthPoints }}</span>
      </div>
      <div class="delta">
        <input v-model="healthPointDelta" type="number" />
        <button class="heal-button" @click="heal">+</button>
        <button class="damage-button" @click="damage">-</button>
      </div>
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
  background: linear-gradient(90deg, darkgreen var(--health-percentage), var(--card-bg) 0%);

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
    color: var(--text-color-darker-1);
  }

  .health-points-data {
    display: flex;
    gap: 20px;

    .actual-points {
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .delta {
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }
}

</style>