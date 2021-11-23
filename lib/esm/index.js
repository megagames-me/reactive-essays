import { REValue } from "./REValue";
import { REOutput } from "./REOutput";
import { REApp } from "./REApp";
function AddS(stringToAdd, val) {
    return val == 1 ? stringToAdd : stringToAdd + "s";
}
function StyliseN(number) {
    return number.toLocaleString();
}
export { REValue, REOutput, REApp, AddS, StyliseN };
