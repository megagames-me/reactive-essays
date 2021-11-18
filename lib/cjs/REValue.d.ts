import React, { Component } from "react";
/**
 * Type for properties of `REValue`.
 */
export declare type REValueProps = {
    /**
     * ID for variable. Use this to link your `REValue` to an output, like `REOutput`.
     */
    id: string;
    /**
     * Default value for variable. You can set this so that when you first get onto your page, it shows your default value at first. And then, the user can change it.
     */
    value: number;
    /**
     * The unit. If it is set, it will add an 's' to the end if it has multiple or zero. If it isn't set, it will just be a plain number.
     */
    unit?: string;
    /**
     * Minimum value for the value. The user cannot drag lower than this. If unset, it will default to 0. You can set this to negative infinity by inputting `minvalue={-Infinity}`
     */
    minvalue?: number;
    /**
     * Maximum value for the value. The user cannot drag higher than this. If unset, it will default to Infinity.
     */
    maxvalue?: number;
    scalingrate?: number;
    stylish?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;
declare type REValueState = {
    id: string;
    value: number;
    unit?: string;
    minvalue: number;
    maxvalue: number;
    active: boolean;
    stylish: boolean;
};
/**
 * Component for draggable variable
 *
 * Example without output:
 * ```tsx
 * return (
 *    <div className="app">
 *      I ate <REValue id="cookies" value={3} unit="cookie" minvalue={1} maxvalue={15} /> today.
 *    </div>
 * )
 * ```
 *
 * Example with output:
 * ```tsx
 * // add later
 * ```
 */
export declare class REValue extends Component<REValueProps, REValueState> {
    state: REValueState;
    private ghostEle;
    private befX;
    constructor(props: REValueProps, state: REValueState);
    handleLoad(): void;
    mouseDown(event: any): boolean;
    mouseUp(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    mouseDrag(_event: any): void;
    get actualunit(): string;
    render(): JSX.Element;
}
export {};
