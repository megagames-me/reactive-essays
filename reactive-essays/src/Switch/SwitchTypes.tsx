interface SwitchData {
    [index: string]: number | boolean;
}

interface SwitchStatement {
    (data: SwitchData): any;
}

interface SwitchItemStatement {
    (val: any, data?: SwitchData): boolean;
}

export { SwitchData, SwitchStatement, SwitchItemStatement };
