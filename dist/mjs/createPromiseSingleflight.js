export function createPromiseSingleflight() {
    const group = new Map();
    return async function (key, fn) {
        const forget = function () { group.delete(key); };
        const call = async function (key, fn) {
            let handle = group.get(key);
            if (typeof handle !== 'undefined') {
                return await handle;
            }
            handle = fn();
            group.set(key, handle);
            handle.then(forget, forget);
            return await handle;
        };
        return await call(key, fn);
    };
}
