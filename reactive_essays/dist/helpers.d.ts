declare function on(eventType: any, listener: any): void;
declare function off(eventType: any, listener: any): void;
declare function once(eventType: any, listener: any): void;
declare function trigger(eventType: any, data?: any): void;
declare function AddS(stringToAdd: string, val: number): string;
declare function StyliseN(number: number): string;
export { on, once, off, trigger, AddS, StyliseN };
