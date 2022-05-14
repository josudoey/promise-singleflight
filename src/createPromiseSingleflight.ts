export function createPromiseSingleflight <Key, ReturnValue> (): (key: Key, fn: () => Promise<ReturnValue>) => Promise<ReturnValue> {
  const group: Map<Key, Promise<ReturnValue>> = new Map()
  return async function (key: Key, fn: () => Promise<ReturnValue>) {
    const forget = function (): void { group.delete(key) }
    const call = async function (key: Key, fn: () => Promise<ReturnValue>): Promise<ReturnValue> {
      let handle = group.get(key)
      if (typeof handle !== 'undefined') {
        return await handle
      }
      handle = fn()
      group.set(key, handle)
      handle.then(forget, forget)
      return await handle
    }
    return await call(key, fn)
  }
}
