import { Component } from "react";
declare type REValueProps = {
    id: string;
    value: number;
    unit: string | null;
    minvalue?: number;
    maxvalue?: number;
};
declare type REValueState = {
    id: string;
    value: number;
    unit: string | null;
    minvalue?: number;
    maxvalue?: number;
    active: boolean;
};
declare class REValue extends Component<REValueProps, REValueState> {
    state: REValueState;
    private ghostEle;
    private befX;
    constructor(props: REValueProps, state: REValueState);
    mouseDown(event: any): boolean;
    mouseUp(): void;
    mouseDrag(_event: any): boolean;
    get actualunit(): string;
    render(): JSX.Element;
}
export { REValue };
