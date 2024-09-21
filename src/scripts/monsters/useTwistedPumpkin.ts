import {
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";
import { Spell } from "../spellUtils.ts";

export const useTwistedPumpkin = (name = "Twisted Pumpkin") => {
  const armorClass = 13;
  const hitPoints = 18;
  const abilityScores = {
    STR: 8,
    DEX: 16,
    CON: 12,
    INT: 8,
    WIS: 12,
    CHA: 18,
  };
  const skillProficiencies = [Skill.Stealth];
  const proficiencyBonus = 2;
  const knownSpellNameList = [
    Spell.Druidcraft, // Innate Magic
  ];

  const defaultCreatureList: Creature[] = [
    {
      name,
      characterLevel: 4,
      hitPoints: {
        current: hitPoints,
        max: hitPoints,
        temporary: 0,
        hitDice: {
          flags: [...Array(4)].fill(false),
          description: "d6",
          typeOfRest: TypeOfRest.LONG,
        },
      },
      contamination: 0,
      exhaustion: 0,
      armorClass,
      abilityScores,
      initiative: getModifier(abilityScores.DEX),
      savingThrowProficiencyList: [],
      skill: {
        proficiencies: skillProficiencies,
        expertise: [],
      },
      proficiencyBonus,
      inspiration: false,
      magic: {
        spellSlots: {},
        refresh: TypeOfRest.LONG,
        concentration: false,
        spellSaveDiceCheck:
          8 + getModifier(abilityScores.CHA) + proficiencyBonus,
        spellAttackModifier: getModifier(abilityScores.CHA) + proficiencyBonus,
      },
      sectionList: [
        {
          title: "Action",
          used: false,
          subsections: [
            {
              title: "Weapon Attack",
              dice: `d20+${getModifier(abilityScores.DEX) + proficiencyBonus}`,
              items: [
                {
                  name: "Claw",
                  dice: `5(1d4 +${getModifier(abilityScores.DEX)})`,
                },
                {
                  name: "Bite",
                  dice: `5(1d4 +${getModifier(abilityScores.DEX)})`,
                },
              ],
            },
            {
              title: "Pumkin Toss",
              dice: `d20+${getModifier(abilityScores.DEX) + proficiencyBonus}`,
              description:
                "Additionally DC 13 DEX save or disadvantage on next attack roll or ability check (due to blindness)",
              items: [
                {
                  name: "Ranged (20/60 ft.)",
                  dice: `7(1d8 +${getModifier(abilityScores.DEX)})`,
                },
              ],
            },
            {
              title: "Spell casting",
              description: "See spell casting cheat sheet",
            },
          ],
        },
        {
          title: "Bonus Action",
          used: false,
          subsections: [
            {
              title: "Hide and Wreak",
              description: "Hide even if only lightly obscured",
            },
            {
              title: "Mischievous Trick",
              description:
                "Creature within 30 ft. DC 13 WIS save or disadvantage on next attack roll or ability check",
            },
          ],
        },
        {
          title: "Reaction",
          used: false,
          subsections: [
            {
              title: "Sinister Dodge",
              description: "Disadvantage on attack roll",
            },
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
              title: "Walking 20ft.",
              description: "(4 squares)",
            },
          ],
        },
        {
          title: "Features",
          subsections: [
            {
              title: "Trickster's Guile",
              description:
                "Advantage on DEX saves to avoid traps, spells or other harming effects",
            },
            {
              title: "Darkvision",
              description: "60 ft.",
            },
            {
              title: "Languages",
              description: "Abyssal",
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
    knownSpellNameList,
    notesStorage,
    resetToDefault,
  };
};
