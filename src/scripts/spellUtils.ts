import type { SpellSlots } from "./cheatSheetTypes.ts";

export const getLevelString = (spellLevel: number | string) => {
  switch (spellLevel) {
    case "0":
    case 0:
      return "Cantrip";
    case "1":
    case 1:
      return "1st level";
    case "2":
    case 2:
      return "2nd level";
    case "3":
    case 3:
      return "3rd level";
    default:
      return `${spellLevel}th level`;
  }
};

export const getSpellSchoolIconName = (school: string) => {
  if (school.startsWith("Contaminated")) {
    return "deliriumCrystal.png";
  }

  switch (school) {
    case "Abjuration":
      return "abjuration.svg";
    case "Conjuration":
      return "conjuration.svg";
    case "Divination":
      return "divination.svg";
    case "Enchantment":
      return "enchantment.svg";
    case "Evocation":
      return "evocation.svg";
    case "Illusion":
      return "illusion.svg";
    case "Necromancy":
      return "necromancy.svg";
    case "Transmutation":
      return "transmutation.svg";
    default:
      return "";
  }
};

export enum Spell {
  AcidBurn = "Acid Burn",
  AcidOrb = "Acid Orb",
  AcidSplash = "Acid Splash",
  Aid = "Aid",
  Alarm = "Alarm",
  BacterialBarrage = "Bacterial Barrage",
  BanishToTheSpaceBetweenWorlds = "Banish to the Space Between Worlds",
  Biohazard = "Biohazard",
  Bless = "Bless",
  BlindnessDeafness = "Blindness/Deafness",
  BoomingBlade = "Booming Blade",
  BurningHands = "Burning Hands",
  CausticGrip = "Caustic Grip",
  ChillTouch = "Chill Touch",
  CometShards = "Comet Shards",
  ComprehendLanguages = "Comprehend Languages",
  ConjureTheDeepHaze = "Conjure the Deep Haze",
  ContaminatedHands = "Contaminated Hands",
  ContaminatedPower = "Contaminated Power",
  ContaminationImmunity = "Contamination Immunity",
  ControlledMutation = "Controlled Mutation",
  CorruptedCure = "Corrupted Cure",
  CreateOrDestroyWater = "Create or Destroy Water",
  CureWounds = "Cure Wounds",
  DeliriumBlast = "Delirium Blast",
  DelitiumMeteorSwarm = "Delirium Meteor Swarm",
  DeliriumOrb = "Delirium Orb",
  DetectEvilAndGood = "Detect Evil and Good",
  DetectMagic = "Detect Magic",
  DetectPoisonAndDisease = "Detect Poison and Disease",
  Druidcraft = "Druidcraft",
  EarthTremor = "Earth Tremor",
  EnhanceAbility = "Enhance Ability",
  EnlargeReduce = "Enlarge/Reduce",
  Entangle = "Entangle",
  Envenom = "Envenom",
  FaerieFire = "Faerie Fire",
  FalseLife = "False Life",
  FeatherFall = "Feather Fall",
  FindFamiliar = "Find Familiar",
  FireBolt = "Fire Bolt",
  FogCloud = "Fog Cloud",
  ForcedEvolution = "Forced Evolution",
  GentleRepose = "Gentle Repose",
  GraspingGhost = "Grasping Ghost",
  Grease = "Grease",
  GreenFlameBlade = "Green-Flame Blade",
  Guidance = "Guidance",
  HealingWord = "Healing Word",
  HellishRebuke = "Hellish Rebuke",
  HoldPerson = "Hold Person",
  HorrificTransformation = "Horrific Transformation",
  Identify = "Identify",
  IllusoryScript = "Illusory Script",
  Infect = "Infect",
  InflictWounds = "Inflict Wounds",
  Invigorate = "Invigorate",
  Invisibility = "Invisibility",
  Jump = "Jump",
  LesserRestoration = "Lesser Restoration",
  Light = "Light",
  MageHand = "Mage Hand",
  MagicMissile = "Magic Missile",
  MelfSAcidArrow = "Melf's Acid Arrow",
  Mending = "Mending",
  Message = "Message",
  MinorIllusion = "Minor Illusion",
  MistyStep = "Misty Step",
  Moonbeam = "Moonbeam",
  NeutralizingField = "Neutralizing Field",
  OctarineSpray = "Octarine Spray",
  OctarineSword = "Octarine Sword",
  OcularNecrosis = "Ocular Necrosis",
  PoisonNeedle = "Poison Needle",
  PoisonSpray = "Poison Spray",
  ProtectionFromPoison = "Protection from Poison",
  PurgeContamination = "Purge Contamination",
  PurifyFoodAndDrink = "Purify Food and Drink",
  Pyrotechnics = "Pyrotechnics",
  RayOfContamination = "Ray of Contamination",
  RayOfEnfeeblement = "Ray of Enfeeblement",
  RayOfFrost = "Ray of Frost",
  Resistance = "Resistance",
  RideTheRifts = "Ride the Rifts",
  SacramentOfTheFallingFire = "Sacrament of the Falling Fire",
  ScorchingRay = "Scorching Ray",
  SeeInvisibility = "See Invisibility",
  Shield = "Shield",
  ShockingGrasp = "Shocking Grasp",
  Silence = "Silence",
  SilveryBarbs = "Silvery Barbs",
  SiphonContamination = "Siphon Contamination",
  SiphonTime = "Siphon Time",
  Sleep = "Sleep",
  SpareTheDying = "Spare the Dying",
  SpiderClimb = "Spider Climb",
  StormOfContamination = "Storm of Contamination",
  StreamOfConsumption = "Stream of Consumption",
  SummonDeliriumDraconicSpirit = "Summon Delirium Draconic Spirit",
  SummonDeliriumElemental = "Summon Delirium Elemental",
  TashaSHideousLaughter = "Tasha's Hideous Laughter",
  TashaSCausticBrew = "Tasha's Caustic Brew",
  TenserSFloatingDisk = "Tenser's Floating Disk",
  Thaumaturgy = "Thaumaturgy",
  ThornWhip = "Thorn Whip",
  Thunderwave = "Thunderwave",
  ToxicShield = "Toxic Shield",
  UnbindGravity = "Unbind Gravity",
  UnseenServant = "Unseen Servant",
  VanishToTheSpaceBetweenWorlds = "Vanish to the Space Between Worlds",
  WarpBolt = "Warp Bolt",
  WeaveTheElderSign = "Weave the Elder Sign",
  Web = "Web",
  WitherAndBloom = "Wither and Bloom",
}

