import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { on, off } from "../helpers";
/**
 * Component for a case in a `<Switch>`.
 *
 * (Barebones, again. Will fix later.)
 *
 * @param {SwitchItemStatement | boolean | string | number} statement
 * @param {string} parentId
 */
const SwitchItem = (props) => {
    const [active, setActive] = useState(false);
    function handleValChange(e) {
        if (typeof props.statement == "function") {
            setActive(props.statement(e.detail.val, e.detail.input));
        }
        else {
            setActive(props.statement == e.detail.val);
        }
    }
    useEffect(() => {
        if (document.querySelector("#" + props.parentId)) {
            on(props.parentId + ":switch", handleValChange);
        }
        else {
            throw new DOMException("The reactive-essays <Switch> component with the id '" +
                props.parentId +
                "' doesn't exist. Try fixing the parentId prop.");
        }
        return function cleanup() {
            if (document.querySelector("#" + props.parentId)) {
                off(props.parentId + ":switch", handleValChange);
            }
        };
    }, []);
    // remove custom props from final render so no errors happen
    const propstoadd = (({ statement, parentId, ...o }) => o)(props);
    return (_jsx("div", { ...propstoadd, style: { ...props.style, display: active ? "block" : "none" }, className: "RESwitchItem" + (props.className ? " " + props.className : ""), children: props.children }, void 0));
};
export default SwitchItem;
