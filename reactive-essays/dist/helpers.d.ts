declare function on(eventType: any, listener: any): void;
declare function off(eventType: any, listener: any): void;
declare function once(eventType: any, listener: any): void;
declare function trigger(eventType: any, data?: any): void;
/**
 * Takes a string and a number value and adds an 's' at the end to the string if the value is equal to 1.
 * Useful for making custom units as it adds an 's' when necessary and you don't get weird stuff like '1 cookies' or '2 cookie'.
 *
 * @param {string} stringToAdd
 * @param {number} val
 * @returns {string} stringToAdd with 's' at end if needed
 */
declare function AddS(stringToAdd: string, val: number): string;
/**
 * Stylises a number so it looks better.
 * @param number
 * @returns {string} Returns number, but a string and it has commas and decimal points.
 */
declare function StyliseN(number: number): string;
export { on, once, off, trigger, AddS, StyliseN };
