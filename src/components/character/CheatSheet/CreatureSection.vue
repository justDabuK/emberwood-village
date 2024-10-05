<script setup lang="ts">
import SectionCard from "./SectionCard.vue";
import HitPoints from "./HitPoints.vue";
import type { Creature } from "../../../scripts/cheatSheetTypes.ts";
import Contamination from "./Contamination.vue";
import TitleValueCard from "./TitleValueCard.vue";
import { addSign } from "../../../scripts/addSign.ts";
import SkillCheatSheet from "./SkillCheatSheet.vue";
import { ref, watch } from "vue";
import MenuRightIcon from "./SpellCheatSheet/MenuRightIcon.vue";

const creature = defineModel<Creature>({ required: true });

defineProps<{
  jackOfAllTrades?: boolean;
}>();

enum Tabs {
  ACTIONS,
  SKILL,
}

const currentTab = ref<Tabs>(Tabs.ACTIONS);

const setTab = (tab: Tabs) => {
  currentTab.value = tab;
};

const isDetailsOpen = ref<boolean>(false);
const detailsRef = ref<HTMLDetailsElement>();
watch(
  detailsRef,
  (value) => {
    if (value) {
      isDetailsOpen.value = value.open;
    }
  },
  { immediate: true },
);
</script>

<template>
  <details
    class="creature-section"
    ref="detailsRef"
    open
    @toggle="isDetailsOpen = !isDetailsOpen"
  >
    <summary class="header">
      <MenuRightIcon :class="['icon', isDetailsOpen ? 'open' : '']" />
      <h3>
        {{ creature.name }}
      </h3>
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
    </summary>

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
      :jackOfAllTrades
    />
  </details>
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
    cursor: pointer;

    .icon {
      width: var(--size-24);
      height: var(--size-24);
      margin: auto 0;
      transition: all 300ms ease-in-out;

      &.open {
        transform: rotate(90deg);
      }
    }
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
      border-radius: var(--size-4) var(--size-4) 0 0;

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
    border-radius: var(--size-4);
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--size-256), 1fr));
    gap: var(--size-24);

    .armor-class {
      grid-row: 2;
      grid-column: 1;
    }
  }
}
</style>
