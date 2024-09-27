import {
  type AbilityScores,
  type Creature,
  getModifier,
  type Section,
  Skill,
  type Subsection,
  TypeOfRest,
} from "../cheatSheetTypes.ts";
import { useStorage } from "@vueuse/core";
import { convertToSpellSlots, Spell } from "../spellUtils.ts";

export const useSlashingPumpkin = (
  name = "Slashing Pumpkin",
  {
    twistedPumpkinSummoning = false,
    pumpkinRegrowth = false,
    pumpkinDeflection = false,
    vineShield = false,
    explodingPumpkins = false,
    evasiveDash = false,
  }: {
    twistedPumpkinSummoning?: boolean;
    pumpkinRegrowth?: boolean;
    pumpkinDeflection?: boolean;
    vineShield?: boolean;
    explodingPumpkins?: boolean;
    evasiveDash?: boolean;
  },
) => {
  const armorClass = 15;
  const hitPoints = 120;
  const abilityScores = {
    STR: 18,
    DEX: 14,
    CON: 15,
    INT: 6,
    WIS: 10,
    CHA: 6,
  };
  const savingThrowProficiencyList: (keyof AbilityScores)[] = [
    "DEX",
    "CON",
    "WIS",
  ];
  const skillProficiencies = [Skill.Perception, Skill.Stealth];
  const proficiencyBonus = 3;
  const knownSpellNameList = [Spell.Fireball];

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
      savingThrowProficiencyList,
      skill: {
        proficiencies: skillProficiencies,
        expertise: [],
      },
      proficiencyBonus,
      inspiration: false,
      magic: {
        spellSlots: convertToSpellSlots([0, 0, 1]),
        refresh: TypeOfRest.LONG,
        concentration: false,
        spellSaveDiceCheck: 13,
        spellAttackModifier: 0,
      },
      sectionList: [
        {
          title: "Action",
          used: false,
          subsections: [
            {
              title: "Multiattack (2 slam)",
              description: "2 Claws & 1 Bite OR 2 Flaming Slash",
              dice: `d20+${getModifier(abilityScores.STR) + proficiencyBonus}`,
              items: [
                {
                  name: "Claws",
                  dice: `13(2d8 +${getModifier(abilityScores.STR)})`,
                },
                {
                  name: "Flaming Slash (10 ft.)",
                  dice: `8(1d8 +${getModifier(abilityScores.STR)})+18(4d8)`,
                },
              ],
            },
            {
              title: "Bite",
              description: "DC 14 CON save or paralyzed for 1 minute",
              dice: `15(2d10 +${getModifier(abilityScores.STR)})`,
            },
            {
              title: "Self-Destruct",
              description:
                "If restrained for mor than two rounds, then Immolation",
            },
            {
              title: "Pumpkin  Spice Cloud (Recharge 4-6)",
              description:
                "20 ft. radius, DC 14 WIS save or frightened for 1 minute",
            },
            {
              title: "Fire breath (Recharge 5-6)",
              description:
                "30 ft. cone, DC 14 DEX save or 28 (8d6) fire damage",
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
              title: "Pre-Emptive Explosion",
              description:
                "When few than half HP, can use Immolation on Attack",
            },
            {
              title: "Oppertunity Attack",
              description: "See Attack",
            },
          ],
        },
        {
          title: "Immolation",
          used: false,
          subsections: [
            {
              title: "triggered on death",
              description:
                "DC 14 DEX save within 10 ft. or 21 (6d6) fire damage. The pumpkin disintegrates and leaves no remains",
            },
          ],
        },
        {
          title: "Movement",
          used: false,
          subsections: [
            {
              title: "Walking 40ft.",
              description: "(8 squares)",
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
              description: "understands Common and Abyssal but can't speak",
            },
            {
              title: "Damage Resistances",
              description: "fire",
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
          ],
        },
      ],
    },
  ];

  const optionalAbilities: {
    flag: boolean;
    section: Section["title"];
    subsection: Subsection;
  }[] = [
    {
      flag: twistedPumpkinSummoning,
      section: "Action",
      subsection: {
        title: "Twisted Pumpkin Summoning",
        description:
          "1d6 twisted pumpkins appear within 30 ft. and share its initiative (immediate action)",
      },
    },
    {
      flag: pumpkinRegrowth,
      section: "Bonus Action",
      subsection: {
        title: "Pumpkin Regrowth",
        description: "Regain 4d8 HP",
      },
    },
    {
      flag: pumpkinDeflection,
      section: "Reactions",
      subsection: {
        title: "Pumpkin Deflection",
        description: "Disadvantage on one ranged attack",
      },
    },
    {
      flag: vineShield,
      section: "Reaction",
      subsection: {
        title: "Vine Shield",
        description: "Reduce damage by 2d8+3",
      },
    },
    {
      flag: explodingPumpkins,
      section: "Action",
      subsection: {
        title: "Exploding Pumpkins (60 ft.)",
        description: "DC 15 DEX save or 4d8 fire damage",
      },
    },
    {
      flag: evasiveDash,
      section: "Bonus Action",
      subsection: {
        title: "Evasive Dash",
        description: "Disengage and move 40 ft.",
      },
    },
  ];

  optionalAbilities.forEach(({ flag, section, subsection }) => {
    if (flag) {
      const foundSection = defaultCreatureList[0].sectionList.find(
        (sectionItem) => sectionItem.title === section,
      );
      if (foundSection) {
        foundSection?.subsections?.push(subsection);
      } else {
        defaultCreatureList[0].sectionList.push({
          title: section,
          subsections: [subsection],
        });
      }
    }
  });

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
