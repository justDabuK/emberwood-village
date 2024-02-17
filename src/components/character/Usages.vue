<script setup lang="ts">
import type {UsagesPerRest} from "../../scripts/cheatSheetTypes.ts";

const model = defineModel<UsagesPerRest>({required: true});
</script>

<template>
  <div class="usages">
    <input v-for="(flag, index) in model.flags" :key="index" type="checkbox" :checked="flag">
    <span v-if="model.description">{{model.description}}</span>
    <span>{{ `/${model.typeOfRest}` }}</span>
  </div>
</template>

<style scoped>

</style>