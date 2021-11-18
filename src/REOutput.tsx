import React, { Component } from "react";

import { on } from "./Events";
import { StyliseN } from './index';

type REOutputModifier = (inputval: number) => number;
type REOutputCustomText = (val: number, unit: string) => string;
type REOutputCustomUnit = (val: number, rawunit?: string) => string;

export type REOutputProps = React.HTMLAttributes<HTMLSpanElement> & {
    var: Array<string> | string;
    unit?: string;
    getvalue: REOutputModifier | number; 
    getoutputtext?: REOutputCustomText;
    getactualunit?: REOutputCustomUnit;
    stylish?: boolean;
};

type REOutputState = {
    unit?: string;
    var: Array<String>;
    inputvalue: number;
    stylish: boolean;
}

export class REOutput extends Component<REOutputProps, REOutputState> {
    state: REOutputState = {
        var: typeof this.props.var == "object" ? this.props.var : [this.props.var],
        unit: this.props.unit,
        inputvalue: 0,
        stylish: typeof this.props.stylish == "boolean" ? this.props.stylish : true,
    };

    public valueget: REOutputModifier;

    constructor(props: REOutputProps, state: REOutputState) {
        super(props, state)

        this.valueget = typeof this.props.getvalue == "function" ? this.props.getvalue : (inputval: number): number => (Number(this.props.getvalue) * inputval);
        console.log(this.valueget);
    }

    componentDidMount() {
        for (let item of this.state.var) {
            console.log(item);
            on(`${item}:drag`, (e: any) => this.setState(() => ({inputvalue: e.detail.val})));
        }
    }

    get actualunit(): string {
        if (!this.props.getactualunit) {
            return this.props.unit ? (this.getvalue !== 1 ? this.props.unit + "s" : this.props.unit) : "";
        } else {
            return this.props.unit ? this.props.getactualunit(this.getvalue, this.props.unit) : this.props.getactualunit(this.getvalue);
        }
        
    }

    public get getvalue(): number {
        return this.valueget(this.state.inputvalue);
    }
    
    public get text(): string {
        if (!this.props.getoutputtext) {
            if (this.state.stylish) {
                return StyliseN(this.getvalue) + " " + this.actualunit;
            } else {
                return this.getvalue + " " + this.actualunit;
            }
        } else {
            return this.props.getoutputtext(this.getvalue, this.actualunit);
        }
        
    }

    render() {
        const propstoadd = (({ getvalue, getoutputtext, getactualunit, className, ...o }) => o)(this.props) // remove b and c

        //console.log("rendered");
        return <span className="REOutput" {...propstoadd}>{this.text}</span>;
    
    }
}