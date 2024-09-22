import {
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";
import { convertToSpellSlots, Spell } from "../spellUtils.ts";

export const useSinisterPumpkin = (name = "Twisted Pumpkin") => {
  const armorClass = 14;
  const hitPoints = 40;
  const abilityScores = {
    STR: 10,
    DEX: 16,
    CON: 12,
    INT: 10,
    WIS: 12,
    CHA: 14,
  };
  const skillProficiencies = [Skill.Deception, Skill.Stealth];
  const proficiencyBonus = 2;
  const knownSpellNameList = [
    Spell.MinorIllusion, // Innate Magic
    Spell.CharmPerson,
    Spell.Entangle,
    Spell.MirrorImage,
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
        spellSlots: convertToSpellSlots([3, 1]),
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
                  name: "Bite",
                  dice: `7(1d6 +${getModifier(abilityScores.DEX)})`,
                },
              ],
            },
            {
              title: "Trickster's Mischief (Recharge 5-6)",
              dice: `DC 12 WIS`,
              description:
                "DC 12 WIS (within 30 ft.) or charmed and unable to distinguish real from illusion. Ends if hurt or different creature uses action",
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
              title: "Fey Step (1/short rest)",
              description: "30 ft. teleport",
            },
          ],
        },
        {
          title: "Movement",
          used: false,
          subsections: [
            {
              title: "Walking 30ft.",
              description: "(6 squares)",
            },
          ],
        },
        {
          title: "Features",
          subsections: [
            {
              title: "Evasion",
              description: "If successful DEX save, no damage instead of half",
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
