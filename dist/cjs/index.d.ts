declare type SingleflightHandler = () => any;
export declare function createPromiseSingleflight(): (key: string, fn: SingleflightHandler) => Promise<any>;
export default createPromiseSingleflight;
