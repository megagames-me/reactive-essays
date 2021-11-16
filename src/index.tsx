import React, { Component } from "react";

type REValueProps = {
  id: string;
  value: number;
  unit: string | null;
  minvalue?: number;
  maxvalue?: number;
};

type REValueState = {
  id: string;
  value: number;
  unit: string | null;
  minvalue?: number;
  maxvalue?: number;
  active: boolean;
};


class REValue extends Component<REValueProps, REValueState> {
  state: REValueState = {
    // optional second annotation for better type inference
    id: this.props.id,
    value: this.props.value,
    unit: this.props.unit,
    minvalue: this.props.minvalue ? this.props.minvalue : 0,
    maxvalue: this.props.maxvalue ? this.props.maxvalue : Infinity,
    active: false,
  };

  private ghostEle: HTMLElement;
  private befX: number;

  constructor(props: REValueProps, state: REValueState) {
    super(props, state)

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDrag = this.mouseDrag.bind(this);
    this.befX = -1;
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

  mouseDrag(_event: any) {
    let val = this.state.value + (_event.pageX - this.befX);
    console.log()
    if (_event.pageX == 0) {
      return false;
    }
    if (!(this.state.minvalue ? (val >= this.state.minvalue) : true)) {
      return false;
    }
    if ( !(this.state.maxvalue ? (val <= this.state.maxvalue) : true)) {
      return false;
    }
    if (this.befX == -1) {
      return false;
    }
    _event.dataTransfer?.setDragImage(this.ghostEle, -99999, -99999);
    
    //console.log(this.state.value, _event.pageX, this.befX);
    if (_event.pageX !== 0 && this.state.minvalue ? (val >= this.state.minvalue) : true && this.state.maxvalue ? (val <= this.state.maxvalue) : true) {

      this.setState(() => ({value: val }));
    }
    if (_event.pageX !== 0) {
      //console.log(_event.pageX);
      this.befX = _event.pageX;
    }
    return true;
  }

  get actualunit() {
    return this.props.unit ? (this.state.value !== 1 ? this.props.unit + "s" : this.props.unit) : "";
  }

  render() {
    //console.log("rendered");
    return <span className="REValue" id={this.state.id} draggable={true} onDragStart={this.mouseDown} onDragEnd={this.mouseUp} onDrag={this.mouseDrag}>{this.state.value} {this.actualunit}</span>;
    
  }
}

/*

const REOutput = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, say hello to TypeScript.</div>
);
*/
export { REValue };