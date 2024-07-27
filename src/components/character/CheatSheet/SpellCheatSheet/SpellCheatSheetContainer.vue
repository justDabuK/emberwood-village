<script setup lang="ts">
import {
  type SpellSlots,
  TypeOfRest,
} from "../../../../scripts/cheatSheetTypes.ts";
import { type Spell } from "../../../../scripts/spellUtils.ts";
import type { CollectionEntry } from "astro:content";
import SpellCheatSheet from "./SpellCheatSheet.vue";

const props = defineProps<{
  allSpells: CollectionEntry<"spells">[];
  typeOfRest: TypeOfRest;
  knownSpellNameList: Spell[];
  spellsSaveDiceCheck: number;
  spellAttackModifier: number;
  casterLevel:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20;
}>();

const spellSlots = defineModel<SpellSlots>("spellSlots", { required: true });
const concentration = defineModel<boolean>("concentration");

const knownSpellList: CollectionEntry<"spells">[] = props.allSpells
  .filter((spell) => props.knownSpellNameList.includes(spell.data.title))
  .sort((a, b) => a.data.level - b.data.level);

const isBonusActionSpell = (spell: CollectionEntry<"spells">) =>
  spell.data.castingTime.includes("bonus");
const isReactionSpell = (spell: CollectionEntry<"spells">) =>
  spell.data.castingTime.includes("reaction");
const isActionSpell = (spell: CollectionEntry<"spells">) =>
  spell.data.castingTime.includes("action") &&
  !isBonusActionSpell(spell) &&
  !isReactionSpell(spell);
const isRitualSpell = (spell: CollectionEntry<"spells">) => spell.data.ritual;

const bonusActionSpellList: CollectionEntry<"spells">[] =
  knownSpellList.filter(isBonusActionSpell);
const actionSpellList: CollectionEntry<"spells">[] =
  knownSpellList.filter(isActionSpell);
const reactionSpellList: CollectionEntry<"spells">[] =
  knownSpellList.filter(isReactionSpell);
const ritualSpellList: CollectionEntry<"spells">[] =
  knownSpellList.filter(isRitualSpell);
const remainingSpellList: CollectionEntry<"spells">[] = knownSpellList.filter(
  (spell) =>
    !isBonusActionSpell(spell) &&
    !isActionSpell(spell) &&
    !isReactionSpell(spell) &&
    !isRitualSpell(spell),
);

const orderSpellsByLevel = (spellList: CollectionEntry<"spells">[]) => {
  const spellListByLevel: Record<number, CollectionEntry<"spells">[]> = {};
  for (const spell of spellList) {
    if (!spellListByLevel[spell.data.level]) {
      spellListByLevel[spell.data.level] = [];
    }
    spellListByLevel[spell.data.level].push(spell);
  }
  return spellListByLevel;
};

const spellSectionByLevelList = [
  { title: "Action", spells: orderSpellsByLevel(actionSpellList) },
  { title: "Bonus Action", spells: orderSpellsByLevel(bonusActionSpellList) },
  { title: "Reaction", spells: orderSpellsByLevel(reactionSpellList) },
  { title: "Ritual", spells: orderSpellsByLevel(ritualSpellList) },
  { title: "Remaining", spells: orderSpellsByLevel(remainingSpellList) },
];
</script>

<template>
  <SpellCheatSheet
    v-model:spell-slots="spellSlots"
    v-model:concentration="concentration"
    :caster-level="casterLevel"
    :spells-save-dice-check="spellsSaveDiceCheck"
    :spell-attack-modifier="spellAttackModifier"
    :type-of-rest="typeOfRest"
    :spell-section-by-level-list="spellSectionByLevelList"
  />
</template>
