import React, { FC } from "react";
interface OutputModifier {
    (inputval: {
        [index: string]: number;
    }): number;
}
interface OutputCustomText {
    (val: number, unit: string): string;
}
interface OutputCustomUnit {
    (val: number, rawunit?: string): string;
}
interface OutputProps extends React.HTMLAttributes<HTMLSpanElement> {
    refs: Array<string> | string;
    unit?: string;
    getValue: OutputModifier | number;
    getOutputText?: OutputCustomText;
    getActualUnit?: OutputCustomUnit;
    stylish?: boolean;
}
declare const Output: FC<OutputProps>;
export default Output;
