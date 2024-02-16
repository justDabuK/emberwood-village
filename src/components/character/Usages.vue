<script setup lang="ts">
import type {UsagesPerRest} from "../../scripts/cheatSheetTypes.ts";

defineProps<{
  usages: UsagesPerRest;
}>();
</script>

<template>
  <div class="usages">
    <input v-for="(flag, index) in usages.flags" :key="index" type="checkbox" :checked="flag">
    <span>{{ `/${usages.typeOfRest}` }}</span>
  </div>
</template>

<style scoped>

</style>