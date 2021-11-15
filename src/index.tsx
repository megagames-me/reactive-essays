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
  private direction: Boolean;

  constructor(props: REValueProps, state: REValueState) {
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
    this.setState(() => ({ active: true }))
    this.direction = true;
    console.log("HI", event)
    return false;
  }
  mouseUp(event: any) {
    document.body.removeChild(this.ghostEle);
    this.setState(() => ({ active: false }))
    console.log("bye", event)
    this.direction = false;
  }

  mouseDrag(_event: any) {
    // console.log(this.direction)
    // console.log("OMGG", this.props.value, event)

    if (this.props.maxvalue == null || this.props.minvalue == null) {
      if (this.direction == true) {
        this.setState({ //the error happens here
          value: this.state.value + 1
        });
      } else {
        this.setState({ //the error happens here
          value: this.state.value - 1
        });
      }
    }
    else if (this.direction == true) {
      if (this.props.maxvalue >= this.props.value) {
        this.setState({ //the error happens here
          value: this.state.value + 1
        });
      }
    }
    else {
      if (this.props.minvalue <= this.props.value) {
        this.setState({ //the error happens here
          value: this.state.value - 1
        });
      }
    }
    console.log(this.state.value)
    this.render();
  }

  get actualunit() {
    return this.props.unit ? (this.state.value !== 1 ? this.props.unit + "s" : this.props.unit) : "";
  }

  render() {
    console.log("rendered!")
    return <span className="REValue" draggable={true} onDragStart={this.mouseDown} onDragEnd={this.mouseUp} onDrag={this.mouseDrag}>{this.state.value} {this.actualunit}</span>;
  }
}

/*

const REOutput = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, say hello to TypeScript.</div>
);
*/
export { REValue };