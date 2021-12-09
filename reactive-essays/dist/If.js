import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { on, off } from "./helpers";
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
const If = (props) => {
    const [args, setArgs] = React.useState(typeof props.refs == "object" ? props.refs : [props.refs]);
    const [active, setActive] = useState(false);
    function handleValChange() {
        // Create input data
        const input = {};
        // Fill input object with data from refs
        for (const arg of args) {
            input[arg] = Number(document.querySelector("#" + arg)?.dataset
                .value);
        }
        // set state with REIfStatement
        setActive(props.statement(input));
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
    const propstoadd = (({ statement, refs, ...o }) => o)(props);
    // ternaries again... first one adds a class whether it's active or inactive, and the second one adds the custom classes
    return (_jsx("div", { ...propstoadd, style: { display: active ? "block" : "none" }, className: "REIf " +
            (active ? "REIfActive" : "REIfInactive") +
            (props.className ? " " + props.className : "") }, void 0));
};
export default If;
