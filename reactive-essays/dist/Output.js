import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { on, off, AddS, StyliseN } from "./helpers";
const Output = (props) => {
    const [srefs, setSrefs] = React.useState(typeof props.refs == "object" ? props.refs : [props.refs]);
    const [inputvals, setInputvals] = React.useState({});
    function editInputval(key, val) {
        return setInputvals((prevstate) => {
            let kv = {};
            kv[key] = val;
            return {
                ...prevstate,
                ...kv,
            };
        });
    }
    function getValue() {
        if (typeof props.getValue == "function") {
            return props.getValue(inputvals);
        }
        else if (typeof Object.values(inputvals)[0] == "number") {
            return (Number(props.getValue) * Object.values(inputvals)[0]);
        }
        else {
            return Object.values(inputvals)[0];
        }
    }
    function getActualUnit() {
        if (!props.getActualUnit && typeof getValue() == "number") {
            return props.unit ? AddS(props.unit, getValue()) : "";
        }
        else if (typeof getValue() == "number" && props.getActualUnit) {
            return props.unit
                ? props.getActualUnit(getValue(), props.unit)
                : props.getActualUnit(getValue());
        }
        else if (props.getActualUnit) {
            return props.unit
                ? props.getActualUnit(getValue(), props.unit)
                : props.getActualUnit(getValue());
        }
        else {
            return "is " + getValue();
        }
    }
    function getFullText() {
        if (!props.getOutputText && typeof getValue() == "number") {
            if (props.stylish) {
                return (StyliseN(getValue()) +
                    (getActualUnit() === null ? "" : " " + getActualUnit()));
            }
            else {
                return (getValue() +
                    (getActualUnit() === null ? "" : " " + getActualUnit()));
            }
        }
        else if (props.getOutputText) {
            return props.getOutputText(getValue(), getActualUnit());
        }
        else {
            if (props.unit) {
                return props.unit + " " + getActualUnit();
            }
            else {
                return ("[HEY PROGRAMMER! I think you forgot to input a unit for this. The unit will replace the area between these square brackets.] " +
                    getActualUnit());
            }
        }
    }
    function handleValueChange(e) {
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
    const propstoadd = (({ getValue, getOutputText, getActualUnit, stylish, unit, refs, ...o }) => o)(props);
    return (_jsx("span", { ...propstoadd, "data-value": typeof getValue() == "number"
            ? isNaN(getValue())
                ? 0
                : getValue()
            : getValue(), className: "REOutput" + (props.className ? " " + props.className : ""), children: getFullText() }, void 0));
};
Output.defaultProps = {
    stylish: true,
};
export default Output;
