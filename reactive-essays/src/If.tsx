import React, {FC, useEffect, useState} from "react";

import { on, off } from "./helpers";

interface IfData {
	[index: string]: number;
};

interface IfStatement {
    (data: IfData): boolean
};

interface IfProps extends React.HTMLAttributes<HTMLDivElement>  {
	// Function that gives the data and returns a boolean. jsust like if statement
	statement: IfStatement;
	// arguments. i.e. use id in a REValue
	refs: Array<string> | string;
}

const If: FC<IfProps> = (props: IfProps) => {
    const [args, setArgs] = React.useState<Array<string>>(typeof props.refs == "object" ? props.refs : [props.refs]);
	const [active, setActive] = useState(false);

	function handleValChange() {
		// Create input data 
		const input: IfData = {};

		// Fill input object with data from refs
		for (const arg of args) {
			
			input[arg] = Number((document.querySelector("#" + arg) as HTMLElement)?.dataset.value);
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
        }
    }, []);

	// remove custom props from final render so no errors happen
	const propstoadd = (({ statement, refs, ...o }) => o)(props);
	// ternaries again... first one adds a class whether it's active or inactive, and the second one adds the custom classes
	return <div {...propstoadd} 
		className={"REIf " + (active ? "REIfActive" : "REIfInactive") + (props.className ? " " + props.className : "")}>
		{active ? props.children : null}
	</div>;
}

export default If;
