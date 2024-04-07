<script setup lang="ts">

import {type AbilityScores, Skill} from "../../scripts/cheatSheetTypes.ts";

const props = defineProps<{
  abilityScores: AbilityScores;
  modifiers: AbilityScores;
  savingThrowProficiencyList: (keyof AbilityScores)[];
  skillProficiencyList: Skill[];
  skillExpertiseList: Skill[];
  proficiencyBonus: number;
}>();

const abilityScoreKeys = Object.keys(props.abilityScores) as (keyof AbilityScores)[];

const SkillsPerAbilityScore = {
  STR: [Skill.Athletics],
  DEX: [Skill.Acrobatics, Skill.SleightOfHand, Skill.Stealth, Skill.ThievesTools],
  CON: [],
  INT: [Skill.Arcana, Skill.History, Skill.Investigation, Skill.Nature, Skill.Religion],
  WIS: [Skill.AnimalHandling, Skill.Insight, Skill.Medicine, Skill.Perception, Skill.Survival],
  CHA: [Skill.Deception, Skill.Intimidation, Skill.Performance, Skill.Persuasion]
}

const getSkillModifier = (skill: Skill, abilityScore: keyof AbilityScores) => {
  const modifier = props.modifiers[abilityScore];
  if (props.skillProficiencyList.includes(skill)) {
    return addSign(modifier + props.proficiencyBonus);
  } else if (props.skillExpertiseList.includes(skill)) {
    return addSign(modifier + props.proficiencyBonus * 2);
  } else {
    return addSign(modifier);
  }
}

const getSavingThrowModifier = (abilityScore: keyof AbilityScores) => {
  const modifier = props.modifiers[abilityScore];
  return props.savingThrowProficiencyList.includes(abilityScore) ? addSign(modifier + props.proficiencyBonus) : addSign(modifier);
}

const addSign = (number: number) => {
  return number >= 0 ? `+${number}` : number;
};

const getAbilityScoreName = (abilityScore: keyof AbilityScores) => {
  switch (abilityScore) {
    case "STR":
      return "Strength";
    case "DEX":
      return "Dexterity";
    case "CON":
      return "Constitution";
    case "INT":
      return "Intelligence";
    case "WIS":
      return "Wisdom";
    case "CHA":
      return "Charisma";
  }
}
</script>


<template>
  <div class="cheat-sheet">
    <div v-for="scoreKey in abilityScoreKeys" :key="scoreKey" class="card">
      <h2 class="headline">{{ getAbilityScoreName(scoreKey) }}</h2>
      <div class="ability-overview">
        <div class="secondary-section">
          <span>Score</span>
          <span>{{ props.abilityScores[scoreKey] }}</span>
        </div>
        <div class="primary-section">
          <span>Modifier</span>
          <span>{{ addSign(props.modifiers[scoreKey]) }}</span>
        </div>
        <div class="secondary-section">
          <span :class="savingThrowProficiencyList.includes(scoreKey) ? 'proficient' : ''">Saving Throw</span>
          <span>{{ getSavingThrowModifier(scoreKey) }}</span>
        </div>
      </div>
      <ul class="skill-list">
        <li v-for="skill in SkillsPerAbilityScore[scoreKey]" :class="[skillProficiencyList.includes(skill) ? 'proficient' : '', skillExpertiseList.includes(skill) ? 'expertise' : '']">{{`${getSkillModifier(skill, scoreKey)} ${skill}`}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cheat-sheet {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
}

.headline {
  display: block;
  text-align: center;
}

.ability-overview {
  border-bottom: 1px solid var(--text-color-darker-1);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: 10px;

  .secondary-section {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: var(--text-color-darker-1);
    gap: 10px;
  }

  .primary-section {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 20px;
    gap: 5px;
  }
}

.skill-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 10px auto;
}

.proficient {
  color: var(--highlight-color);
}

.expertise {
  font-weight: 600;
  color: var(--highlight-color);
}
</style>