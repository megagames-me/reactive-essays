import React, { Component } from "react";
export class REOutput extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            var: [...this.props.var],
            unit: this.props.unit,
            inputvalue: 0,
        };
        this.valueget = typeof this.props.getValue == "function" ? this.props.getValue : (inputval) => (this.props.getValue * inputval);
    }
    get actualunit() {
        return this.props.unit ? (this.getvalue !== 1 ? this.props.unit + "s" : this.props.unit) : "";
    }
    get getvalue() {
        return this.valueget(this.state.inputvalue);
    }
    render() {
        //console.log("rendered");
        return React.createElement("span", Object.assign({ className: "REValue" }, this.props),
            this.getvalue,
            " ",
            this.actualunit);
    }
}
