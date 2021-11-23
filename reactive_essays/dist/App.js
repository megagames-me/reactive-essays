import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
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
    return (_jsx("div", { ...props, className: "REApp " + props.className, style: { visibility: (visible ? "visible" : "hidden"), ...props.style }, children: props.children }, void 0));
};
export default App;
