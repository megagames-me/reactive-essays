import React, { Component } from "react";
declare type REOutputModifier = (inputval: number) => number;
declare type REOutputCustomText = (val: number, unit: string) => string;
declare type REOutputCustomUnit = (val: number, rawunit?: string) => string;
export declare type REOutputProps = React.HTMLAttributes<HTMLSpanElement> & {
    var: Array<string> | string;
    unit?: string;
    getvalue: REOutputModifier | number;
    getoutputtext?: REOutputCustomText;
    getactualunit?: REOutputCustomUnit;
    stylish?: boolean;
};
declare type REOutputState = {
    unit?: string;
    var: Array<String>;
    inputvalue: number;
    stylish: boolean;
};
export declare class REOutput extends Component<REOutputProps, REOutputState> {
    state: REOutputState;
    valueget: REOutputModifier;
    constructor(props: REOutputProps, state: REOutputState);
    componentDidMount(): void;
    get actualunit(): string;
    get getvalue(): number;
    get text(): string;
    render(): JSX.Element;
}
export {};
