export type Creature = {
    name: string;
    healthPoints: {
        current: number;
        max: number;
        temporary?: number;
        hitDice?: {
            flags: boolean[];
            dice: string;
        }
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
    usages?: Usages;
    description?: string;
    items?: Item[];
}

export enum TypeOfRest {
    SHORT = "SR",
    LONG = "LR"

}

export type Usages = {
    flags: boolean[];
    typeOfRest: TypeOfRest;
}

export type Item = {
    name: string;
    dice: string;
}