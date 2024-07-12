<script setup lang="ts">
import {getLevelString, type Spell} from "../../../scripts/spellUtils.ts";
import SpellSchoolIcon from "./SpellSchoolIcon.vue";
import SpellRangeIcon from "./SpellRangeIcon.vue";
import {type SpellSlots, TypeOfRest} from "../../../scripts/cheatSheetTypes.ts";
import type {CollectionEntry} from "astro:content";

defineProps<{
  casterLevel: number;
  spellsSaveDiceCheck: number;
  spellAttackModifier: number;
  typeOfRest: TypeOfRest;
  spellSectionByLevelList: {
    title: string;
    spells: Record<number, CollectionEntry<"spells">[]>
  }[]
}>();

const spellSlots = defineModel<SpellSlots>("spellSlots", { required: true });
const concentration = defineModel<boolean>("concentration");

const getCostlyComponent = (components: string) => {
  const match = components.match(/\((.+)\)/);
  return match ? match[1] : "";
};

const isCostlySpell = (components: string) => {
  return !!components.match(/(\d+ (gp|sp|cp))/g)?.length;
};

const getOptionalActionColor = (title: string) => {
  switch (title) {
    case "Action":
      return "action";
    case "Bonus Action":
      return "bonus-action";
    case "Reaction":
      return "reaction";
    default:
      return "";
  }
};
</script>

<template>
  <div class="spell-cheat-sheet-container">
    <div class="spell-cheat-sheet-header">
      <div class="card">
        <h2>DC</h2>
        <h2>{{ spellsSaveDiceCheck }}</h2>
      </div>
      <div class="card">
        <h2>ATK</h2>
        <h2>{{ `+${spellAttackModifier}` }}</h2>
      </div>
      <div class="card">
        <h2>{{ `Spell Slots per ${typeOfRest}` }}</h2>
        <ul>
          <li v-for="(slot, level) in spellSlots" :key="level">
            {{ `${level}: ` }}
            <input
                v-if="slot"
                v-for="(_, index) in slot.flags"
                :key="index"
                type="checkbox"
                v-model="slot.flags[index]"
            />
          </li>
        </ul>
      </div>
      <div class="card concentration">
        <h2>Concentration</h2>
        <input type="checkbox" v-model="concentration" />
      </div>
    </div>
    <div class="spell-cheat-sheet-body">
      <template
          v-for="spellSection in spellSectionByLevelList"
          :key="spellSection.title"
      >
        <div
            v-if="Object.keys(spellSection.spells).length > 0"
            :class="`spell-section ${getOptionalActionColor(spellSection.title)}`"
        >
          <h2>{{ spellSection.title }}</h2>
          <div v-for="(spellList, level) in spellSection.spells">
            <h3>{{ getLevelString(level) }}</h3>
            <div class="spell-section-spell-list">
              <a
                  v-for="spell in spellList"
                  :key="spell.data.title"
                  :href="`/spells/${spell.slug}`"
                  :class="[
                  'card',
                  'spell',
                  spell.data.duration.includes('Concentration')
                    ? 'concentration'
                    : '',
                ]"
              >
                <SpellSchoolIcon
                    class="spell-school-icon"
                    :spell-school="spell.data.school"
                />
                <SpellRangeIcon
                    class="spell-range-icon"
                    :range="spell.data.range"
                />
                <p class="title">{{ spell.data.title }}</p>

                <p
                    v-if="
                    spell.data.level === 0 &&
                    spell.data.effect &&
                    spell.data.effect[casterLevel]
                  "
                >
                  {{ spell.data.effect[casterLevel] }}
                </p>
                <p
                    v-else-if="
                    spell.data.effect && spell.data.effect[level]
                  "
                >
                  {{ spell.data.effect[level] }}
                </p>

                <p
                    v-if="isCostlySpell(spell.data.components)"
                    :class="[
                    'cost',
                    spell.data.school.includes('Contaminated')
                      ? 'contaminated'
                      : '',
                  ]"
                >
                  {{ getCostlyComponent(spell.data.components) }}
                </p>
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.spell-cheat-sheet-container {
  --concentration-color: color-mix(
      in srgb,
      oklch(76.99% 0.08 226.91) 20%,
      var(--body-bg)
  );

  --cantrip-color: color-mix(
      in srgb,
      oklch(40% 0.032 304.82) 40%,
      var(--body-bg)
  );

  display: flex;
  flex-direction: column;
  gap: 20px;

  .spell-cheat-sheet-header {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }

  .spell-cheat-sheet-body {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(620px, 1fr));
    gap: 20px;

    .spell-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
      border-radius: 10px;
      padding: 1rem;

      --background-color: transparent;
      background-color: color-mix(
          in srgb,
          var(--background-color),
          transparent 80%
      );

      &.action {
        --background-color: var(--action-color);
      }

      &.bonus-action {
        --background-color: var(--bonus-action-color);
      }

      &.reaction {
        --background-color: var(--reaction-color);
      }

      .spell-section-spell-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;

        .spell {
          position: relative;
          display: flex;
          flex-direction: column;
          text-align: center;
          background-color: var(--card-bg);
          color: var(--text-color);

          &.concentration {
            background-color: var(--concentration-color);

            &.cantrip {
              background: linear-gradient(
                  90deg,
                  var(--cantrip-color),
                  var(--concentration-color)
              );
            }
          }

          &.cantrip {
            background-color: var(--cantrip-color);
          }

          .spell-school-icon {
            position: absolute;
            top: 10px;
            left: 10px;
            height: 30px;
            width: 30px;
            color: var(--text-color-darker-1);
          }

          .title {
            font-weight: 500;
          }

          .spell-range-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            height: 30px;
            width: 30px;
            color: var(--text-color-darker-1);
          }

          .cost {
            border-radius: 10px;
            padding: 5px;
            background-color: oklch(from gold l c h / 0.1);
            color: oklch(from gold l c h / 0.6);

            &.contaminated {
              position: relative;
              z-index: 1;
              background-clip: text;
              color: oklch(from turquoise l c h / 0.7);

              &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                background: linear-gradient(125deg, rebeccapurple 20%, teal);
                height: 100%;
                width: 100%;
                border-radius: 10px;
                opacity: 0.2;
                z-index: -1;
              }
            }
          }
        }
      }
    }
  }

  .concentration {
    background-color: var(--concentration-color);
  }
}
</style>