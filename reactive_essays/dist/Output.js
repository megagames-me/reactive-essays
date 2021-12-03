OutputModifier = (inputval) => number;
;
const Output = (props) => {
};
export {};
/*
export class REOutput extends Component<REOutputProps, REOutputState> {
    state: REOutputState = {
        // make everything into an array
        var: typeof this.props.var == "object" ? this.props.var : [this.props.var],
        unit: this.props.unit,
        inputvals: {
            
        },
        // check if stylish exists, if no set default to true
        stylish: typeof this.props.stylish == "boolean" ? this.props.stylish : true,
    };

    public valueget: REOutputModifier;
    private handleValueChange: () => object;

    constructor(props: REOutputProps, state: REOutputState) {
        super(props, state);
        
        // init inputvals
        for (const val of this.state.var) {
            this.state.inputvals[val] = 0;
        }

        // set valueget function. either scalar or inputted custom function
        this.valueget = typeof this.props.getvalue == "function" ? this.props.getvalue : (inputval): number => (Number(this.props.getvalue) * Object.values(inputval)[0]);

        // handle value change for the input. change inputvals
        this.handleValueChange = ((e: any) => this.setState((prev) => {
            const val = {inputvals: {...prev.inputvals}};
            val.inputvals[e.detail.id] = e.detail.val;
            return val;
        })).bind(this);
    }

    componentDidMount() {
        // init event listeners
        for (const item of this.state.var) {
            on(`${item}:change`, this.handleValueChange);
        }
    }
    componentWillUnmount() {
        // remove event listeners
        for (const item of this.state.var) {
            off(`${item}:change`, this.handleValueChange);
        }
    }
    get actualunit(): string {
        // if there isn't a getactual unit function, use default unit with s'' if necessary
        if (!this.props.getactualunit) {
            return this.props.unit ? (this.getvalue !== 1 ? this.props.unit + "s" : this.props.unit) : "";
        } else {
            // else, use getactualunit
            return this.props.unit ? this.props.getactualunit(this.getvalue, this.props.unit) : this.props.getactualunit(this.getvalue);
        }
        
    }

    public get getvalue(): number {
        // basically a get thing. idk why this is here
        return this.valueget(this.state.inputvals);
    }
    
    // return output text
    public get text(): string {
        // if no outputtext function, do this
        if (!this.props.getoutputtext) {
            if (this.state.stylish) {
                // stylise in this format
                return StyliseN(this.getvalue) + " " + this.actualunit;
            } else {
                return this.getvalue + " " + this.actualunit;
            }
        } else {
            return this.props.getoutputtext(this.getvalue, this.actualunit);
        }
        
    }

    render() {
        // Remove custom props
        const propstoadd = (({ getvalue, getoutputtext, getactualunit, ...o }) => o)(this.props);

        return <span {...propstoadd} data-value={this.getvalue} className={"REOutput" + (this.props.className ? " " + this.props.className : "")}>{this.text}</span>;
    
    }
}*/ 
