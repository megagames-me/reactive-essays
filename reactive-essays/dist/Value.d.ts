import React from "react";
/**
 * Type for properties of `REValue`.
 */
interface ValueCustomText {
    (val: number, unit: string): string;
}
interface ValueCustomUnit {
    (val: number, rawunit?: string): string;
}
interface ValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * ID for variable. Use this to link your `REValue` to an output, like `REOutput`.
     */
    id: string;
    /**
     * Default value for variable. You can set this so that when you first get onto your page, it shows your default value at first. And then, the user can change it.
     */
    value: number;
    /**
     * The unit. If it is set, it will add an 's' to the end if it has multiple or zero. If it isn't set, it will just be a plain number.
     */
    unit?: string;
    /**
     * Minimum value for the value. The user cannot drag lower than this. If unset, it will default to 0. You can set this to negative infinity by inputting `props.minValue={-Infinity}`
     */
    minValue?: number;
    /**
     * Maximum value for the value. The user cannot drag higher than this. If unset, it will default to Infinity.
     */
    maxValue?: number;
    scalingRate?: number;
    stylish?: boolean;
    round?: number;
    getOutputText?: ValueCustomText;
    getActualUnit?: ValueCustomUnit;
}
/**
 * Component for draggable variable
 * @param {string} id ID of item. Can reference in other components
 * @param {number} value Default value of dragger
 * @param {string} [unit] The unit of the number. Don't add an 'S' at the end. _Optional_
 * @param {number} [minValue=0] The minimum value of the dragger. You cannot set it below this. Default: `{0}`
 * @param {number} [maxValue=Infinity] The maximum value of the dragger. You cannot set it above this. Default: `{Infinity}`
 * @param {number} [scalingRate=1] The rate at which the number scales. It is a scalar. If `scalingRate=0.1`, it will scale 10 times slower. If it's `10`, it will scale 10 times faster. `-1` means that scaling is reversed. Default: `{1}`
 * @param {boolean} [stylish=true] If numbers should have decimals or commas. Default: `{true}`
 * @param {number} [round=1] The step. How much it's rounded to. This requires scalingRate to be changed for it work. This isn't a value that I'd suggest using though. Default: `{1}`
 * @param {ValueCustomText} [getOutputText] A function that's given the output value number and the output unit (see below) and outputs what text will be shown in the blue underline as the `<Value>`. _Optional_
 * @param {ValueCustomUnit} [getActualUnit] A function that's given the output value number and the raw unit (if the prop `unit` is given) and outputs the final unit. This is given to `getOutputText`. _Optional_
 *
 * Example without output:
 * ```tsx
 * import { App as REApp } from "reactive_essays"
 * return (
 *    <REApp>
 *      I ate <Value id="cookie" value={3} unit="cookie" minValue={1} maxValue={15} /> today.
 *    </REApp>
 * )
 * ```
 *
 * Example with output:
 * ```tsx
 * return (
 *    <REApp>
 *      I ate <Value id="cookie" value={3} unit="cookie" minValue={1} maxValue={15} /> today. That is <Output refs="cookies" unit="calorie" getValue={17} />.
 *    </REApp>
 *    // Provides slider input of amount of cookies, and outputs how many calories that is.
 * )
 * ```
 */
declare const Value: React.FC<ValueProps>;
export default Value;
