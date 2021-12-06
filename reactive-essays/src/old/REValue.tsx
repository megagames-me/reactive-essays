import React, { Component } from "react";

import { trigger } from "./Events";
import { StyliseN, AddS } from "./index";

/**
 * Type for properties of `REValue`. 
 */

type REValueCustomText = (val: number, unit: string) => string;
type REValueCustomUnit = (val: number, rawunit?: string) => string;

export type REValueProps = {
	/**
	 * ID for variable. Use this to link your `REValue` to an output, like `REOutput`.
	 */
	id: string;
	/**
	 * Default value for variable. You can set this so that when you first get onto your page, it shows your default value at first. And then, the user can change it.
	 */
	value: number;
	/**
	 * The unit. If it is set, it will add an 's' to the end if it has multiple or zero. If it isn't set, it will just be a plain number.
	 */
	unit?: string;
	/**
	 * Minimum value for the value. The user cannot drag lower than this. If unset, it will default to 0. You can set this to negative infinity by inputting `minvalue={-Infinity}`
	 */
	minvalue?: number;
	/**
	 * Maximum value for the value. The user cannot drag higher than this. If unset, it will default to Infinity.
	 */
	maxvalue?: number;
	scalingrate?: number;
	stylish?: boolean;
	// number where it rounds to. default 1
	round?: number;
	getoutputtext?: REValueCustomText;
	getactualunit?: REValueCustomUnit;
} & React.HTMLAttributes<HTMLSpanElement>;


type REValueState = {
	id: string;
	value: number;
	unit?: string;
	minvalue: number;
	maxvalue: number;
	active: boolean;
	stylish: boolean;
	round: number;
};

/**
 * Component for draggable variable
 * @param {string} id ID of item. Can reference in other components
 * @param {number} value Default value of dragger
 * @param {string} [unit] The unit of the number. Don't add an 'S' at the end. _Optional_
 * @param {number} [minvalue] The minimum value of the dragger. You cannot set it below this. Default: `{0}`
 * @param {number} [maxvalue] The maximum value of the dragger. You cannot set it above this. Default: `{Infinity}`
 * @param {number} [scalingrate] The rate at which the number scales. It is a scalar. If `scalingrate=0.1`, it will scale 10 times slower. If it's `10`, it will scale 10 times faster. `-1` means that scaling is reversed. Default: `{1}`
 * @param {boolean} [stylish] If numbers should have decimals or commas. Default: `{true}`
 * 
 * Example without output:
 * ```tsx
 * return (
 *    <REApp>
 *      I ate <REValue id="cookies" value={3} unit="cookie" minvalue={1} maxvalue={15} /> today.
 *    </REApp>
 * )
 * ```
 * 
 * Example with output:
 * ```tsx
 * // add later
 * ```
 */
export class REValue extends Component<REValueProps, REValueState> {
	state: REValueState = {
		id: this.props.id,
		value: this.props.value,
		unit: this.props.unit,
		minvalue: this.props.minvalue ? this.props.minvalue : 0,
		maxvalue: this.props.maxvalue ? this.props.maxvalue : Infinity,
		active: false,
		stylish: typeof this.props.stylish == "boolean" ? this.props.stylish : true,
		round: this.props.round ? this.props.round : 1
	};

	private ghostEle: HTMLElement;
	private befX: number;

	constructor(props: REValueProps, state: REValueState) {
		super(props, state);

		this.mouseDown = this.mouseDown.bind(this);
		this.mouseUp = this.mouseUp.bind(this);
		this.mouseDrag = this.mouseDrag.bind(this);
		// x before mousemove handler. used to find ∆x 
		this.befX = -1;
		this.handleLoad = this.handleLoad.bind(this);
	}
	handleLoad() {
		trigger(`${this.state.id}:change`, {val: this.state.value, id: this.state.id});
	}
	mouseDown(event: any) {
		// remove ghost element
		this.ghostEle = document.createElement("div");
		this.ghostEle.innerHTML = "ghost";
		this.ghostEle.style.opacity = "0";
		document.body.appendChild(this.ghostEle);
		event.dataTransfer?.setDragImage(this.ghostEle, -99999, -99999);
		event.dataTransfer.effectAllowed = "none";
		// make it active
		this.setState(() => ({ active: true }));
		return false;
	}
	mouseUp(/*event: any*/) {
		// remove ghost element
		document.body.removeChild(this.ghostEle);
		// make it inactive
		this.setState(() => ({ active: false }));
		// reset befX
		this.befX = -1;

	}

	componentDidMount() {
		window.addEventListener("load", this.handleLoad);
	}
	componentWillUnmount() {
		window.removeEventListener("load", this.handleLoad);
	}
	mouseDrag(_event: any) {
		// find value to set to beforehand
		const val = this.state.value + ((_event.pageX - this.befX) * (typeof this.props.scalingrate == "number" ? this.props.scalingrate : 1));

		// just to be safe prevent escalation of event
		if (_event.pageX == 0) {
			_event.preventDefault();
		}
		else if (!(val >= this.state.minvalue)) {

			this.befX = _event.pageX;
			_event.preventDefault();
		}
		else if (!(val <= this.state.maxvalue)) {
			//console.log("maxval", val, this.state.maxvalue)
			this.befX = _event.pageX;
			_event.preventDefault();
		}
		else if (this.befX == -1) {
			this.befX = _event.pageX;
			_event.preventDefault();
		} else {
			// if its valid, do this

			//continue setting position of ghost image
			_event.dataTransfer?.setDragImage(this.ghostEle, -99999, -99999);

			// set state of variable and also call render
			this.setState(() => ({value: val }));

			// set befX 
			if (_event.pageX !== 0) {
				//console.log(_event.pageX);
				this.befX = _event.pageX;
			}

			// trigger event listener
			trigger(`${this.state.id}:change`, {val: this.state.value, id: this.state.id});
		}
		
		
	}

	get actualunit() {
		// custom stuff
		if (this.props.getactualunit) {
			return this.props.getactualunit(this.state.value, this.state.unit);
		}
		return this.props.unit ? (AddS(this.props.unit, this.state.value)) : "";
	}

	render() {
		// remove custom props
		const propstoadd = (({ id, value, unit, minvalue, maxvalue, scalingrate, stylish, getoutputtext, getactualunit, round, ...o }) => o)(this.props);

		return <span {...propstoadd} data-value={this.state.value} className={"REValue" + (this.props.className ? " " + this.props.className : "")} id={this.state.id} draggable={true} onDragStart={this.mouseDown} onDragEnd={this.mouseUp} onDrag={this.mouseDrag}>{this.props.getoutputtext ? this.props.getoutputtext(Math.round(this.state.value / this.state.round) * this.state.round, this.actualunit) : (this.state.stylish ? StyliseN(Math.round(this.state.value / this.state.round) * this.state.round) : Math.round(this.state.value / this.state.round) * this.state.round)} {this.actualunit}</span>;
		
	}
}

/*

const REOutput = ({ name }: { name: string }): JSX.Element => (
	<div>Hey {name}, say hello to TypeScript.</div>
);
*/
