import React, { Component } from "react";

type REOutputModifier = (inputval: number) => number;

export type REOutputProps = React.HTMLAttributes<HTMLSpanElement> & {
    var: Array<string> | string;
    unit: string | null;
    getValue: REOutputModifier | number; 
};

type REOutputState = {
    unit: string | null;
    var: Array<String>;
    inputvalue: number;
}

export class REOutput extends Component<REOutputProps, REOutputState> {
    state: REOutputState = {
        var: [...this.props.var],
        unit: this.props.unit,
        inputvalue: 0,
    };

    public valueget: REOutputModifier;

    constructor(props: REOutputProps, state: REOutputState) {
        super(props, state)

        this.valueget = typeof this.props.getValue == "function" ? this.props.getValue : (inputval: number): number => (Number(this.props.getValue) * inputval);
    }

    get actualunit(): string {
        return this.props.unit ? (this.getvalue !== 1 ? this.props.unit + "s" : this.props.unit) : "";
    }

    public get getvalue(): number {
        return this.valueget(this.state.inputvalue);
    }
     
    render() {
        //console.log("rendered");
        return <span className="REOutput" {...this.props}>{this.getvalue} {this.actualunit}</span>;
    
    }
}