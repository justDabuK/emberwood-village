<script setup lang="ts">

import {ref} from "vue";
import type {Section} from "../scripts/cheatSheetTypes.ts";
import SectionCard from "./SectionCard.vue";

const nexActionUsed = ref(false);
const nexBonusActionUsed = ref(false);
const nexReactionUsed = ref(false);
const nexMovementUsed = ref(false);

const nexAction: Section = {
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

const nexBonusAction: Section = {
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
      title: 'Command Bernhard',
      description: 'Bernhard needs a command, otherwise he will take the Dodge action'
    },
    {
      title: 'Spell casting',
      description: 'See spell casting cheat sheet'
    }
  ]
}

const nexReaction: Section = {
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

const nexMovement: Section = {
  title: 'Movement',
  subsections: [
    {
      title: 'Walking 30ft.',
      description: '(6 Felder)'
    },
  ]
}

const bernhardActionUsed = ref(false);
const bernhardReactionUsed = ref(false);
const bernhardMovementUsed = ref(false);

const bernhardAction: Section = {
  title: 'Action',
  subsections: [
    {
      title: 'Weapon Attack',
      dice: 'D20+6',
      items: [
        {name: 'Slam', dice: '1d8+4'},
      ]
    },
  ]
}

const bernhardReaction: Section = {
  title: 'Reaction',
  subsections: [
    {
      title: 'Opertunity Attack',
      description: 'See Weapon Attack'
    },
  ]
}

const bernhardMovement: Section = {
  title: 'Movement',
  subsections: [
    {
      title: 'Walking 30ft.',
      description: '(6 Felder)'
    },
  ]
}

const hedrickActionUsed = ref(false);
const hedrickReactionUsed = ref(false);
const hedrickMovementUsed = ref(false);

const hedrickAction: Section = {
  title: 'Action',
  subsections: [
    {
      title: 'Help',
      description: 'Give advantage to next attacker'
    },
    {
      title: 'Weapon Attack',
      dice: 'D20+3',
      items: [
        {name: 'Talons', dice: '1'},
      ]
    },
  ]
}

const hedrickReaction: Section = {
  title: 'Reaction',
  subsections: [
    {
      title: 'Opertunity Attack',
      description: 'See Weapon Attack'
    },
  ]
}

const hedrickMovement: Section = {
  title: 'Movement',
  subsections: [
    {
      title: 'Walking 5ft.',
      description: '(1 Feld)'
    },
    {
      title: 'Flying 60ft.',
      description: '(12 Felder)'
    },
  ]
}

const reset = () => {
  nexActionUsed.value = false;
  nexBonusActionUsed.value = false;
  nexReactionUsed.value = false;
  nexMovementUsed.value = false;
  bernhardActionUsed.value = false;
  bernhardReactionUsed.value = false;
  bernhardMovementUsed.value = false;
  hedrickActionUsed.value = false;
  hedrickReactionUsed.value = false;
  hedrickMovementUsed.value = false;
}

</script>

<template>
  <div class="cheat-sheet">
    <div class="cheat-sheet-headline">
      <span>Round cheat sheet</span>
      <button @click="reset">New round</button>
    </div>
    <div class="creature-section">
      <h3>Nex</h3>
      <div class="action-grid">
        <SectionCard v-model="nexActionUsed" :section="nexAction" />
        <SectionCard v-model="nexBonusActionUsed" :section="nexBonusAction" />
        <SectionCard v-model="nexReactionUsed" :section="nexReaction" />
        <SectionCard v-model="nexMovementUsed" :section="nexMovement" />
      </div>
      <h3>Bernhard</h3>
      <div class="action-grid">
        <SectionCard v-model="bernhardActionUsed" :section="bernhardAction" />
        <SectionCard v-model="bernhardReactionUsed" :section="bernhardReaction" />
        <SectionCard v-model="bernhardMovementUsed" :section="bernhardMovement" />
      </div>
      <h3>Hedrick</h3>
      <div class="action-grid">
        <SectionCard v-model="hedrickActionUsed" :section="hedrickAction" />
        <SectionCard v-model="hedrickReactionUsed" :section="hedrickReaction" />
        <SectionCard v-model="hedrickMovementUsed" :section="hedrickMovement" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cheat-sheet {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--text-color-darker-1);

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
