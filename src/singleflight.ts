export function createPromiseSingleflight<Key extends string | number | symbol, ReturnValue> (): (key: Key, fn: () => Promise<ReturnValue>) => Promise<ReturnValue> {
  const group: Record<Key, Promise<ReturnValue>> = Object.assign({})
  return async function (key: Key, fn: () => Promise<ReturnValue>): Promise<ReturnValue> {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    const forget = function (): void { delete group[key] }
    const call = async function (key: Key, fn: () => Promise<ReturnValue>): Promise<ReturnValue> {
      if (!(key in group)) {
        group[key] = Promise.resolve<ReturnValue>(fn())
        group[key].then(forget, forget)
      }
      return await group[key]
    }
    return await call(key, fn)
  }
}
