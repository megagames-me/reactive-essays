import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { off, on } from "../helpers";
/**
 * Component for default case in `<Switch>`
 *
 * @param {string} parentId ID of parent element (Should be a `<Switch>` component)
 */
const SwitchItemDefault = (props) => {
    const [active, setActive] = useState(false);
    function handleValChange(e) {
        setActive(e.detail.active);
    }
    useEffect(() => {
        if (document.querySelector("#" + props.parentId)) {
            on(props.parentId + ":switchdefault", handleValChange);
        }
        else {
            throw new DOMException("The reactive-essays <Switch> component with the id '" +
                props.parentId +
                "' doesn't exist. Try fixing the parentId prop.");
        }
        return function cleanup() {
            if (document.querySelector("#" + props.parentId)) {
                off(props.parentId + ":switchdefault", handleValChange);
            }
        };
    }, []);
    // remove custom props from final render so no errors happen
    const propstoadd = (({ parentId, ...o }) => o)(props);
    return (_jsx("div", { ...propstoadd, style: { ...props.style, display: active ? "block" : "none" }, className: "RESwitchItemDefault" +
            (props.className ? " " + props.className : ""), children: props.children }, void 0));
};
export default SwitchItemDefault;
