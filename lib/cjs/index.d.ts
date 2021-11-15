import { Component } from "react";
declare type REValueProps = {
    name: string;
    value: number;
    unit: string | null;
    minvalue?: number;
    maxvalue?: number;
};
declare type REValueState = {
    name: string;
    value: number;
    unit: string | null;
    minvalue?: number;
    maxvalue?: number;
    active: boolean;
};
declare class REValue extends Component<REValueProps, REValueState> {
    state: REValueState;
    private ghostEle;
    constructor(props: REValueProps, state: REValueState);
    mouseDown(event: any): boolean;
    mouseUp(event: any): void;
    mouseDrag(_event: any): void;
    get actualunit(): string;
    render(): JSX.Element;
}
export { REValue };
