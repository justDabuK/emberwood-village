import {
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";

export const useCultist = (name = "") => {
  const armorClass = 12;
  const hitPoints = 9;
  const abilityScores = {
    STR: 11,
    DEX: 12,
    CON: 10,
    INT: 10,
    WIS: 11,
    CHA: 10,
  };
  const skillProficiencies = [Skill.Deception, Skill.Religion];
  const proficiencyBonus = 2;
  const defaultCreatureList: Creature[] = [
    {
      name: name ?? "Cultist",
      hitPoints: {
        current: hitPoints,
        max: hitPoints,
        temporary: 0,
        hitDice: {
          flags: [...Array(2)].fill(false),
          description: "d8",
          typeOfRest: TypeOfRest.LONG,
        },
      },
      contamination: 0,
      exhaustion: 0,
      armorClass,
      abilityScores: abilityScores,
      initiative: getModifier(abilityScores.DEX),
      savingThrowProficiencyList: [],
      skill: {
        proficiencies: skillProficiencies,
        expertise: [],
      },
      proficiencyBonus: proficiencyBonus,
      inspiration: false,
      sectionList: [
        {
          title: "Action",
          used: false,
          subsections: [
            {
              title: "Weapon Attack",
              dice: `d20+${getModifier(abilityScores.DEX) + proficiencyBonus}`,
              items: [{ name: "Scimitar", dice: `4(1d6 +1)` }],
            },
          ],
        },
        {
          title: "Reaction",
          used: false,
          subsections: [
            {
              title: "Opportunity Attack",
              description: "See Weapon Attack",
            },
          ],
        },
        {
          title: "Movement",
          used: false,
          subsections: [
            {
              title: "Walking 30ft.",
              description: "(6 Felder)",
            },
          ],
        },
        {
          title: "Features",
          subsections: [
            {
              title: "Dark Devotion",
              description:
                "Advantage on saving throws against being charmed or frightened",
            },
          ],
        },
      ],
    },
  ];

  const creatureList = useStorage<Creature[]>(
    `${defaultCreatureList[0].name}-creature-list`,
    defaultCreatureList,
  );

  const resetToDefault = () => {
    creatureList.value = defaultCreatureList;
  };
  const notesStorage = useStorage<string>(
    `${defaultCreatureList[0].name}-notes`,
    "",
  );

  return {
    creatureList,
    notesStorage,
    resetToDefault,
  };
};
