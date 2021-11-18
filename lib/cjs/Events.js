"use strict";
// https://www.falldowngoboone.com/blog/talk-to-your-react-components-with-custom-events/
Object.defineProperty(exports, "__esModule", { value: true });
exports.trigger = exports.off = exports.once = exports.on = void 0;
function on(eventType, listener) {
    document.addEventListener(eventType, listener);
}
exports.on = on;
function off(eventType, listener) {
    document.removeEventListener(eventType, listener);
}
exports.off = off;
function once(eventType, listener) {
    on(eventType, handleEventOnce);
    function handleEventOnce(event) {
        listener(event);
        off(eventType, handleEventOnce);
    }
}
exports.once = once;
function trigger(eventType, data) {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
}
exports.trigger = trigger;
