export declare function createPromiseSingleflight<K, V>(): (key: K, fn: () => Promise<V>) => Promise<V>;
export default createPromiseSingleflight;
