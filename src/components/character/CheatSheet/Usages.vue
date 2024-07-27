<script setup lang="ts">
import type { UsagesPerRest } from "../../../scripts/cheatSheetTypes.ts";

const model = defineModel<UsagesPerRest>({ required: true });
</script>

<template>
  <div class="usages">
    <input
      v-for="(_, index) in model.flags"
      :key="index"
      type="checkbox"
      v-model="model.flags[index]"
    />
    <span v-if="model.description">{{ model.description }}</span>
    <span v-if="model.typeOfRest">{{ `/${model.typeOfRest}` }}</span>
  </div>
</template>

<style scoped></style>
