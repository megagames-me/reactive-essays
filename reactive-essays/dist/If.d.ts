import React, { FC } from "react";
interface IfData {
    [index: string]: number;
}
interface IfStatement {
    (data: IfData): boolean;
}
interface IfProps extends React.HTMLAttributes<HTMLDivElement> {
    statement: IfStatement;
    refs: Array<string> | string;
}
/**
 * A component that acts as a JS if statement.
 *
 * Example of if statement:
 * ```ts
 * if (condition) {
    console.log("condition is true!")
}
 * ```
 * For now, there isn't an else feature.
 *
 * @param {IfStatement} statement
 * @param {Array<string> | string} refs
 */
declare const If: FC<IfProps>;
export default If;
