import React from "react";
interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
    waitForLoad?: boolean;
}
declare const App: React.FC<AppProps>;
export default App;
