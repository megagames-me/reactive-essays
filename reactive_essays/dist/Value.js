import { jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { trigger } from "./helpers";
import { StyliseN, AddS } from "./index";
;
;
;
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
const Value = (props) => {
    const [value, setValue] = React.useState(props.value);
    const [active, setActive] = React.useState(false);
    const newval = {
        minvalue: props.minvalue ? props.minvalue : 0,
        maxvalue: props.maxvalue ? props.maxvalue : Infinity,
        round: props.round ? props.round : 1,
        scalingrate: props.scalingrate ? props.scalingrate : 1,
        stylish: props.stylish ? props.stylish : true,
    };
    let befX = -1;
    let ghostEle;
    function handleLoad() {
        trigger(`${props.id}:change`, { val: value, id: props.id });
    }
    React.useEffect(() => {
        window.addEventListener("load", handleLoad);
        return function cleanup() {
            window.removeEventListener("load", handleLoad);
        };
    });
    function actualunit() {
        // custom stuff
        if (props.getactualunit) {
            return props.getactualunit(value, props.unit);
        }
        return props.unit ? (AddS(props.unit, value)) : "";
    }
    function mouseDown(event) {
        // remove ghost element
        ghostEle = document.createElement("div");
        ghostEle.innerHTML = "ghost";
        ghostEle.style.opacity = "0";
        document.body.appendChild(ghostEle);
        event.dataTransfer?.setDragImage(ghostEle, -99999, -99999);
        event.dataTransfer.effectAllowed = "none";
        // make it active
        setActive(true);
    }
    function mouseUp(event) {
        // remove ghost element
        document.body.removeChild(ghostEle);
        // make it inactive
        setActive(false);
        // reset befX
        befX = -1;
    }
    function mouseDrag(_event) {
        // find value to set to beforehand
        const val = value + ((_event.pageX - befX) * newval.scalingrate);
        // just to be safe prevent escalation of event
        if (_event.pageX == 0) {
            _event.preventDefault();
        }
        else if (!(val >= newval.minvalue)) {
            befX = _event.pageX;
            _event.preventDefault();
        }
        else if (!(val <= newval.maxvalue)) {
            befX = _event.pageX;
            _event.preventDefault();
        }
        else if (befX == -1) {
            befX = _event.pageX;
            _event.preventDefault();
        }
        else {
            // if its valid, do this
            //continue setting position of ghost image
            _event.dataTransfer?.setDragImage(ghostEle, -99999, -99999);
            // set state of variable and also call render
            setValue(val);
            // set befX 
            if (_event.pageX !== 0) {
                //console.log(_event.pageX);
                befX = _event.pageX;
            }
            // trigger event listener
            trigger(`${props.id}:change`, { val: value, id: props.id });
        }
    }
    const propstoadd = (({ id, value, unit, minvalue, maxvalue, scalingrate, stylish, getoutputtext, getactualunit, round, ...o }) => o)(props);
    return _jsxs("span", { ...propstoadd, "data-value": value, className: "REValue " + (props.className ? " " + props.className : ""), id: props.id, draggable: true, onDragStart: mouseDown, onDragEnd: mouseUp, onDrag: mouseDrag, children: [props.getoutputtext ? props.getoutputtext(Math.round(value / newval.round) * newval.round, actualunit()) : (newval.stylish ? StyliseN(Math.round(value / newval.round) * newval.round) : Math.round(value / newval.round) * newval.round), " ", actualunit()] }, void 0);
};
export default Value;
