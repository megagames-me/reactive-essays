declare function on(eventType: any, listener: any): void;
declare function off(eventType: any, listener: any): void;
declare function once(eventType: any, listener: any): void;
declare function trigger(eventType: any, data?: any): void;
export { on, once, off, trigger };
