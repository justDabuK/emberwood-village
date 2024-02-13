export type Creature = {
    name: string;
    healthPoints: {
        current: number;
        max: number;
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
    description?: string;
    items?: Item[];
}

export type Item = {
    name: string;
    dice: string;
}