export const getSpellSchoolIconName = (school: string) => {
    if(school.startsWith("Contaminated")) {
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
}

export enum Spell {
    Thaumaturgy = "Thaumaturgy",
    AcidBurn = "Acid Burn",
    AcidSplash = "Acid Splash",
    BacterialBarrage = "Bacterial Barrage",
    Bless = "Bless",
    ChillTouch = "Chill Touch",
    Guidance = "Guidance",
    Light = "Light",
    Mending = "Mending",
    Message = "Message",
    PoisonNeedle = "Poison Needle",
    PoisonSpray = "Poison Spray",
    Resistance = "Resistance",
    ShockingGrasp = "Shocking Grasp",
    SpareTheDying = "Spare the Dying",
    AcidOrb = "Acid Orb",
    Alarm = "Alarm",
    CometShards = "Comet Shards",
    ComprehendLanguages = "Comprehend Languages",
    CorruptedCure = "Corrupted Cure",
    CreateOrDestroyWater = "Create or Destroy Water",
    CureWounds = "Cure Wounds",
    DetectEvilAndGood = "Detect Evil and Good",
    DetectMagic = "Detect Magic",
    DetectPoisonAndDisease = "Detect Poison and Disease",
    Envenom = "Envenom",
    FalseLife = "False Life",
    FindFamiliar = "Find Familiar",
    FeatherFall = "Feather Fall",
    FogCloud = "Fog Cloud",
    Grease = "Grease",
    HealingWord = "Healing Word",
    Identify = "Identify",
    IllusoryScript = "Illusory Script",
    Infect = "Infect",
    InflictWounds = "Inflict Wounds",
    Jump = "Jump",
    PurifyFoodAndDrink = "Purify Food and Drink",
    Sleep = "Sleep",
    StreamOfConsumption = "Stream of Consumption",
    TashaSHideousLaughter = "Tasha's Hideous Laughter",
    TenserSFloatingDisk = "Tenser's Floating Disk",
    ToxicShield = "Toxic Shield",
    UnseenServant = "Unseen Servant",
    Aid = "Aid",
    Biohazard = "Biohazard",
    BlindnessDeafness = "Blindness/Deafness",
    CausticGrip = "Caustic Grip",
    ControlledMutation = "Controlled Mutation",
    EnhanceAbility = "Enhance Ability",
    EnlargeReduce = "Enlarge/Reduce",
    GentleRepose = "Gentle Repose",
    GraspingGhost = "Grasping Ghost",
    HoldPerson = "Hold Person",
    Invigorate = "Invigorate",
    LesserRestoration = "Lesser Restoration",
    MelfSAcidArrow = "Melf's Acid Arrow",
    MistyStep = "Misty Step",
    OcularNecrosis = "Ocular Necrosis",
    ProtectionFromPoison = "Protection from Poison",
    RayOfEnfeeblement = "Ray of Enfeeblement",
    SeeInvisibility = "See Invisibility",
    Silence = "Silence",
    SpiderClimb = "Spider Climb",
    Web = "Web",
    WitherAndBloom = "Wither and Bloom",
}