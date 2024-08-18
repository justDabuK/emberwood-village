import type { AbilityScores } from "../cheatSheetTypes.ts";

export const useResilient = (resilientScore: keyof AbilityScores) => {
  const preCreatureCreation = (
    abilityScores: AbilityScores,
    savingThrowProficiencyList: (keyof AbilityScores)[],
  ) => {
    abilityScores[resilientScore] += 1;
    savingThrowProficiencyList.push(resilientScore);
  };

  return {
    preCreatureCreation,
  };
};
