import React, { FC } from "react";
import { SwitchStatement } from "./SwitchTypes";
interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
    refs: Array<string> | string;
    statement: SwitchStatement;
    id: string;
    defaultCase?: () => FC;
}
/**
 * Component for a React switch, like in js
 *
 * (Barebones docs, will update soon)
 *
 * Example:
 * ```ts
 * switch (key) {
    case value:
        console.log("Key is value here!")
        break;

    default:
        console.log("No case matches key.")
        break;
}
 * ```
 *
 * @param {Array<string> | string} refs
 * @param {SwitchStatement} statement
 * @param {id} id
 * @param {() => FC} [defaultCase] Optional
 */
declare const Switch: FC<SwitchProps>;
export default Switch;
