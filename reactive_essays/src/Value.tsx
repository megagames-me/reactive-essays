import React, { BaseSyntheticEvent } from "react";



import { trigger } from "./helpers";
import { StyliseN, AddS } from "./index";

/**
 * Type for properties of `REValue`. 
 */

interface ValueCustomText {(val: number, unit: string): string};
interface ValueCustomUnit {(val: number, rawunit?: string): string};

interface ValueProps extends React.HTMLAttributes<HTMLSpanElement> {
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
	 * Minimum value for the value. The user cannot drag lower than this. If unset, it will default to 0. You can set this to negative infinity by inputting `props.minvalue={-Infinity}`
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
	getoutputtext?: ValueCustomText;
	getactualunit?: ValueCustomUnit;
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
 *      I ate <REValue id="cookies" value={3} unit="cookie" minvalue={1} props.maxvalue={15} /> today.
 *    </REApp>
 * )
 * ```
 * 
 * Example with output:
 * ```tsx
 * // add later
 * ```
 */

const Value: React.FC<ValueProps> = (props: ValueProps) => {
    const [value, setValue] = React.useState(props.value);
    const [active, setActive] = React.useState(false);
	const [ghostEle, setGhostEle] = React.useState(document.createElement('div'));
	const [befX, setBefX] = React.useState(-1);

    const newval = {
        minvalue: props.minvalue ? props.minvalue : 0,
        maxvalue: props.maxvalue ? props.maxvalue : Infinity,
        round: props.round ? props.round : 1,
        scalingrate: props.scalingrate ? props.scalingrate : 1,
        stylish: props.stylish ? props.stylish: true,
    }
    

    
	

    let handleLoad = () => {
        trigger(`${props.id}:change`, {val: value, id: props.id});
    }

    React.useEffect(() => {
        window.addEventListener("load", handleLoad);

        return function cleanup() {
            window.removeEventListener("load", handleLoad);
        }
    });

    function actualunit() {
        // custom stuff
		if (props.getactualunit) {
			return props.getactualunit(value, props.unit);
		}
		return props.unit ? (AddS(props.unit, value)) : "";
    }
    let mouseDown = (event: any) => { 
		// remove ghost element

		setGhostEle(document.createElement("div"));
		
		ghostEle.className = "jankySolutionAGHHHPLSHELP"
		ghostEle.innerHTML = "HELLO";
		ghostEle.style.opacity = "0";
		
		document.body.appendChild(ghostEle);

		event.dataTransfer?.setDragImage(ghostEle, -99999, -99999);
		event.dataTransfer.effectAllowed = "none";

		// make it active
		setActive(true);
	}
	let mouseUp = (event: any) => {
		// remove ghost element
		document.body.removeChild(document.querySelector(".jankySolutionAGHHHPLSHELP") as Node);
		
		// make it inactive
		setActive(false);
		// reset befX
		setBefX(-1);

	}
	let mouseDrag = (event: any) => {
		// find value to set to beforehand
		const val = value + ((event.pageX - befX) * newval.scalingrate);

		// just to be safe prevent escalation of event
		if (event.pageX == 0) {
			event.preventDefault();
		}
		else if (!(val >= newval.minvalue)) {

			setBefX(event.pageX);
			event.preventDefault();
		}
		else if (!(val <= newval.maxvalue)) {
			setBefX(event.pageX);
			event.preventDefault();
		}
		else if (befX == -1) {
			setBefX(event.pageX);
			event.preventDefault();
		} else {
			// if its valid, do this
			// continue setting position of ghost image
			
			event.dataTransfer?.setDragImage(ghostEle, -99999, -99999);

			// set state of variable and also call render
			setValue(val);

			// set befX 
			if (event.pageX !== 0) {

				setBefX(event.pageX)
			}

			// trigger event listener
			trigger(`${props.id}:change`, {val: value, id: props.id});
		}
		
		
	}
    const propstoadd = (({ id, value, unit, minvalue, maxvalue, scalingrate, stylish, getoutputtext, getactualunit, round, ...o }) => o)(props);

	return (<span {...propstoadd} data-value={value} className={"reactive-essays-css-value " + (props.className ? " " + props.className : "")} 
		id={props.id} 
		draggable={true} 
		onDragStart={mouseDown} 
		onDragEnd={mouseUp}
		onDrag={mouseDrag}>{props.getoutputtext 
			? props.getoutputtext(Math.round(value / newval.round) * newval.round, actualunit()) : 
			(newval.stylish ? 
				StyliseN(Math.round(value / newval.round) * newval.round) : 
				Math.round(value / newval.round) * newval.round)} {actualunit()}
	</span>);
}

export default Value;