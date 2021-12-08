import React, { FC } from "react";
interface OutputInputVals {
    [index: string]: number | boolean;
}
interface OutputModifier {
    (inputval: OutputInputVals): number;
}
interface OutputCustomText {
    (val: number | boolean, unit: string): string;
}
interface OutputCustomUnit {
    (val: number | boolean, rawunit?: string): string;
}
interface OutputProps extends React.HTMLAttributes<HTMLSpanElement> {
    refs: Array<string> | string;
    unit?: string;
    getValue?: OutputModifier | number;
    getOutputText?: OutputCustomText;
    getActualUnit?: OutputCustomUnit;
    stylish?: boolean;
}
declare const Output: FC<OutputProps>;
export default Output;
