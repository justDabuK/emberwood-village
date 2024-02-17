export type Creature = {
    name: string;
    hitPoints: {
        current: number;
        max: number;
        temporary?: number;
        hitDice?: UsagesPerRest;
    }
    armorClass: number;
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