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

function AddS(stringToAdd: string, val: number): string {
	return val == 1 ? stringToAdd : stringToAdd + "s";
}

function StyliseN(number: number): string {
	return number.toLocaleString();
}

export { on, once, off, trigger, AddS, StyliseN };