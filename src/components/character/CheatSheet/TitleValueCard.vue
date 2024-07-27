<script setup lang="ts">
defineProps<{
  title: string;
  value: number | string;
}>();
</script>

<template>
  <div class="card">
    <span class="title">{{ title }}</span>
    <div class="value">
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: var(--size-24);
  padding: var(--size-8);

  .title {
    color: var(--text-color-darker-1);
  }

  .value {
    display: grid;
    place-items: center;
    span {
      font-size: 2em;
    }
  }
}
</style>