export enum SpellSchool {
  Abjuration = "Abjuration",
  Conjuration = "Conjuration",
  Divination = "Divination",
  Enchantment = "Enchantment",
  Evocation = "Evocation",
  Illusion = "Illusion",
  Necromancy = "Necromancy",
  Transmutation = "Transmutation",
  ContaminatedAbjuration = "Contaminated Abjuration",
  ContaminatedConjuration = "Contaminated Conjuration",
  ContaminatedDivination = "Contaminated Divination",
  ContaminatedEnchantment = "Contaminated Enchantment",
  ContaminatedEvocation = "Contaminated Evocation",
  ContaminatedIllusion = "Contaminated Illusion",
  ContaminatedNecromancy = "Contaminated Necromancy",
  ContaminatedTransmutation = "Contaminated Transmutation",
}

export const getFullCasterSpellSlots = (level: number): SpellSlots => {
  switch (level) {
    case 1:
      return convertToSpellSlots([2]);
    case 2:
      return convertToSpellSlots([3]);
    case 3:
      return convertToSpellSlots([4, 2]);
    case 4:
      return convertToSpellSlots([4, 3]);
    case 5:
      return convertToSpellSlots([4, 3, 2]);
    case 6:
      return convertToSpellSlots([4, 3, 3]);
    case 7:
      return convertToSpellSlots([4, 3, 3, 1]);
    case 8:
      return convertToSpellSlots([4, 3, 3, 2]);
    case 9:
      return convertToSpellSlots([4, 3, 3, 3, 1]);
    case 10:
      return convertToSpellSlots([4, 3, 3, 3, 2]);
    case 11:
    case 12:
      return convertToSpellSlots([4, 3, 3, 3, 2, 1]);
    case 13:
    case 14:
      return convertToSpellSlots([4, 3, 3, 3, 2, 1, 1]);
    case 15:
    case 16:
      return convertToSpellSlots([4, 3, 3, 3, 2, 1, 1, 1]);
    case 17:
      return convertToSpellSlots([4, 3, 3, 3, 2, 1, 1, 1, 1]);
    case 18:
      return convertToSpellSlots([4, 3, 3, 3, 3, 1, 1, 1, 1]);
    case 19:
      return convertToSpellSlots([4, 3, 3, 3, 3, 2, 1, 1, 1]);
    case 20:
      return convertToSpellSlots([4, 3, 3, 3, 3, 2, 2, 1, 1]);
    default:
      throw new Error(`Level ${level} out of bounds`);
  }
};

type SpellLevel = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

const toSpellLevel = (number: number): SpellLevel => {
  if (number < 1) {
    return "1";
  }
  if (number > 9) {
    return "9";
  }
  return `${number}` as SpellLevel;
};

const convertToSpellSlots = (slotLevelList: number[]): SpellSlots => {
  const spellSlots: SpellSlots = {};
  slotLevelList.forEach(
    (numberOfSlots, index) =>
      (spellSlots[toSpellLevel(index + 1)] = {
        flags: [...Array(numberOfSlots)].fill(false),
        max: numberOfSlots,
      }),
  );
  return spellSlots;
};

export const getEldritchKnightSpellSlots = (level: number): SpellSlots => {
  switch (level) {
    case 1:
      return convertToSpellSlots([]);
    case 2:
      return convertToSpellSlots([]);
    case 3:
      return convertToSpellSlots([2]);
    case 4:
    case 5:
    case 6:
      return convertToSpellSlots([3]);
    case 7:
    case 8:
    case 9:
      return convertToSpellSlots([4, 2]);
    case 10:
    case 11:
    case 12:
      return convertToSpellSlots([4, 3]);
    case 13:
    case 14:
    case 15:
      return convertToSpellSlots([4, 3, 2]);
    case 16:
    case 17:
    case 18:
      return convertToSpellSlots([4, 3, 3]);
    case 19:
    case 20:
      return convertToSpellSlots([4, 3, 3, 1]);
    default:
      throw new Error(`Level ${level} out of bounds`);
  }
};
