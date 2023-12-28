export declare function createPromiseSingleflight<Key extends string | number | symbol, ReturnValue>(): (key: Key, fn: () => Promise<ReturnValue>) => Promise<ReturnValue>;
