<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  maxHealthPoints: number;
}>();

const model = defineModel<number>({required: true});

const healthPointDelta = ref(0);

const heal = () => {
  model.value += healthPointDelta.value;
  model.value = 0;
}

const damage = () => {
  model.value -= healthPointDelta.value;
  model.value = 0;
}
</script>

<template>
  <div class="card health-points">
    <span class="health-points-title">HP</span>
    <div class="health-points-data">
      <div class="actual-points">
        <input v-model="model" type="number" />
        <span>/</span>
        <span>{{ maxHealthPoints }}</span>
      </div>
      <div class="delta">
        <input v-model="healthPointDelta" type="number" />
        <button @click="heal">+</button>
        <button @click="damage">-</button>
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

  button {
    background-color: var(--body-bg);
    color: var(--text-color);
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
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