export declare function create<Key, ReturnValue>(): (key: Key, fn: () => Promise<ReturnValue>) => Promise<ReturnValue>;
export default create;
