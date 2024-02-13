<script setup lang="ts">
import SectionCard from "./SectionCard.vue";
import ArmorClass from "./ArmorClass.vue";
import HealthPoints from "./HealthPoints.vue";
import type {Creature} from "../scripts/cheatSheetTypes.ts";

const creature = defineModel<Creature>({required: true});
</script>

<template>
  <div class="creature-section">
    <h3>{{creature.name}}</h3>
    <div class="action-grid">
      <SectionCard v-for="section in creature.sectionList" :key="section.title" v-model="section.used" :section="section"/>
      <HealthPoints v-model="creature.healthPoints.current" :max-health-points="creature.healthPoints.max"/>
      <ArmorClass :armor-class="creature.armorClass"/>
    </div>
  </div>
</template>

<style scoped>
.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>