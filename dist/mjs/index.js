export function createPromiseSingleflight() {
    const group = new Map();
    return async function (key, fn) {
        const forget = function () { group.delete(key); };
        const call = async function (key, fn) {
            if (group.has(key)) {
                return await group.get(key);
            }
            const handle = Promise.resolve(fn());
            handle.then(forget, forget);
            group.set(key, handle);
            return await handle;
        };
        return await call(key, fn);
    };
}
export default createPromiseSingleflight;
