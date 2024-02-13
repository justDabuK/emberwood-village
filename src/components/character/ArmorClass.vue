<script setup lang="ts">
defineProps<{
  armorClass: number;
}>();
</script>

<template>
  <div class="card armor-class">
    <span class="armor-class-title">AC</span>
    <div class="armor-class-data">
      <span>{{armorClass}}</span>
    </div>
  </div>
</template>

<style scoped>
.armor-class {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px;

  .armor-class-title {
    color: var(--text-color-darker-1);
  }

  .armor-class-data {
    display: grid;
    place-items: center;
    span {
      font-size: 2em;
    }
  }
}
</style>