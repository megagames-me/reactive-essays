import React from "react";
export declare type REAppProps = React.HTMLAttributes<HTMLDivElement> & {
    waitForLoad?: boolean;
};
declare type REAppState = {
    waitForLoad?: boolean;
    visible: boolean;
};
export declare class REApp extends React.Component<REAppProps, REAppState> {
    state: REAppState;
    constructor(props: REAppProps, state: REAppState);
    load(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
