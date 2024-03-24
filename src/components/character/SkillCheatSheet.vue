<script setup lang="ts">

import {type AbilityScores, Skill} from "../../scripts/cheatSheetTypes.ts";

const props = defineProps<{
  abilityScores: AbilityScores;
  modifiers: AbilityScores;
  savingThrows: AbilityScores;
  skillProficiencyList: Skill[];
  skillExpertiseList: Skill[];
}>();

const abilityScoreKeys = Object.keys(props.abilityScores) as (keyof AbilityScores)[];

const SkillsPerAbilityScore = {
  STR: [Skill.Athletics],
  DEX: [Skill.Acrobatics, Skill.SleightOfHand, Skill.Stealth],
  CON: [],
  INT: [Skill.Arcana, Skill.History, Skill.Investigation, Skill.Nature, Skill.Religion],
  WIS: [Skill.AnimalHandling, Skill.Insight, Skill.Medicine, Skill.Perception, Skill.Survival],
  CHA: [Skill.Deception, Skill.Intimidation, Skill.Performance, Skill.Persuasion]
}

const getSkillModifier = (skill: Skill, abilityScore: keyof AbilityScores) => {
  const modifier = props.modifiers[abilityScore];
  if (props.skillProficiencyList.includes(skill)) {
    return addSign(modifier + 2);
  } else if (props.skillExpertiseList.includes(skill)) {
    return addSign(modifier + 4);
  } else {
    return addSign(modifier);
  }
}

const addSign = (number: number) => {
  return number >= 0 ? `+${number}` : number;
};
</script>


<template>
  <div class="cheat-sheet">
    <div v-for="scoreKey in abilityScoreKeys" :key="scoreKey" class="card">
      <span>{{ scoreKey }}</span>
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
          <span>Saving Throws</span>
          <span>{{ addSign(props.savingThrows[scoreKey]) }}</span>
        </div>
      </div>
      <ul class="skill-list">
        <li v-for="skill in SkillsPerAbilityScore[scoreKey]">{{`${getSkillModifier(skill, scoreKey)} ${skill}`}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cheat-sheet {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
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
}
</style>