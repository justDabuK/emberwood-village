<script setup lang="ts">
import SectionCard from "./SectionCard.vue";
import HitPoints from "./HitPoints.vue";
import type { Creature } from "../../scripts/cheatSheetTypes.ts";
import Contamination from "./Contamination.vue";
import TitleValueCard from "./TitleValueCard.vue";
import { addSign } from "../../scripts/addSign.ts";
import SkillCheatSheet from "./SkillCheatSheet.vue";
import { ref } from "vue";

const creature = defineModel<Creature>({ required: true });

enum Tabs {
  ACTIONS,
  SKILL,
}

const currentTab = ref<Tabs>(Tabs.ACTIONS);

const setTab = (tab: Tabs) => {
  currentTab.value = tab;
};
</script>

<template>
  <div class="creature-section">
    <div class="header">
      <h3>{{ creature.name }}</h3>
      <div>
        <button
          :class="currentTab === Tabs.ACTIONS ? 'active' : ''"
          @click="setTab(Tabs.ACTIONS)"
        >
          Actions & Co.
        </button>
        <button
          :class="currentTab === Tabs.SKILL ? 'active' : ''"
          @click="setTab(Tabs.SKILL)"
        >
          Skills
        </button>
      </div>
    </div>

    <div
      v-if="currentTab === Tabs.ACTIONS"
      class="action-grid colored-background"
    >
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
    <SkillCheatSheet
      v-else
      class="colored-background"
      :ability-scores="creature.abilityScores"
      :saving-throw-proficiency-list="creature.savingThrowProficiencyList"
      :skill-proficiency-list="creature.skill.proficiencies"
      :skill-expertise-list="creature.skill.expertise"
      :proficiency-bonus="creature.proficiencyBonus"
    />
  </div>
</template>

<style scoped>
.creature-section {
  display: flex;
  flex-direction: column;
  --active-tab-background-color: var(--nav-bg);

  .header {
    display: flex;
    align-items: baseline;
    gap: var(--size-16);

    h3 {
      margin: 0;
    }

    /* TODO: align style to navigation bar? */
    button {
      cursor: pointer;
      background-color: transparent;
      color: var(--text-color);
      border: none;
      padding: var(--size-8) var(--size-16);
      font: inherit;
      border-radius: 5px 5px 0 0;

      &:hover {
        color: var(--highlight-color);
        background-color: oklch(60% 0.08 226.91 / 10%);
        transition: none;
      }

      &.active {
        background-color: var(--active-tab-background-color);
      }
    }
  }

  .colored-background {
    background-color: var(--active-tab-background-color);
    padding: var(--size-16);
    border-radius: 5px;
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .armor-class {
      grid-row: 2;
      grid-column: 1;
    }
  }
}
</style>
