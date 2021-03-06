import React from "react";

interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
	// wait for entire dom to load
	waitForLoad?: boolean;
}

/**
 * Component wrapper for reactive-essays app. For easy loading fixes.
 * 
 * (Barebones, fix later)
 * 
 * @param {boolean} [waitForLoad] Optional
 */

const App: React.FC<AppProps> = (props: AppProps) => {
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
    return (<div {...props} className={"reactive-essays-css-app" + (props.className ? " " + props.className : "")} style={{visibility: (visible ? "visible" : "hidden"), ...props.style}}>
        {props.children}
    </div>);
}

export default App;