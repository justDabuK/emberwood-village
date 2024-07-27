<script setup lang="ts">
import type { Section } from "../../../scripts/cheatSheetTypes.ts";
import Usages from "./Usages.vue";
import { computed } from "vue";

const props = defineProps<{
  section: Section;
}>();

const model = defineModel<boolean>();

const toggleModel = () => {
  if (model.value === undefined) {
    return;
  }
  model.value = !model.value;
};

const optionalColorClass = computed(() => {
  switch (props.section.title) {
    case "Action":
      return "action";
    case "Bonus Action":
      return "bonus-action";
    case "Reaction":
      return "reaction";
    default:
      return "";
  }
});
</script>

<template>
  <div
    :class="`card section ${model ? 'used' : ''} ${model !== undefined ? 'cursor-pointer' : ''} ${optionalColorClass}`"
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
          <tr
            v-for="row in section.table.rows"
            :key="row.content[0]"
            :style="
              row.backgroundColor ? `background: ${row.backgroundColor}` : ''
            "
          >
            <td v-for="cell in row.content" :key="cell">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style>
.card {
  --background-color: var(--card-bg);
  background-color: color-mix(in srgb, var(--background-color), transparent);

  &.action {
    --background-color: var(--action-color);
  }

  &.bonus-action {
    --background-color: var(--bonus-action-color);
  }

  &.reaction {
    --background-color: var(--reaction-color);
  }

  &.used {
    background-color: color-mix(
      in srgb,
      var(--background-color),
      transparent 80%
    );
    color: var(--text-color-darker-1);
    box-shadow: unset;
  }
}

.cursor-pointer {
  cursor: pointer;
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--size-24);
  padding: var(--size-8);

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
    gap: var(--size-8);

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
