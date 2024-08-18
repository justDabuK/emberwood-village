import type { AbilityScores } from "../cheatSheetTypes.ts";

export const useAbilityScoreImprovement = (
  firstAbilityScore: keyof AbilityScores,
  secondAbilityScore: keyof AbilityScores,
) => {
  const preCreatureCreation = (abilityScores: AbilityScores) => {
    abilityScores[firstAbilityScore] += 1;
    abilityScores[secondAbilityScore] += 1;
  };

  return {
    preCreatureCreation,
  };
};
