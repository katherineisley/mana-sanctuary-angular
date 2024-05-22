
export interface Heal {
    multiplier: number;
    stat: string;
    affect: string;
    type: string;
    requiredStar: number;
    range: number;
    duration: number;
    cooldown: number;
    ticks: number;
    applicationRequirement: number | string;
    comment: string;
    ignore?: number[];
}

export interface Buff {
    module: string,
    type: string,
    affect: number | string,
    value: number,
    requiredStar: number | string,
    range: number | string,
    duration: number | string,
    cooldown: number | string,
    stacks: number,
    applicationRequirement: string,
    comment: string,
    maxBuff: number,
    avgBuff: number,
    originItem: string,
    originSource: string
}

export interface Data {
    slug: string;
    'on-charge': any[];
    resonance: any[];
    skill: any[];
    discharge: any[];
    dodge: any[];
    attack: any[];
    passive: any[];
}

export interface Character {
    slug: string;
    elements: string[];
    resonance: string;
}

export interface Matrix {
    matrixName: string;
    starValue: number;
};

export interface Unit {
    simulacraName: string;
    starValue: number;
    matricesSet: Map<string, Matrix>;
};

export interface BuffSummary {
    [module: string]: {
        [type: string]: number;
    };
}
