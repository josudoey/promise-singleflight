export function createPromiseSingleflight <K, V> (): (key: K, fn: () => Promise<V>) => Promise<V> {
  const group: Map<K, Promise<V>> = new Map()
  return async function (key: K, fn: () => Promise<V>) {
    const forget = function (): void { group.delete(key) }
    const call = async function (key: K, fn: () => Promise<V>): Promise<V> {
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

export default createPromiseSingleflight
