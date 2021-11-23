import React from "react";

import { on, off } from "./Events";

type REIfData = {
	[index: string]: number;
}

export type REIfStatement = (data: REIfData) => boolean;

export type REIfProps = React.HTMLAttributes<HTMLDivElement> & {
	// Function that gives the data and returns a boolean. jsust like if statement
	statement: REIfStatement;
	// arguments. i.e. use id in a REValue
	args: Array<string> | string;
}

type REIfState = {
	statement: REIfStatement;
	args: Array<string>;
	// whether the if statement is showing it's children.
	active: boolean;
}

export class REIf extends React.Component<REIfProps, REIfState> {
	state: REIfState = {
		statement: this.props.statement,
		args: [],
		active: false
	};

	constructor(props: REIfProps, state: REIfState) {
		super(props, state);

		this.handleValChange = this.handleValChange.bind(this);
	}
	// event listener for when value changes
	handleValChange() {
		// type for data inserted into REIfStatement. see above
		const input: REIfData = {};
		
		// repeat through for every arg and sets the input object with the id and the value
		for (const arg of this.state.args) {
			input[arg] = Number((document.querySelector("#" + arg) as HTMLElement)?.dataset.value);
		}
		// set state with REIfStatement
		this.setState(() => ({active: this.state.statement(input)}));
	}

	// Mount event listeners and setup args properly
	componentDidMount() {
		// setup args here so validation works
		for (const arg of typeof this.props.args == "string" ? [this.props.args] : this.props.args) {
			if (document.querySelector("#" + arg)) {
				this.state.args.push(arg);
			}
		}
		// use event listeners
		for (const arg of this.state.args) {
			if (document.querySelector("#" + arg)) {
				on(arg + ":change", this.handleValChange);
			} 
		}
	}
	// remove event listeners on unmount
	componentWillUnmount() {
		for (const arg of this.state.args) {
			if (document.querySelector("#" + arg)) {
				off(arg + ":change", this.handleValChange);
			}
		}
	}

	render() {
		// remove custom props from final render so no errors happen
		const propstoadd = (({ statement, args, ...o }) => o)(this.props);
		// ternaries again... first one adds a class whether it's active or inactive, and the second one adds the custom classes
		return <div {...propstoadd} className={"REIf " + this.state.active ? "REIfActive" : "REIfInactive" + (this.props.className ? " " + this.props.className : "")}>
			{this.state.active ? this.props.children : null}
		</div>;
		
		
	}
}
