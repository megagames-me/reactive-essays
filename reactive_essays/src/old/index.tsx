import { REValue, REValueProps } from "./REValue";
import { REOutputProps, REOutput } from "./REOutput";
import { REApp, REAppProps } from "./REApp";
import { REIf, REIfStatement, REIfProps} from "./REIf"

function AddS(stringToAdd: string, val: number): string {
	return val == 1 ? stringToAdd : stringToAdd + "s";
}

function StyliseN(number: number): string {
	return number.toLocaleString();
}

export { REValue, REValueProps, REOutputProps, REOutput, REApp, REAppProps, REIf, REIfStatement, REIfProps, AddS, StyliseN }