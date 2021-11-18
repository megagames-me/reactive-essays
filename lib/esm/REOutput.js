var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { Component } from "react";
import { on } from "./Events";
import { StyliseN } from './index';
export class REOutput extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            var: typeof this.props.var == "object" ? this.props.var : [this.props.var],
            unit: this.props.unit,
            inputvalue: 0,
            stylish: typeof this.props.stylish == "boolean" ? this.props.stylish : true,
        };
        this.valueget = typeof this.props.getvalue == "function" ? this.props.getvalue : (inputval) => (Number(this.props.getvalue) * inputval);
        console.log(this.valueget);
    }
    componentDidMount() {
        for (let item of this.state.var) {
            console.log(item);
            on(`${item}:drag`, (e) => this.setState(() => ({ inputvalue: e.detail.val })));
        }
    }
    get actualunit() {
        if (!this.props.getactualunit) {
            return this.props.unit ? (this.getvalue !== 1 ? this.props.unit + "s" : this.props.unit) : "";
        }
        else {
            return this.props.unit ? this.props.getactualunit(this.getvalue, this.props.unit) : this.props.getactualunit(this.getvalue);
        }
    }
    get getvalue() {
        return this.valueget(this.state.inputvalue);
    }
    get text() {
        if (!this.props.getoutputtext) {
            if (this.state.stylish) {
                return StyliseN(this.getvalue) + " " + this.actualunit;
            }
            else {
                return this.getvalue + " " + this.actualunit;
            }
        }
        else {
            return this.props.getoutputtext(this.getvalue, this.actualunit);
        }
    }
    render() {
        const propstoadd = ((_a) => {
            var { getvalue, getoutputtext, getactualunit, className } = _a, o = __rest(_a, ["getvalue", "getoutputtext", "getactualunit", "className"]);
            return o;
        })(this.props); // remove b and c
        //console.log("rendered");
        return React.createElement("span", Object.assign({ className: "REOutput" }, propstoadd), this.text);
    }
}
