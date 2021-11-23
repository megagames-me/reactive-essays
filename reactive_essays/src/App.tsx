import React from "react";

interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
	// wait for entire dom to load
	waitForLoad?: boolean;
}

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
    return (<div {...props} className={"REApp " + props.className} style={{visibility: (visible ? "visible" : "hidden"), ...props.style}}>
        {props.children}
    </div>);
}

export default App;