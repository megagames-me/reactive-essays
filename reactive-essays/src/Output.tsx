import React, { BaseSyntheticEvent, FC } from "react";

import { on, off, AddS, StyliseN } from "./helpers";

// types for custom functions
interface OutputInputVals {[index: string]: number};
interface OutputModifier {(inputval: {[index: string]: number}): number};
interface OutputCustomText {(val: number, unit: string): string};
interface OutputCustomUnit {(val: number, rawunit?: string): string};

// types
interface OutputProps extends React.HTMLAttributes<HTMLSpanElement> {
	// the id or ids of inputs that this uses
	refs: Array<string> | string;
	// unit. optional if you want a custom one. dont add s at end
	unit?: string;
	// function to get custom value. can use number as a scalar or a function that returns a number.
	getValue: OutputModifier | number; 
	// function to get output text. returns string. inputs getValue and getActualUnit
	getOutputText?: OutputCustomText;
	// function to get actual unit. returns string. inputs getValue and unit (optional)
	getActualUnit?: OutputCustomUnit;
	// whether commas and decimal points are included
	stylish?: boolean;
};

const Output: FC<OutputProps> = (props: OutputProps) => {
	

	const [srefs, setSrefs] = React.useState(typeof props.refs == "object" ? props.refs : [props.refs]);
	const [inputvals, setInputvals] = React.useState<OutputInputVals>({});

	function editInputval(key: string, val: number): void {
		return setInputvals((prevstate) => {
			let kv = {};
			kv[key] = val;
			return {
				...prevstate,
				...kv
			}
		})
	}

	function getValue(): number {

		if (typeof props.getValue == "function") {
			return props.getValue(inputvals);
		} else {
			return Number(props.getValue) * Object.values(inputvals)[0]
		}
	}
	
	function getActualUnit(): string {
		if (!props.getActualUnit) {
			return props.unit ? AddS(props.unit, getValue()) : "";
		} else {
			return props.unit ? props.getActualUnit(getValue(), props.unit) : props.getActualUnit(getValue());
		}
	}

	function getFullText(): string {
		if (!props.getOutputText) {
			if (props.stylish) {
				return StyliseN(getValue()) + (getActualUnit() === null ? "" : " " + getActualUnit());
			} else {
				return getValue() + (getActualUnit() === null ? "" : " " + getActualUnit());
			}
		} else {
			return props.getOutputText(getValue(), getActualUnit())
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
        }
    }, []);

	const propstoadd = (({ getValue, getOutputText, getActualUnit, stylish, unit, refs, ...o }) => o)(props);
	
	return <span {...propstoadd} 
		data-value={isNaN(getValue())? 0 : getValue()} 
		className={"REOutput" + 
			(props.className ?
			" " + props.className 
			: "")}>
		{getFullText()}
	</span>;
}

Output.defaultProps = {
	stylish: true
}

export default Output;