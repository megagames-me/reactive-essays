import React, { Component } from "react";
declare type REOutputModifier = (inputval: number) => number;
export declare type REOutputProps = React.HTMLAttributes<HTMLSpanElement> & {
    var: Array<string> | string;
    unit: string | null;
    getValue: REOutputModifier | number;
};
declare type REOutputState = {
    unit: string | null;
    var: Array<String>;
    inputvalue: number;
};
export declare class REOutput extends Component<REOutputProps, REOutputState> {
    state: REOutputState;
    valueget: REOutputModifier;
    constructor(props: REOutputProps, state: REOutputState);
    get actualunit(): string;
    get getvalue(): number;
    render(): JSX.Element;
}
export {};
