import React, { Component } from "react";

import { trigger } from "./Events"
import { StyliseN } from "./index";

/**
 * Type for properties of `REValue`. 
 */

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
} & React.HTMLAttributes<HTMLSpanElement>;


type REValueState = {
  id: string;
  value: number;
  unit?: string;
  minvalue: number;
  maxvalue: number;
  active: boolean;
  stylish: boolean;
};

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
export class REValue extends Component<REValueProps, REValueState> {
  state: REValueState = {
    id: this.props.id,
    value: this.props.value,
    unit: this.props.unit,
    minvalue: this.props.minvalue ? this.props.minvalue : 0,
    maxvalue: this.props.maxvalue ? this.props.maxvalue : Infinity,
    active: false,
    stylish: typeof this.props.stylish == "boolean" ? this.props.stylish : true,
  };

  private ghostEle: HTMLElement;
  private befX: number;

  constructor(props: REValueProps, state: REValueState) {
    super(props, state)

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDrag = this.mouseDrag.bind(this);
    this.befX = -1;
    this.handleLoad = this.handleLoad.bind(this);
  }
  handleLoad() {
    console.log("LOADED")
    trigger(`${this.state.id}:drag`, {val: this.state.value});
  }
  mouseDown(event: any) {
    this.ghostEle = document.createElement("div");
    this.ghostEle.innerHTML = "ghost";
    this.ghostEle.style.opacity = "0";
    document.body.appendChild(this.ghostEle);
    event.dataTransfer?.setDragImage(this.ghostEle, -99999, -99999)
    event.dataTransfer.effectAllowed = "none";
    this.setState(() => ({ active: true }))
    return false;
  }
  mouseUp(/*event: any*/) {
    document.body.removeChild(this.ghostEle);
    this.setState(() => ({ active: false }))
    //console.log(event);
    this.befX = -1;

  }

  componentDidMount() {
    window.addEventListener("load", this.handleLoad);
  }
  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
  }
  mouseDrag(_event: any) {
    let val = Math.round(this.state.value + (_event.pageX - this.befX) * (typeof this.props.scalingrate == "number" ? this.props.scalingrate : 1));
    console.log()
    if (_event.pageX == 0) {
      _event.preventDefault()
    }
    else if (!(val >= this.state.minvalue)) {
      //console.log("minval", val, this.state.minvalue)
      this.befX = _event.pageX;
      _event.preventDefault()
    }
    else if (!(val <= this.state.maxvalue)) {
      //console.log("maxval", val, this.state.maxvalue)
      this.befX = _event.pageX;
      _event.preventDefault()
    }
    else if (this.befX == -1) {
      this.befX = _event.pageX;
      _event.preventDefault()
    } else {
      _event.dataTransfer?.setDragImage(this.ghostEle, -99999, -99999);
    
      


      this.setState(() => ({value: val }));

      if (_event.pageX !== 0) {
        //console.log(_event.pageX);
        this.befX = _event.pageX;
      }
      trigger(`${this.state.id}:drag`, {val: this.state.value});
    }
    
    
  }

  get actualunit() {
    return this.props.unit ? (this.state.value !== 1 ? this.props.unit + "s" : this.props.unit) : "";
  }

  render() {
    //console.log("rendered");
    return <span className="REValue" id={this.state.id} draggable={true} onDragStart={this.mouseDown} onDragEnd={this.mouseUp} onDrag={this.mouseDrag}>{this.state.stylish ? StyliseN(this.state.value) : this.state.value} {this.actualunit}</span>;
    
  }
}

/*

const REOutput = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, say hello to TypeScript.</div>
);
*/
