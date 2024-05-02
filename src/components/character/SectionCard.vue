<script setup lang="ts">
import type { Section } from "../../scripts/cheatSheetTypes.ts";
import Usages from "./Usages.vue";

defineProps<{
  section: Section;
}>();

const model = defineModel<boolean>();

const toggleModel = () => {
  if (model.value === undefined) {
    return;
  }
  model.value = !model.value;
};
</script>

<template>
  <div
    :class="`card section ${model ? 'used' : ''} ${model !== undefined ? 'cursor-pointer' : ''}`"
    @click="toggleModel"
  >
    <div class="section-title">
      <span>{{ section.title }}</span>
      <span v-if="section.dice">{{ section.dice }}</span>
      <input v-model="model" v-if="model !== undefined" type="checkbox" />
    </div>

    <template v-if="section.subsections">
      <div
        v-for="subsection in section.subsections"
        :key="subsection.title"
        class="subsection"
      >
        <div class="subsection-header">
          <span>{{ subsection.title }}</span>
          <span v-if="subsection.dice">{{ subsection.dice }}</span>
          <Usages v-if="subsection.usages" v-model="subsection.usages" />
        </div>

        <div v-if="subsection.description" class="description">
          <span>{{ subsection.description }}</span>
        </div>

        <ul v-if="subsection.items">
          <li v-for="item in subsection.items" :key="item.name">
            <span>{{ item.name }}</span> <span>{{ item.dice }}</span>
          </li>
        </ul>
      </div>
    </template>

    <div v-if="section.description" class="description">
      <span>{{ section.description }}</span>
    </div>

    <template v-if="section.table">
      <table>
        <thead>
          <tr>
            <th v-for="header in section.table.headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in section.table.rows" :key="row[0]">
            <td v-for="cell in row" :key="cell">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style>
.used {
  background-color: var(--body-bg);
  color: var(--text-color-darker-1);
  box-shadow: unset;
}

.cursor-pointer {
  cursor: pointer;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px;

  .section-title {
    display: flex;
    justify-content: space-between;

    span {
      color: var(--text-color-darker-1);
    }

    input {
      cursor: pointer;
    }
  }

  .subsection {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .subsection-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-weight: 600;
      }
    }

    ul {
      padding: 0;
      margin: 0;

      li {
        list-style: none;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
