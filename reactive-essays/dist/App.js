import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
/**
 * Component wrapper for reactive-essays app. For easy loading fixes.
 *
 * (Barebones, fix later)
 *
 * @param {boolean} [waitForLoad] Optional
 */
const App = (props) => {
    const [visible, setVisibility] = React.useState(false);
    React.useEffect(() => {
        function handleLoad() {
            setVisibility(true);
        }
        window.addEventListener("load", handleLoad);
        // Specify how to clean up after this effect:
        return function cleanup() {
            window.removeEventListener("load", handleLoad);
        };
    });
    return (_jsx("div", { ...props, className: "reactive-essays-css-app" + (props.className ? " " + props.className : ""), style: { visibility: (visible ? "visible" : "hidden"), ...props.style }, children: props.children }, void 0));
};
export default App;
