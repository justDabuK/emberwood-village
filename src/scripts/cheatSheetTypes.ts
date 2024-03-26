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
    sectionList: Section[];
}

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