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
Object.defineProperty(exports, "__esModule", { value: true });
exports.REValue = void 0;
const react_1 = __importStar(require("react"));
class REValue extends react_1.Component {
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
        let val = this.state.value + (_event.pageX - this.befX);
        console.log();
        if (_event.pageX == 0) {
            return false;
        }
        if (!(this.state.minvalue ? (val >= this.state.minvalue) : true)) {
            return false;
        }
        if (!(this.state.maxvalue ? (val <= this.state.maxvalue) : true)) {
            return false;
        }
        if (this.befX == -1) {
            return false;
        }
        (_a = _event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setDragImage(this.ghostEle, -99999, -99999);
        //console.log(this.state.value, _event.pageX, this.befX);
        if (_event.pageX !== 0 && this.state.minvalue ? (val >= this.state.minvalue) : true && this.state.maxvalue ? (val <= this.state.maxvalue) : true) {
            this.setState(() => ({ value: val }));
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
        return react_1.default.createElement("span", { className: "REValue", id: this.state.id, draggable: true, onDragStart: this.mouseDown, onDragEnd: this.mouseUp, onDrag: this.mouseDrag },
            this.state.value,
            " ",
            this.actualunit);
    }
}
exports.REValue = REValue;
