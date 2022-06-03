export declare function createPromiseSingleflight<Key, ReturnValue> (): (key: Key, fn: () => Promise<ReturnValue>) => Promise<ReturnValue>
