<script setup lang="ts">
import SectionCard from "./SectionCard.vue";
import ArmorClass from "./ArmorClass.vue";
import HitPoints from "./HitPoints.vue";
import type {Creature} from "../../scripts/cheatSheetTypes.ts";

const creature = defineModel<Creature>({required: true});
</script>

<template>
  <div class="creature-section">
    <h3>{{creature.name}}</h3>
    <div class="action-grid">
      <SectionCard v-for="section in creature.sectionList" :key="section.title" v-model="section.used" :section="section"/>
      <HitPoints v-model="creature.hitPoints.current" v-model:temporary-hit-points="creature.hitPoints.temporary" v-model:hit-dice="creature.hitPoints.hitDice" :max-hit-points="creature.hitPoints.max"/>
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