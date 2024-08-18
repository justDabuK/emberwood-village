import {
  type AbilityScores,
  type Creature,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { Spell } from "../spellUtils.ts";

export const preCreationApplyTelepathic = (
  abilityScores: AbilityScores,
  knownSpellNameList: Spell[],
  abilityToIncrease: keyof AbilityScores,
) => {
  console.group("telepathic");
  console.log(abilityScores);
  abilityScores[abilityToIncrease] += 1;
  knownSpellNameList.push(Spell.DetectThoughts);
  console.log(abilityScores);
  console.groupEnd();
};

export const postCreationApplyTelepathic = (creatureList: Creature[]) => {
  creatureList[0].sectionList
    .find((section) => section.title === "Features")
    ?.subsections?.push({
      title: "Telepathic",
      description:
        "speak telepathically in any language you know to any creature you can see within 60ft. (20 squares)",
    });

  creatureList[0].sectionList
    .find((section) => section.title === "Action")
    ?.subsections?.push({
      title: "Detect Thoughts",
      usages: {
        flags: [false],
        typeOfRest: TypeOfRest.LONG,
      },
      description: "for free, 2nd level",
    });
};
