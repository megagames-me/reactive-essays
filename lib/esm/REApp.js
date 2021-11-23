import React from "react";
export class REApp extends React.Component {
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
        return React.createElement("div", Object.assign({}, this.props, { className: "REApp", style: Object.assign({ visibility: (this.state.visible ? "visible" : "hidden") }, this.props.style) }), this.props.children);
    }
}
