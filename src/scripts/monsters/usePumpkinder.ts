import {
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";
import { Spell } from "../spellUtils.ts";

export const usePumpkinder = (name = "") => {
  const armorClass = 12;
  const hitPoints = 10;
  const abilityScores = {
    STR: -2,
    DEX: 14,
    CON: 10,
    INT: 8,
    WIS: 12,
    CHA: 16,
  };
  const skillProficiencies = [Skill.Stealth];
  const proficiencyBonus = 2;
  const knownSpellNameList = [
    Spell.Druidcraft, // Innate Magic
  ];

  const defaultCreatureList: Creature[] = [
    {
      name: name ?? "Pumkinder",
      characterLevel: 3,
      hitPoints: {
        current: hitPoints,
        max: hitPoints,
        temporary: 0,
        hitDice: {
          flags: [...Array(3)].fill(false),
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
                  dice: `4(1d4 +${getModifier(abilityScores.DEX)})`,
                },
                {
                  name: "Bite",
                  dice: `4(1d4 +${getModifier(abilityScores.DEX)})`,
                },
              ],
            },
            {
              title: "Pumkin Toss",
              dice: `d20+${getModifier(abilityScores.DEX) + proficiencyBonus}`,
              description:
                "Additionally DC 12 DEX save or disadvantage on next attack roll or ability check (due to blindness)",
              items: [
                {
                  name: "Ranged (20/60 ft.)",
                  dice: `5(1d6 +${getModifier(abilityScores.DEX)})`,
                },
                {
                  name: "Bite",
                  dice: `4(1d4 +${getModifier(abilityScores.DEX)})`,
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
              title: "Hide and Seek",
              description:
                "Hide even if only lightly obscured, reposition up to 30 ft. staying hidden",
            },
            {
              title: "Mischievous Trick",
              description:
                "Creature within 30 ft. DC 12 WIS save or disadvantage on next attack roll or ability check",
            },
          ],
        },
        {
          title: "Reaction",
          used: false,
          subsections: [
            {
              title: "Playful Dodge",
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
