import React, { BaseSyntheticEvent, FC } from "react";

import { on, off, AddS, StyliseN } from "./helpers";

// types for custom functions
interface OutputInputVals {
    [index: string]: (number | boolean);
}
interface OutputModifier {
    (inputval: OutputInputVals): number;
}
interface OutputCustomText {
    (val: (number | boolean), unit: string): string;
}
interface OutputCustomUnit {
    (val: (number | boolean), rawunit?: string): string;
}

// types
interface OutputProps extends React.HTMLAttributes<HTMLSpanElement> {
    // the id or ids of inputs that this uses
    refs: Array<string> | string;
    // unit. optional if you want a custom one. dont add s at end
    unit?: string;
    // function to get custom value. can use number as a scalar or a function that returns a number.
    getValue?: OutputModifier | number;
    // function to get output text. returns string. inputs getValue and getActualUnit
    getOutputText?: OutputCustomText;
    // function to get actual unit. returns string. inputs getValue and unit (optional)
    getActualUnit?: OutputCustomUnit;
    // whether commas and decimal points are included
    stylish?: boolean;
}

/**
 * Outputs from an input 
 * 
 * (Barebones docs, will update soon)
 * 
 * @param {Array<string> | string} refs
 * @param {string} [unit] Optional
 * @param {OutputModifier | number} [getValue] Optional (if you want a boolean value)
 * @param {OutputCustomText} [getOutputText] Optional
 * @param {OutputCustomUnit} [getActualUnit] Optional
 * @param {boolean} [stylish=true] Optional = true
 */

const Output: FC<OutputProps> = (props: OutputProps) => {
    const [srefs, setSrefs] = React.useState(
        typeof props.refs == "object" ? props.refs : [props.refs]
    );
    const [inputvals, setInputvals] = React.useState<OutputInputVals>({});

    function editInputval(key: string, val: number): void {
        return setInputvals((prevstate) => {
            let kv = {};
            kv[key] = val;
            return {
                ...prevstate,
                ...kv,
            };
        });
    }

    function getValue(): number | boolean {
        if (typeof props.getValue == "function") {
            return props.getValue(inputvals);
        } else if (typeof Object.values(inputvals)[0] == "number") {
            return (
                Number(props.getValue) * (Object.values(inputvals)[0] as number)
            );
        } else {
            return Object.values(inputvals)[0];
        }
    }

    function getActualUnit(): string {
        if (!props.getActualUnit && typeof getValue() == "number") {
            return props.unit ? AddS(props.unit, getValue() as number) : "";
        } else if (typeof getValue() == "number" && props.getActualUnit) {
            return props.unit
                ? props.getActualUnit(getValue() as number, props.unit)
                : props.getActualUnit(getValue() as number);
        } else if (props.getActualUnit) {
            return props.unit
                ? props.getActualUnit(getValue() as boolean, props.unit)
                : props.getActualUnit(getValue() as boolean);
        } else {
            return "is " + (getValue() as boolean);
        }
    }

    function getFullText(): string {
        if (!props.getOutputText && typeof getValue() == "number") {
            if (props.stylish) {
                return (
                    StyliseN(getValue() as number) +
                    (getActualUnit() === null ? "" : " " + getActualUnit())
                );
            } else {
                return (
                    (getValue() as number) +
                    (getActualUnit() === null ? "" : " " + getActualUnit())
                );
            }
        } else if (props.getOutputText) {
            return props.getOutputText(getValue(), getActualUnit());
        } else {
            if (props.unit) {
                return props.unit + " " + getActualUnit();
            } else {
                return (
                    "[HEY PROGRAMMER! I think you forgot to input a unit for this. The unit will replace the area between these square brackets.] " +
                    getActualUnit()
                );
            }
        }
    }

    function handleValueChange(e: any) {
        return editInputval(e.detail.id, e.detail.val);
    }

    React.useEffect(() => {
        for (const val of srefs) {
            if (document.querySelector("#" + val)) {
                editInputval(val, 0);
                on(`${val}:change`, handleValueChange);
            }
        }

        return function cleanup() {
            for (const val of srefs) {
                if (document.querySelector("#" + val)) {
                    off(`${val}:change`, handleValueChange);
                }
            }
        };
    }, []);

    const propstoadd = (({
        getValue,
        getOutputText,
        getActualUnit,
        stylish,
        unit,
        refs,
        ...o
    }) => o)(props);

    return (
        <span
            {...propstoadd}
            data-value={
                typeof getValue() == "number"
                    ? isNaN(getValue() as number)
                        ? 0
                        : getValue()
                    : (getValue() as boolean)
            }
            className={
                "REOutput" + (props.className ? " " + props.className : "")
            }
        >
            {getFullText()}
        </span>
    );
};

Output.defaultProps = {
    stylish: true,
};

export default Output;
