<script setup lang="ts">
import SectionCard from "./SectionCard.vue";
import HitPoints from "./HitPoints.vue";
import type { Creature } from "../../scripts/cheatSheetTypes.ts";
import Contamination from "./Contamination.vue";
import TitleValueCard from "./TitleValueCard.vue";
import { addSign } from "../../scripts/addSign.ts";
import SkillCheatSheet from "./SkillCheatSheet.vue";

const creature = defineModel<Creature>({ required: true });
</script>

<template>
  <div class="creature-section">
    <h3>{{ creature.name }}</h3>
    <div class="action-grid">
      <SectionCard
        v-for="section in creature.sectionList"
        :key="section.title"
        v-model="section.used"
        :section="section"
      />
      <HitPoints
        v-model="creature.hitPoints.current"
        v-model:temporary-hit-points="creature.hitPoints.temporary"
        v-model:hit-dice="creature.hitPoints.hitDice"
        :max-hit-points="creature.hitPoints.max"
      />
      <TitleValueCard
        class="armor-class"
        title="AC"
        :value="creature.armorClass"
      />
      <Contamination v-model="creature.contamination" />
      <TitleValueCard
        v-if="creature.initiative !== undefined"
        title="Initiative"
        :value="addSign(creature.initiative)"
        class="initiative"
      />
    </div>
  </div>
  <SkillCheatSheet
    :ability-scores="creature.abilityScores"
    :saving-throw-proficiency-list="creature.savingThrowProficiencyList"
    :skill-proficiency-list="creature.skill.proficiencies"
    :skill-expertise-list="creature.skill.expertise"
    :proficiency-bonus="creature.proficiencyBonus"
  />
</template>

<style scoped>
.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  .armor-class {
    grid-row: 2;
    grid-column: 1;
  }
}
</style>
