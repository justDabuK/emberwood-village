<script setup lang="ts">
const notes = defineModel<string>({ required: true });
</script>

<template>
  <h2>Notes</h2>

  <div class="card note-section">
    <textarea v-model="notes" placeholder="Write your notes here" />
  </div>
</template>

<style scoped>
.note-section {
  padding: 10px;
  display: flex;
  background-color: var(--nav-bg);
  min-height: var(--size-512);

  textarea {
    flex: 1;
  }
}
</style>
