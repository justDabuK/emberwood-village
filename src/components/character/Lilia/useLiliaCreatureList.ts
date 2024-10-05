import { getFullCasterSpellSlots, Spell } from "../../../scripts/spellUtils.ts";
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../../scripts/cheatSheetTypes.ts";
import {
  getChainShirtArmorClass,
  getLeatherArmorClass,
} from "../../../scripts/armorClassUtils.ts";
import { getProficiencyBonus } from "../../../scripts/getProficiencyBonus.ts";
import { useStorage } from "@vueuse/core";
import { owl } from "../../../scripts/familiars/owl.ts";
import { useSurvivor } from "../../../scripts/backgrounds/useSurvivor.ts";
import { useFeyTouched } from "../../../scripts/feats/feyTouched.ts";
import { useBard } from "../../../scripts/classes/bard/useBard.ts";
import { useDoomsayers } from "../../../scripts/classes/bard/useDoomsayers.ts";
import { useLucky } from "../../../scripts/feats/lucky.ts";

export const useLiliaCreatureList = () => {
  const LEVEL = 5;

  const knownSpellNameList = [
    // --- known spells: 8 ---
    Spell.MinorIllusion,
    Spell.ViciousMockery,
    Spell.DancingLights,
    Spell.SilveryBarbs,
    Spell.FaerieFire,
    Spell.Suggestion,
    Spell.PhantasmalForce,
    Spell.MirrorImage,
    Spell.HeatMetal,
    Spell.MajorImage,
    Spell.HypnoticPattern,
  ];

  const getBardCantripsKnown = (level: number) => {
    if (level < 4) {
      return 2;
    } else if (level < 10) {
      return 3;
    } else {
      return 4;
    }
  };

  const getBardSpellsKnown = (level: number) => {
    switch (level) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return level + 3;
      case 10:
        return 14;
      case 11:
      case 12:
        return 15;
      case 13:
        return 16;
      case 14:
        return 18;
      case 15:
      case 16:
        return 19;
      case 17:
        return 20;
      case 18:
      case 19:
      case 20:
        return 22;
    }
  };

  const racialBonusPlus2 = 2;
  const racialBonusPlus1 = 1;

  const ABILITY_SCORES: AbilityScores = {
    STR: 8,
    DEX: 14,
    CON: 13 + racialBonusPlus1,
    INT: 12,
    WIS: 10,
    CHA: 15 + racialBonusPlus2,
  };

  const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = [
    "DEX",
    "CHA",
  ];

  const SKILL_PROFICIENCIES: Skill[] = [
    Skill.Performance,
    Skill.Persuasion,
    Skill.Intimidation,
    Skill.Deception,
    Skill.Acrobatics,
  ];

  const SKILL_EXPERTISE: Skill[] = [Skill.Intimidation, Skill.Persuasion];

  // --- pre creation stuff ---
  const {
    preCreatureCreation: applySurvivorPreCreation,
    postCreatureCreation: applySurvivorPostCreation,
  } = useSurvivor(Skill.Perception, Skill.Stealth); // background
  const { postCreatureCreation: applyLuckyPostCreation } = useLucky(); // beginner feat
  const { postCreatureCreation: applyBardPostCreation } = useBard(LEVEL); // class

  const { postCreatureCreation: applyDoomsayersPostCreation } =
    useDoomsayers(LEVEL); // college 3rd level
  const {
    preCreatureCreation: applyFeyTouchedPreCreation,
    postCreatureCreation: applyFeyTouchedPostCreation,
  } = useFeyTouched("CHA", Spell.Bless); // 4th level feat

  applySurvivorPreCreation(SKILL_PROFICIENCIES);
  applyFeyTouchedPreCreation(ABILITY_SCORES, knownSpellNameList);

  const defaultCreatureList: Creature[] = [
    {
      name: "Satyrday",
      characterLevel: LEVEL,
      hitPoints: {
        current:
          8 +
          getModifier(ABILITY_SCORES.CHA) +
          (5 + getModifier(ABILITY_SCORES.CHA)) * (LEVEL - 1),
        max:
          8 +
          getModifier(ABILITY_SCORES.CHA) +
          (5 + getModifier(ABILITY_SCORES.CHA)) * (LEVEL - 1),
        temporary: 0,
        hitDice: {
          flags: [...Array(LEVEL)].fill(false),
          description: "d8",
          typeOfRest: TypeOfRest.LONG,
        },
      },
      contamination: 0,
      exhaustion: 0,
      armorClass: getLeatherArmorClass(getModifier(ABILITY_SCORES.DEX)),
      initiative: ABILITY_SCORES.DEX,
      abilityScores: ABILITY_SCORES,
      savingThrowProficiencyList: SAVING_THROW_PROFICIENCIES_LIST,
      proficiencyBonus: getProficiencyBonus(LEVEL),
      skill: {
        proficiencies: SKILL_PROFICIENCIES,
        expertise: SKILL_EXPERTISE,
      },
      inspiration: false,
      magic: {
        spellSlots: getFullCasterSpellSlots(LEVEL),
        refresh: TypeOfRest.SHORT,
        concentration: false,
        spellSaveDiceCheck:
          8 + getModifier(ABILITY_SCORES.CHA) + getProficiencyBonus(LEVEL),
        spellAttackModifier:
          getModifier(ABILITY_SCORES.CHA) + getProficiencyBonus(LEVEL),
      },
      sectionList: [
        {
          title: "Action",
          used: false,
          subsections: [
            {
              title: "Weapon Attack",
              dice: `d20+${getModifier(ABILITY_SCORES.DEX) + getProficiencyBonus(LEVEL)}`,
              items: [
                {
                  name: "Rapier",
                  dice: `1d8+${getModifier(ABILITY_SCORES.DEX)}`,
                },
                {
                  name: "Dagger",
                  dice: `1d4+${getModifier(ABILITY_SCORES.DEX)}`,
                },
                {
                  name: "Ram",
                  dice: `1d6+${getModifier(ABILITY_SCORES.STR)}`,
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
              title: "Spell casting",
              description: "See spell casting cheat sheet",
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
            {
              title: "Spell casting",
              description: "See spell casting cheat sheet",
            },
          ],
        },
        {
          title: "Movement",
          used: false,
          subsections: [
            {
              title: "Walking 35ft.",
              description: "(7 squares)",
            },
            {
              title: "Mirthful Leaps",
              description: "add d8 to long & high jumps",
            },
          ],
        },
        {
          title: "Features",
          subsections: [
            {
              title: "Magic Resistance",
              description: "Advantage on saving throws against spells",
            },
            {
              title: "Language",
              description: "Common, one other language",
            },
          ],
        },
      ],
    },
  ];

  // --- post creation stuff ---
  applySurvivorPostCreation(defaultCreatureList);
  applyLuckyPostCreation(defaultCreatureList);
  applyBardPostCreation(defaultCreatureList);
  applyDoomsayersPostCreation(defaultCreatureList);
  applyFeyTouchedPostCreation(defaultCreatureList);

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
