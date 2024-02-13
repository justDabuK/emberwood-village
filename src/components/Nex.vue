<script setup lang="ts">

import {ref} from "vue";
import type {Section} from "../scripts/cheatSheetTypes.ts";
import SectionCard from "./SectionCard.vue";

const actionUsed = ref(false);
const bonusActionUsed = ref(false);
const reactionUsed = ref(false);
const movementUsed = ref(false);

const reset = () => {
  actionUsed.value = false;
  bonusActionUsed.value = false;
  reactionUsed.value = false;
  movementUsed.value = false;
}

const action: Section = {
  title: 'Action',
  subsections: [
    {
      title: 'Weapon Attack',
      dice: 'D20+3',
      items: [
        {name: 'Crossbow light', dice: '1d8+1'},
        {name: 'Crossbow Hand', dice: '1d6+1'},
        {name: 'Dagger', dice: '1d4+1'}
      ]
    },
    {
      title: 'Spell casting',
      description: 'See spell casting cheat sheet'
    }
  ]
}

const bonusAction: Section = {
  title: 'Bonus Action',
  subsections: [
    {
      title: 'Off-hand attack',
      dice: 'D20+3',
      items: [
        {name: 'Dagger', dice: '1d4'}
      ]
    },
    {
      title: 'Spell casting',
      description: 'See spell casting cheat sheet'
    }
  ]
}

const reaction: Section = {
  title: 'Reaction',
  subsections: [
    {
      title: 'Opertunity Attack',
      description: 'See Weapon Attack'
    },
    {
      title: 'Spell casting',
      description: 'See spell casting cheat sheet'
    }
  ]
}

const movement: Section = {
  title: 'Movement',
  subsections: [
    {
      title: 'Walking 30ft.',
      description: '(6 Felder)'
    },
  ]
}
</script>

<template>
  <div class="cheat-sheet">
    <div class="cheat-sheet-headline">
      <span>Round cheat sheet</span>
      <button @click="reset">New round</button>
    </div>
    <div class="action-grid">
      <SectionCard v-model="actionUsed" :section="action" />
      <SectionCard v-model="bonusActionUsed" :section="bonusAction" />
      <SectionCard v-model="reactionUsed" :section="reaction" />
      <SectionCard v-model="movementUsed" :section="movement" />
    </div>
  </div>
</template>

<style scoped>
.cheat-sheet {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;

  .cheat-sheet-headline {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      cursor: pointer;
      background-color: var(--button-color);
      color: var(--text-color);
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font: inherit;

      &:hover {
        background-color: var(--button-color-hover);
      }

      &:active {
        background-color: var(--button-color-active);
      }
    }
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
}
</style>
