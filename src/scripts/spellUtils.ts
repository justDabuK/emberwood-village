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
  EarthTremor = "Earth Tremor",
  EnhanceAbility = "Enhance Ability",
  EnlargeReduce = "Enlarge/Reduce",
  Envenom = "Envenom",
  FalseLife = "False Life",
  FeatherFall = "Feather Fall",
  FindFamiliar = "Find Familiar",
  FireBolt = "Fire Bolt",
  FogCloud = "Fog Cloud",
  ForcedEvolution = "Forced Evolution",
  GentleRepose = "Gentle Repose",
  GraspingGhost = "Grasping Ghost",
  Grease = "Grease",
  Guidance = "Guidance",
  HealingWord = "Healing Word",
  HoldPerson = "Hold Person",
  HorrificTransformation = "Horrific Transformation",
  Identify = "Identify",
  IllusoryScript = "Illusory Script",
  Infect = "Infect",
  InflictWounds = "Inflict Wounds",
  Invigorate = "Invigorate",
  Jump = "Jump",
  LesserRestoration = "Lesser Restoration",
  Light = "Light",
  MageHand = "Mage Hand",
  MagicMissile = "Magic Missile",
  MelfSAcidArrow = "Melf's Acid Arrow",
  Mending = "Mending",
  Message = "Message",
  MinorIllusion = "MinorIllusion",
  MistyStep = "Misty Step",
  NeutralizingField = "Neutralizing Field",
  OctarineSpray = "Octarine Spray",
  OctarineSword = "Octarine Sword",
  OcularNecrosis = "Ocular Necrosis",
  PoisonNeedle = "Poison Needle",
  PoisonSpray = "Poison Spray",
  ProtectionFromPoison = "Protection from Poison",
  PurgeContamination = "Purge Contamination",
  PurifyFoodAndDrink = "Purify Food and Drink",
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
