import { React } from "react";

export type REAppProps = React.HTMLAttributes<HTMLDivElement> & {
	// wait for entire dom to load
	waitForLoad?: boolean;
}

type REAppState = {
	waitForLoad?: boolean;
	visible: boolean;
}

export class REApp extends React.Component<REAppProps, REAppState> {
	state: REAppState = {
		waitForLoad: (typeof this.props.waitForLoad !== "undefined") ? this.props.waitForLoad : true,
		visible: false
	}
	constructor (props: REAppProps, state: REAppState) {
		super(props, state);

		this.load = this.load.bind(this);
	}
	// event listener for dom load
	load() {
		this.setState(() => ({visible: true}))
	}

	componentDidMount() {
		window.addEventListener("load", this.load);
	}

	componentWillUnmount() {
		window.removeEventListener("load", this.load);
	}

	render() {
		// lots of ternaries i know xd im so lazy
		//the first ternary is the visibility and also there is ...this.props.style which adds the custom styles
		return <div {...this.props} className="REApp" style={{visibility: (this.state.visible ? "visible" : "hidden"), ...this.props.style}}>{this.props.children}</div>
	}
}