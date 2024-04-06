export type Creature = {
    name: string;
    hitPoints: {
        current: number;
        max: number;
        temporary?: number;
        hitDice?: UsagesPerRest;
    }
    armorClass: number;
    contamination: number;
    exhaustion: number;
    magic?: {
        spellSlots: SpellSlots;
        refresh: TypeOfRest;
        concentration: boolean;
    }
    inspiration?: boolean;
    sectionList: Section[];
}

export type SpellSlots = {
    1?: {
        flags: boolean[];
        max: number;
    },
    2?: {
        flags: boolean[];
        max: number;
    },
    3?: {
        flags: boolean[];
        max: number;
    },
    4?: {
        flags: boolean[];
        max: number;
    },
    5?: {
        flags: boolean[];
        max: number;
    },
    6?: {
        flags: boolean[];
        max: number;
    },
    7?: {
        flags: boolean[];
        max: number;
    },
    8?: {
        flags: boolean[];
        max: number;
    },
    9?: {
        flags: boolean[];
        max: number;
    },
};

export type Section = {
    title: string;
    subsections: Subsection[];
    used?: boolean;
}

export type Subsection = {
    title: string;
    dice?: string;
    usages?: UsagesPerRest;
    description?: string;
    items?: Item[];
}

export enum TypeOfRest {
    SHORT = "SR",
    LONG = "LR"

}

export type UsagesPerRest = {
    flags: boolean[];
    description?: string;
    typeOfRest: TypeOfRest;
}

export type Item = {
    name: string;
    dice: string;
}

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
    Athletics = 'Athletics',
    Acrobatics = 'Acrobatics',
    SleightOfHand = 'Sleight of Hand',
    Stealth = 'Stealth',
    ThievesTools = "Thieve's Tools",
    Arcana = 'Arcana',
    History = 'History',
    Investigation = 'Investigation',
    Nature = 'Nature',
    Religion = 'Religion',
    AnimalHandling = 'Animal Handling',
    Insight = 'Insight',
    Medicine = 'Medicine',
    Perception = 'Perception',
    Survival = 'Survival',
    Deception = 'Deception',
    Intimidation = 'Intimidation',
    Performance = 'Performance',
    Persuasion = 'Persuasion'
}