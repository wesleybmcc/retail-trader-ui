export interface PivotLevel {
    r4: number;
    r3: number;
    r2: number;
    r1: number;
    pp: number;
    s1: number;
    s2: number;
    s3: number;
    s4: number;
}

export interface PivotSetting {
    symbol: string;
    name: string;
    pivotLevel: PivotLevel;
}

export enum PIVOT_NAME {
    WOODIE = 'Woodie',
    CAMARILLA = 'Camarilla'
}
