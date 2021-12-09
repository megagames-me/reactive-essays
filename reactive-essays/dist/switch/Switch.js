import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { on, off, trigger } from "../helpers";
function checkLen(data) {
    let num = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].style.display !== "none") {
            num++;
        }
    }
    return num;
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
const Switch = (props) => {
    const [args, setArgs] = useState(typeof props.refs == "object" ? props.refs : [props.refs]);
    const [defaultNeed, setDefaultNeed] = React.useState(true);
    function handleValChange(e) {
        // Create input data
        const input = {};
        // Fill input object with data from refs
        for (const arg of args) {
            input[arg] = Number(document.querySelector("#" + arg)?.dataset
                .value);
        }
        trigger(props.id + ":switch", {
            val: props.statement(input),
            input,
            updatedBy: e.target,
        });
        if (props.defaultCase) {
            if (checkLen(document.querySelector(`#${props.id}-children`).children) == 0) {
                if (checkLen(document.querySelector(`#${props.id}`).children) == 1) {
                    trigger(props.id + ":switchdefault", {
                        active: true,
                    });
                }
            }
            else {
                if (checkLen(document.querySelector(`#${props.id}`).children) == 2) {
                    trigger(props.id + ":switchdefault", {
                        active: false,
                    });
                }
            }
        }
    }
    useEffect(() => {
        for (const arg of typeof props.refs == "string"
            ? [props.refs]
            : props.refs) {
            if (document.querySelector("#" + arg)) {
                on(arg + ":change", handleValChange);
            }
        }
        return function cleanup() {
            for (const arg of args) {
                off(arg + ":change", handleValChange);
            }
        };
    }, []);
    // remove custom props from final render so no errors happen
    const propstoadd = (({ statement, refs, defaultCase, ...o }) => o)(props);
    return (_jsxs("div", { ...propstoadd, className: "RESwitch" + (props.className ? " " + props.className : ""), children: [_jsx("div", { id: props.id + "-children", children: props.children }, void 0), (() => {
                if (defaultNeed && props.defaultCase) {
                    return props.defaultCase();
                }
                return null;
            })()] }, void 0));
};
export default Switch;
