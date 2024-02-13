export type Section = {
    title: string;
    subsections: Subsection[];
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