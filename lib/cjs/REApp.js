"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REApp = void 0;
const react_1 = __importDefault(require("react"));
class REApp extends react_1.default.Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            waitForLoad: (typeof this.props.waitForLoad !== "undefined") ? this.props.waitForLoad : true,
            visible: false
        };
        this.load = this.load.bind(this);
    }
    load() {
        this.setState(() => ({ visible: true }));
    }
    componentDidMount() {
        window.addEventListener("load", this.load);
    }
    componentWillUnmount() {
        window.removeEventListener("load", this.load);
    }
    render() {
        return react_1.default.createElement("div", Object.assign({}, this.props, { className: "REApp", style: Object.assign({ visibility: (this.state.visible ? "visible" : "hidden") }, this.props.style) }), this.props.children);
    }
}
exports.REApp = REApp;
