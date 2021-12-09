import React from "react";
interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
    waitForLoad?: boolean;
}
/**
 * Component wrapper for reactive-essays app. For easy loading fixes.
 *
 * (Barebones, fix later)
 *
 * @param {boolean} [waitForLoad] Optional
 */
declare const App: React.FC<AppProps>;
export default App;
