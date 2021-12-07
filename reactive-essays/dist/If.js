import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { on, off } from "./helpers";
;
;
const If = (props) => {
    const [args, setArgs] = React.useState(typeof props.refs == "object" ? props.refs : [props.refs]);
    const [active, setActive] = useState(false);
    function handleValChange() {
        // Create input data 
        const input = {};
        // Fill input object with data from refs
        for (const arg of args) {
            input[arg] = Number(document.querySelector("#" + arg)?.dataset.value);
        }
        // set state with REIfStatement
        setActive(props.statement(input));
    }
    useEffect(() => {
        for (const arg of typeof props.refs == "string" ? [props.refs] : props.refs) {
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
    return _jsx("div", { ...propstoadd, className: "REIf " + (active ? "REIfActive" : "REIfInactive") + (props.className ? " " + props.className : ""), children: active ? props.children : null }, void 0);
};
export default If;
