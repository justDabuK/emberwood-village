import { getFullCasterSpellSlots, Spell } from "../../../scripts/spellUtils.ts";
import {
  type AbilityScores,
  type Creature,
  getModifier,
  Skill,
  TypeOfRest,
} from "../../../scripts/cheatSheetTypes.ts";
import {
  getScaleMailArmorClass,
  getShieldArmorClass,
} from "../../../scripts/armorClassUtils.ts";
import { useStorage } from "@vueuse/core";
import { getProficiencyBonus } from "../../../scripts/getProficiencyBonus.ts";
import { useFeyTouched } from "../../../scripts/feats/feyTouched.ts";
import { useWarCaster } from "../../../scripts/feats/warCaster.ts";
import { useDevotedMissionary } from "../../../scripts/backgrounds/useDevotedMissionary.ts";
import { useTrickeryDomain } from "../../../scripts/classes/cleric/useTrickeryDomain.ts";

export const useBorinCreatureList = () => {
  const LEVEL = 5;

  const preparedSpellNameList = [
    // --- Cantrips:  4 ---
    Spell.Guidance,
    Spell.SacredFlame,
    Spell.SpareTheDying,
    Spell.TollTheDead,
    // --- known spells : 9 ---
    Spell.Command,
    Spell.DetectEvilAndGood,
    Spell.GuidingBolt,
    Spell.Sanctuary,
    Spell.ShieldOfFaith,
    Spell.Aid,
    Spell.PrayerOfHealing,
    Spell.SpiritualWeapon,
    Spell.SpiritGuardians,
  ];

  const racialBonusPlus1 = 1;
  const racialBonusPlus2 = 2;

  const ABILITY_SCORES: AbilityScores = {
    STR: 12,
    DEX: 13 + racialBonusPlus1,
    CON: 14,
    INT: 10,
    WIS: 15 + racialBonusPlus2,
    CHA: 8,
  };

  const SAVING_THROW_PROFICIENCIES_LIST: (keyof AbilityScores)[] = [
    "WIS",
    "CHA",
  ];

  const SKILL_PROFICIENCIES = [
    Skill.Persuasion, // cleric
    Skill.Insight, // cleric
    // todo: add tools
  ];

  const SKILL_EXPERTISE: Skill[] = [];

  // --- pre creation stuff ---
  const {
    preCreatureCreation: applyDevotedMissionaryPreCreation,
    postCreatureCreation: applyDevotedMissionaryPostCreation,
  } = useDevotedMissionary(Skill.Religion, Skill.History); // background
  const {
    preCreatureCreation: applyFeyTouchedPreCreation,
    postCreatureCreation: applyFeyTouchedPostCreation,
  } = useFeyTouched("WIS", Spell.DissonantWhispers); // beginner feat
  const {
    preCreatureCreation: applyTrickeryDomainPreCreation,
    postCreatureCreation: applyTrickeryDomainPostCreation,
  } = useTrickeryDomain(LEVEL); // divine domain 2nd level
  const { postCreatureCreation: applyWarCasterPostCreation } = useWarCaster(); // 4th level

  applyDevotedMissionaryPreCreation(SKILL_PROFICIENCIES);
  applyFeyTouchedPreCreation(ABILITY_SCORES, preparedSpellNameList);
  applyTrickeryDomainPreCreation(preparedSpellNameList);

  const dwarvenToughnessHitPointsIncrease = 1;
  const defaultCreatureList: Creature[] = [
    {
      name: "Borin",
      characterLevel: LEVEL,
      hitPoints: {
        current:
          8 +
          getModifier(ABILITY_SCORES.CON) +
          (5 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1) +
          dwarvenToughnessHitPointsIncrease * LEVEL,
        max:
          8 +
          getModifier(ABILITY_SCORES.CON) +
          (5 + getModifier(ABILITY_SCORES.CON)) * (LEVEL - 1) +
          dwarvenToughnessHitPointsIncrease * LEVEL,
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
        getScaleMailArmorClass(getModifier(ABILITY_SCORES.DEX)),
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
              title: "Weapon Attack STR",
              dice: `d20 + ${getModifier(ABILITY_SCORES.STR) + getProficiencyBonus(LEVEL)}`,
              items: [
                {
                  name: "Warhammer",
                  dice: `1d8+${getModifier(ABILITY_SCORES.STR)}`,
                },
              ],
            },
            {
              title: "Weapon Attack DEX",
              dice: `d20 + ${getModifier(ABILITY_SCORES.DEX) + getProficiencyBonus(LEVEL)}`,
              items: [
                {
                  name: "Crossbow light (80/320ft.)",
                  dice: `1d8+${getModifier(ABILITY_SCORES.DEX)}`,
                },
              ],
            },
            {
              title: "Spell casting",
              description: "See spell casting cheat sheet",
            },
            {
              title: "Channel Divinity",
              description: "See channel divinity",
              usages: {
                flags: [...Array(1)].fill(false),
                typeOfRest: TypeOfRest.SHORT,
              },
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
          title: "Channel Divinity",
          used: false,
          subsections: [
            {
              title: "Turn Undead",
              description:
                "undead withing 30 ft. mus make a WIS saving throw or are 'turned' for 1 minute(need to dash away from you & can't take reactions)",
            },
          ],
        },
        {
          title: "Movement",
          used: false,
          subsections: [
            {
              title: "Walking 25ft.",
              description: "(5 squares)",
            },
          ],
        },
        {
          title: "Features",
          subsections: [
            {
              title: "Darkvision",
              description: "60ft.",
            },
            {
              title: "Dwarven Resilience",
              description:
                "Advantage on saving throws against poison & resistance against poison damage",
            },
            {
              title: "Stonecunning",
              description: "Expertise on History checks related to stonework",
            },
          ],
        },
      ],
    },
  ];

  // --- post creation stuff ---
  applyDevotedMissionaryPostCreation(defaultCreatureList);
  applyFeyTouchedPostCreation(defaultCreatureList);
  applyTrickeryDomainPostCreation(defaultCreatureList);
  applyWarCasterPostCreation(defaultCreatureList);

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
      "- a warhammer\n" +
      "- scale mail (AC 14 + DEX (max 2))\n" +
      "- light crossbow and 20 bolts\n" +
      "- a backpack\n" +
      "- a blanket\n" +
      "- 10 candles\n" +
      "- a tinderbox\n" +
      "- an alms box\n" +
      "- 2 blocks of incense\n" +
      "- a censer\n" +
      "- vestments\n" +
      "- 2 days of rations\n" +
      "- a waterskin\n" +
      "- shield (AC +2)\n" +
      "- holy symbol\n" +
      "- a set of pale robes\n" +
      "- a small chip of delerium encased in glass\n" +
      "- walking stick\n" +
      "- an amulet with a symbol of your chosen god\n" +
      "- small book of religious text\n",
  );

  return {
    creatureList,
    preparedSpellNameList,
    notesStorage,
    resetToDefault,
  };
};
