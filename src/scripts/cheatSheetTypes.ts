export type Creature = {
  characterLevel?: CharacterLevel;
  name: string;
  hitPoints: {
    current: number;
    max: number;
    temporary?: number;
    hitDice?: UsagesPerRest;
  };
  armorClass: number;
  initiative?: number;
  contamination: number;
  exhaustion: number;
  magic?: {
    spellSlots: SpellSlots;
    refresh: TypeOfRest;
    concentration: boolean;
    spellSaveDiceCheck: number;
    spellAttackModifier: number;
  };
  abilityScores: AbilityScores;
  savingThrowProficiencyList: (keyof AbilityScores)[];
  skill: {
    proficiencies: Skill[];
    expertise: Skill[];
  };
  proficiencyBonus: number;
  inspiration?: boolean;
  sectionList: Section[];
};

export type SpellSlots = {
  1?: {
    flags: boolean[];
    max: number;
  };
  2?: {
    flags: boolean[];
    max: number;
  };
  3?: {
    flags: boolean[];
    max: number;
  };
  4?: {
    flags: boolean[];
    max: number;
  };
  5?: {
    flags: boolean[];
    max: number;
  };
  6?: {
    flags: boolean[];
    max: number;
  };
  7?: {
    flags: boolean[];
    max: number;
  };
  8?: {
    flags: boolean[];
    max: number;
  };
  9?: {
    flags: boolean[];
    max: number;
  };
};

export type Section = {
  title: string;
  subsections?: Subsection[];
  used?: boolean;
  dice?: string;
  description?: string;
  table?: {
    headers: string[];
    rows: { content: string[]; backgroundColor?: string }[];
  };
};

export type Subsection = {
  title: string;
  dice?: string;
  usages?: UsagesPerRest;
  description?: string;
  items?: Item[];
};

export enum TypeOfRest {
  SHORT = "SR",
  LONG = "LR",
}

export type UsagesPerRest = {
  flags: boolean[];
  description?: string;
  typeOfRest?: TypeOfRest;
};

export type Item = {
  name: string;
  dice: string;
};

export type AbilityScores = {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
};

export const getModifier = (abilityScore: number) => {
  return Math.floor((abilityScore - 10) / 2);
};

export enum Skill {
  Athletics = "Athletics",
  Acrobatics = "Acrobatics",
  SleightOfHand = "Sleight of Hand",
  Stealth = "Stealth",
  Arcana = "Arcana",
  History = "History",
  Investigation = "Investigation",
  Nature = "Nature",
  Religion = "Religion",
  AnimalHandling = "Animal Handling",
  Insight = "Insight",
  Medicine = "Medicine",
  Perception = "Perception",
  Survival = "Survival",
  Deception = "Deception",
  Intimidation = "Intimidation",
  Performance = "Performance",
  Persuasion = "Persuasion",
  // --- tools ---
  ThievesTools = "Thieve's Tools",
}

export type CharacterLevel =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;
