// https://www.falldowngoboone.com/blog/talk-to-your-react-components-with-custom-events/

function on(eventType: any, listener: any) {
	document.addEventListener(eventType, listener);
}

function off(eventType: any, listener: any) {
	document.removeEventListener(eventType, listener);
}

function once(eventType: any, listener: any) {
	on(eventType, handleEventOnce);

	function handleEventOnce(event: string) {
		listener(event);
		off(eventType, handleEventOnce);
	}
}

function trigger(eventType: any, data?: any) {
	const event = new CustomEvent(eventType, { detail: data });
	document.dispatchEvent(event);
}

/**
 * Takes a string and a number value and adds an 's' at the end to the string if the value is equal to 1.
 * Useful for making custom units as it adds an 's' when necessary and you don't get weird stuff like '1 cookies' or '2 cookie'.
 * 
 * @param {string} stringToAdd 
 * @param {number} val 
 * @returns {string} stringToAdd with 's' at end if needed
 */

function AddS(stringToAdd: string, val: number): string {
	return val == 1 ? stringToAdd : stringToAdd + "s";
}

/**
 * Stylises a number so it looks better.
 * @param number 
 * @returns {string} Returns number, but a string and it has commas and decimal points. 
 */

function StyliseN(number: number): string {
	return number.toLocaleString();
}

export { on, once, off, trigger, AddS, StyliseN };