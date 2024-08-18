import { getFullCasterSpellSlots, Spell } from "../../../scripts/spellUtils.ts";
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../../scripts/cheatSheetTypes.ts";
import {
  getLeatherArmorClass,
  getShieldArmorClass,
} from "../../../scripts/armorClassUtils.ts";
import { useStorage } from "@vueuse/core";
import { getProficiencyBonus } from "../../../scripts/getProficiencyBonus.ts";
import { useResilient } from "../../../scripts/feats/resilient.ts";
import { useAbilityScoreImprovement } from "../../../scripts/feats/abilityScoreImprovement.ts";
import { useFeyTouched } from "../../../scripts/feats/feyTouched.ts";
import { useCircleOfContamination } from "../../../scripts/classes/druid/useCircleOfContamination.ts";
import { useMageborn } from "../../../scripts/backgrounds/useMageborn.ts";

export const useAshlinCreatureList = () => {
  const LEVEL = 4;

  const preparedSpellNameList = [
    // --- Cantrips:  3 ---
    Spell.Guidance,
    Spell.MoldEarth,
    Spell.Druidcraft,
    // --- known spells : 8 ---
    Spell.HealingWord,
    Spell.SpeakWithAnimals,
    Spell.CharmPerson,
    Spell.Entangle,
    Spell.Thunderwave,
    Spell.Moonbeam,
    Spell.WitherAndBloom,
    Spell.HeatMetal,
  ];

  const racialBonusPlus1_1 = 1;
  const racialBonusPlus1_2 = 1;

  const ABILITY_SCORES: AbilityScores = {
    STR: 8,
    DEX: 13,
    CON: 14 + racialBonusPlus1_1,
    INT: 12,
    WIS: 15 + racialBonusPlus1_2,
    CHA: 10,
  };

  const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = [
    "INT",
    "WIS",
  ];

  const SKILL_PROFICIENCIES = [
    Skill.Medicine, // human
    Skill.Nature, // druid
    Skill.AnimalHandling, // druid
  ];

  const SKILL_EXPERTISE: Skill[] = [];

  // --- pre creation stuff ---
  const {
    preCreatureCreation: applyMagebornPreCreation,
    postCreatureCreation: applyMagebornPostCreation,
  } = useMageborn(Skill.Arcana, Skill.Perception); // background
  const { preCreatureCreation: applyResilientCon } = useResilient("CON"); // human feat
  const {
    preCreatureCreation: applyFeyTouchedPreCreation,
    postCreatureCreation: applyFeyTouchedPostCreation,
  } = useFeyTouched("WIS", Spell.SilveryBarbs); // beginner feat
  const {
    preCreatureCreation: applyCirclePreCreation,
    postCreatureCreation: applyCirclePostCreation,
  } = useCircleOfContamination(LEVEL); // subclass
  const { preCreatureCreation: applyASI } = useAbilityScoreImprovement(
    "DEX",
    "WIS",
  ); // 4th level

  applyResilientCon(ABILITY_SCORES, SAVING_THROW_PROFICIENCIES_LIST);
  applyFeyTouchedPreCreation(ABILITY_SCORES);
  applyMagebornPreCreation(SKILL_PROFICIENCIES);
  applyCirclePreCreation(preparedSpellNameList);
  applyASI(ABILITY_SCORES);

  const defaultCreatureList: Creature[] = [
    {
      name: "Ashlin",
      characterLevel: LEVEL,
      hitPoints: {
        current:
          8 +
          getModifier(ABILITY_SCORES.CON) +
          (5 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1),
        max:
          8 +
          getModifier(ABILITY_SCORES.CON) +
          (5 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1),
        temporary: 0,
        hitDice: {
          flags: [...Array(LEVEL)].fill(false),
          description: "d8",
          typeOfRest: TypeOfRest.LONG,
        },
      },
      contamination: 0,
      exhaustion: 0,
      armorClass: getShieldArmorClass(
        getLeatherArmorClass(getModifier(ABILITY_SCORES.DEX)),
      ),
      initiative: getModifier(ABILITY_SCORES.DEX),
      abilityScores: ABILITY_SCORES,
      savingThrowProficiencyList: SAVING_THROW_PROFICIENCIES_LIST,
      skill: {
        proficiencies: SKILL_PROFICIENCIES,
        expertise: SKILL_EXPERTISE,
      },
      proficiencyBonus: getProficiencyBonus(LEVEL),
      inspiration: false,
      magic: {
        spellSlots: getFullCasterSpellSlots(LEVEL),
        refresh: TypeOfRest.LONG,
        concentration: false,
        spellSaveDiceCheck:
          8 + getModifier(ABILITY_SCORES.WIS) + getProficiencyBonus(LEVEL),
        spellAttackModifier:
          getModifier(ABILITY_SCORES.WIS) + getProficiencyBonus(LEVEL),
      },
      sectionList: [
        {
          title: "Action",
          used: false,
          subsections: [
            {
              title: "Weapon Attack",
              dice: `d20+${getModifier(Math.max(ABILITY_SCORES.STR, ABILITY_SCORES.DEX)) + getProficiencyBonus(LEVEL)}`,
              items: [
                {
                  name: "Scimitar",
                  dice: `1d6+${getModifier(Math.max(ABILITY_SCORES.STR, ABILITY_SCORES.DEX))}`,
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
            {
              title: "Wild shape",
              description: `Transform into a beast of CR 1/2 or lower that can not fly. Stay in shape for ${Math.floor(LEVEL / 2)} hour(s)`,
              usages: {
                flags: [...Array(2)].fill(false),
                typeOfRest: TypeOfRest.SHORT,
              },
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
              title: "Walking 30ft.",
              description: "(6 squares)",
            },
          ],
        },
        {
          title: "Features",
          subsections: [],
        },
      ],
    },
  ];

  // --- post creation stuff ---
  applyMagebornPostCreation(defaultCreatureList);
  applyFeyTouchedPostCreation(defaultCreatureList, preparedSpellNameList);
  applyCirclePostCreation(defaultCreatureList);

  const creatureList = useStorage<Creature[]>(
    `${defaultCreatureList[0].name}-creature-list`,
    defaultCreatureList,
  );

  const resetToDefault = () => {
    creatureList.value = defaultCreatureList;
  };
  const notesStorage = useStorage<string>(
    `${defaultCreatureList[0].name}-notes`,
    "Equipment: \n" +
      "\n" +
      "- shield\n" +
      "- scimitar\n" +
      "- leather armor\n" +
      "- backpack\n" +
      "- bedroll\n" +
      "- mess kit\n" +
      "- tinderbox\n" +
      "- 10 torches\n" +
      "- 10 days of rations\n" +
      "- waterskin\n" +
      "- 50 ft. of hempen rope\n" +
      "- druidic focus\n" +
      "- a gnarled wand made of wood\n" +
      "- duster jacket\n" +
      "- satchel for material components and potions\n" +
      "- amulet or other trinket of importance to me \n",
  );

  return {
    creatureList,
    preparedSpellNameList,
    notesStorage,
    resetToDefault,
  };
};
