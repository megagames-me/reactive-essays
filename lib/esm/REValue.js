import React, { Component } from "react";
import { trigger } from "./Events";
import { StyliseN } from "./index";
/**
 * Component for draggable variable
 *
 * Example without output:
 * ```tsx
 * return (
 *    <div className="app">
 *      I ate <REValue id="cookies" value={3} unit="cookie" minvalue={1} maxvalue={15} /> today.
 *    </div>
 * )
 * ```
 *
 * Example with output:
 * ```tsx
 * // add later
 * ```
 */
export class REValue extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            id: this.props.id,
            value: this.props.value,
            unit: this.props.unit,
            minvalue: this.props.minvalue ? this.props.minvalue : 0,
            maxvalue: this.props.maxvalue ? this.props.maxvalue : Infinity,
            active: false,
            stylish: typeof this.props.stylish == "boolean" ? this.props.stylish : true,
        };
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseDrag = this.mouseDrag.bind(this);
        this.befX = -1;
        this.handleLoad = this.handleLoad.bind(this);
    }
    handleLoad() {
        console.log("LOADED");
        trigger(`${this.state.id}:drag`, { val: this.state.value });
    }
    mouseDown(event) {
        var _a;
        this.ghostEle = document.createElement("div");
        this.ghostEle.innerHTML = "ghost";
        this.ghostEle.style.opacity = "0";
        document.body.appendChild(this.ghostEle);
        (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setDragImage(this.ghostEle, -99999, -99999);
        event.dataTransfer.effectAllowed = "none";
        this.setState(() => ({ active: true }));
        return false;
    }
    mouseUp( /*event: any*/) {
        document.body.removeChild(this.ghostEle);
        this.setState(() => ({ active: false }));
        //console.log(event);
        this.befX = -1;
    }
    componentDidMount() {
        window.addEventListener("load", this.handleLoad);
    }
    componentWillUnmount() {
        window.removeEventListener("load", this.handleLoad);
    }
    mouseDrag(_event) {
        var _a;
        let val = Math.round(this.state.value + (_event.pageX - this.befX) * (typeof this.props.scalingrate == "number" ? this.props.scalingrate : 1));
        console.log();
        if (_event.pageX == 0) {
            _event.preventDefault();
        }
        else if (!(val >= this.state.minvalue)) {
            //console.log("minval", val, this.state.minvalue)
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
        }
        else {
            (_a = _event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setDragImage(this.ghostEle, -99999, -99999);
            this.setState(() => ({ value: val }));
            if (_event.pageX !== 0) {
                //console.log(_event.pageX);
                this.befX = _event.pageX;
            }
            trigger(`${this.state.id}:drag`, { val: this.state.value });
        }
    }
    get actualunit() {
        return this.props.unit ? (this.state.value !== 1 ? this.props.unit + "s" : this.props.unit) : "";
    }
    render() {
        //console.log("rendered");
        return React.createElement("span", { className: "REValue", id: this.state.id, draggable: true, onDragStart: this.mouseDown, onDragEnd: this.mouseUp, onDrag: this.mouseDrag },
            this.state.stylish ? StyliseN(this.state.value) : this.state.value,
            " ",
            this.actualunit);
    }
}
/*

const REOutput = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, say hello to TypeScript.</div>
);
*/
