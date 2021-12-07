"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.REOutput = void 0;
const react_1 = __importStar(require("react"));
const Events_1 = require("./Events");
const index_1 = require("./index");
class REOutput extends react_1.Component {
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
            (0, Events_1.on)(`${item}:drag`, (e) => this.setState(() => ({ inputvalue: e.detail.val })));
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
                return (0, index_1.StyliseN)(this.getvalue) + " " + this.actualunit;
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
        return react_1.default.createElement("span", Object.assign({ className: "REOutput" }, propstoadd), this.text);
    }
}
exports.REOutput = REOutput;
