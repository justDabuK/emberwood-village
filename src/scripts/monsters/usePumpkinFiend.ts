import {
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";
import { convertToSpellSlots, Spell } from "../spellUtils.ts";

export const usePumpkinFiend = (name = "Pumpkin Fiend") => {
  const armorClass = 16;
  const hitPoints = 45;
  const abilityScores = {
    STR: 16,
    DEX: 16,
    CON: 12,
    INT: 5,
    WIS: 10,
    CHA: 8,
  };
  const skillProficiencies = [Skill.Stealth];
  const proficiencyBonus = 2;
  const knownSpellNameList = [
    Spell.Prestidigitation, // Innate Spellcasting
    Spell.Thaumaturgy, // Innate Spellcasting
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
        spellSlots: convertToSpellSlots([]),
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
              title: "Multiattack (2 slam)",
              dice: `d20+${getModifier(abilityScores.DEX) + proficiencyBonus}`,
              items: [
                {
                  name: "Slam",
                  dice: `7(1d8 +${getModifier(abilityScores.DEX)})`,
                },
              ],
            },
            {
              title: "Spiky Vine Lash (30 ft.)",
              dice: `DC 11 DEX`,
              description: "DC 11 DEX save or 10 (3d6) piercing damage",
            },
            {
              title: "Frightening Gaze (30 ft.)(Recharge 5-6)",
              description:
                "DC 11 WIS save or frightened & paralyzed until end of fiends next turn. ",
            },
            {
              title: "Spell casting",
              description: "See spell casting cheat sheet",
            },
          ],
        },
        {
          title: "Reactions",
          used: false,
          subsections: [
            {
              title: "Parry",
              description: "+3 to AC against one melee attack",
            },
            {
              title: "Oppertunity Attack",
              description: "See Attack",
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
              title: "Darkvision",
              description: "60 ft.",
            },
            {
              title: "Languages",
              description: "understands Abyssal but can't speak",
            },
            {
              title: "Damage Resistances",
              description:
                "cold, fire, lightning, bludgeoning, piercing, and slashing from nonmagical attacks",
            },
            {
              title: "Condition Immunities",
              description: "frightened",
            },
            {
              title: "Keen Smell",
              description:
                "The pumpkin fiend has advantage on Wisdom (Perception) checks that rely on smell",
            },
            {
              title: "Pumpkin Form",
              description:
                "Advantage on Stealth check when hiding among other pumpkins, as looking like a large pumpkin with malevolant toothy grin",
            },
            {
              title: "Pumpkin Regeneration",
              description:
                "Regain 5 HP at the start of its turn as long as a pumpkin is within 5 ft. Stop if taken radiant damage, or holly water attack or if dead",
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
