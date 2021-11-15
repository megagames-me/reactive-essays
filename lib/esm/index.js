import React, { Component } from "react";
class REValue extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            // optional second annotation for better type inference
            id: this.props.id,
            value: this.props.value,
            unit: this.props.unit,
            minvalue: this.props.minvalue ? this.props.minvalue : 0,
            maxvalue: this.props.maxvalue ? this.props.maxvalue : Infinity,
            active: false,
        };
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseDrag = this.mouseDrag.bind(this);
        this.befX = -1;
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
    mouseDrag(_event) {
        var _a;
        (_a = _event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setDragImage(this.ghostEle, -99999, -99999);
        let val = this.state.value + (_event.pageX - this.befX);
        if (this.befX !== -1 && !([0, 1].includes(_event.pageX)) && this.state.minvalue ? val >= this.state.minvalue : true && this.state.maxvalue ? val <= this.state.maxvalue : true) {
            console.log(_event);
            this.setState(() => ({ value: val }));
        }
        this.befX = _event.pageX;
    }
    get actualunit() {
        return this.props.unit ? (this.state.value !== 1 ? this.props.unit + "s" : this.props.unit) : "";
    }
    render() {
        //console.log("rendered");
        return React.createElement("span", { className: "REValue", id: this.state.id, draggable: true, onDragStart: this.mouseDown, onDragEnd: this.mouseUp, onDrag: this.mouseDrag },
            this.state.value,
            " ",
            this.actualunit);
    }
}
/*

const REOutput = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, say hello to TypeScript.</div>
);
*/
export { REValue };
