import React, { Component } from "react";

type REValueProps = {
  name: string;
  value: number;
  unit: string | null;
  minvalue?: number;
  maxvalue?: number;
};

type REValueState = {
  name: string;
  value: number;
  unit: string | null;
  minvalue?: number;
  maxvalue?: number;
  active: boolean;
  
};


class REValue extends Component<REValueProps, REValueState> {
  state: REValueState = {
    // optional second annotation for better type inference
    name: this.props.name,
    value: this.props.value,
    unit: this.props.unit,
    minvalue: this.props.minvalue ? this.props.minvalue : 0,
    maxvalue: this.props.maxvalue ? this.props.maxvalue : Infinity,
    active: false,
  };

  private ghostEle: HTMLElement;

  constructor(props: REValueProps, state: REValueState){
    super(props, state)

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDrag = this.mouseDrag.bind(this);
    
  }

  mouseDown(event: any) {
    this.ghostEle = document.createElement("div");
    document.body.appendChild(this.ghostEle);
    event.dataTransfer?.setDragImage(this.ghostEle, -99999, -99999)
    event.dataTransfer.effectAllowed = "none";
    this.setState(() => ({active: true}))
    console.log("HI", event)
    return false;
    
  }
  mouseUp(event: any) {
    document.body.removeChild(this.ghostEle);
    this.setState(() => ({active: false}))
    console.log("bye", event)
  }

  mouseDrag(event: any) {
    console.log("OMG", event)
  
  }

  get actualunit() {
    return this.props.unit ? (this.props.value !== 1 ? this.props.unit + "s" : this.props.unit) : "";
  }

  render() {
    return <span className="REValue" draggable={true} onDragStart={this.mouseDown} onDragEnd={this.mouseUp} onDrag={this.mouseDrag}>{this.props.value} {this.actualunit}</span>;
  }
}

/*

const REOutput = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, say hello to TypeScript.</div>
);
*/
export {REValue};